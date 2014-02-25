DG.Ruler = DG.Class.extend({

    options: {
        editable: true
    },

    includes: [DG.Locale, DG.Mixin.Events],

    statics: {
        Dictionary: {}
    },

    _rulerPane: null,
    _pathRoot: null,

    initialize: function (latlngs, options) {
        DG.Util.setOptions(this, options);

        this._layersContainer = DG.featureGroup();
        this._layers = {
            back : null,
            middle : null,
            front : null,
            mouse : null
        };
        this._points = [];

        Object.keys(this._layers).forEach(function (name) {
            this._layersContainer.addLayer(this._layers[name] = DG.featureGroup());
        }, this);

        this._reset();

        if (DG.Browser.touch) {
            delete this._lineMouseEvents.mouseover;
            delete this._lineMouseEvents.mouseout;
            delete this._lineMouseEvents.mousemove;
        } else {
            delete this._lineMouseEvents.click;
        }

        if (latlngs && latlngs.length) {
            this.setLatLngs(latlngs);
        }
    },

    onAdd: function (map) { // (DG.Map)
        this._map = map.on('langchange', this._updateDistance, this);
        this._maxLat = map.unproject([0, 0], 0).lat;

        if (!this._rulerPane) {
            this._rulerPane = this._map.getContainer().querySelector('.dg-ruler-pane');
            if (this._rulerPane) {
                this._pathRoot = this._rulerPane.querySelector('.dg-ruler-pane__pathroot');
            } else {
                var dummyPath = DG.polyline([]).addTo(this._map);
                this._map.removeLayer(dummyPath);
                this._rulerPane = DG.DomUtil.create('div', 'dg-ruler-pane', map._panes.overlayPane);
                this._initPathRoot();
            }
        }

        this._layersContainer.addTo(this._map);
        this._layers.mouse.on(this._lineMouseEvents, this);

        if (this._points.length) {
            this._layers.mouse.fire('layeradd');
            this._updateDistance();
            this._points.forEach(function (point) {
                if (point._legs) {
                    this._pathRoot.appendChild(point._legs.mouse._container);
                }
            }, this);
        }
        // todo fake mousedown on fake div
        L.DomEvent.addListener(this._pathRoot, 'mousedown', function (e) {
            L.DomEvent.stop(e);
            return false;
        });
    },

    onRemove: function (map) { // (DG.Map)
        map
            .off('langchange', this._updateDistance, this)
            .removeLayer(this._layersContainer);

        this._layers.mouse.off(this._lineMouseEvents, this);
        this._reset();
    },

    addTo: function (map) { // (DG.Map)
        map.addLayer(this);
        return this;
    },

    getTotalDistance: function () { // () -> Number
        return this._calcDistance();
    },

    spliceLatLngs: function (index, pointsToRemove) {   // (Number, Number, args ...) -> Array
        var oldLength = this._points.length,
            mutationStart = index >= 0 ? Math.min(index, oldLength) : oldLength - index,
            removed = Array.prototype.splice.apply(this._points, arguments).map(function (point) {
                this._layers.mouse.removeLayer(point);
                return point.off().getLatLng();
            }, this),
            length = this._points.length;

        if (length) {
            for (var i = mutationStart; i < length; i++) {
                if (!(this._points[i] instanceof DG.Ruler.LayeredMarker)) {
                    this._points[i] = this._createPoint(this._points[i])
                                            .on(this._pointEvents, this)
                                            .once('add', this._addCloseHandler, this)
                                            .addTo(this._layers.mouse, this._layers);
                }
                if (i && !this._points[i - 1]._legs) {
                    this._addLegs(this._points[i - 1]);
                }
                this._points[i].setPointStyle(this.options.iconStyles[i && i < length - 1 ? 'small' : 'large']);
                this._points[i]._pos = i;
            }
            this._removeLegs(this._points[length - 1]);
            if (oldLength > 0 && oldLength < length) {
                this._points[oldLength - 1].collapse();
            }
            if (this._points[mutationStart]) {
                this._updateLegs(this._points[mutationStart]);
            }
            if (mutationStart > 1) {
                this._points[mutationStart - 1].setPointStyle(this.options.iconStyles.small);
            }
            this._updateDistance();
        }
        if (DG.Browser.touch && this._lineMarkerHelper) {
            this._lineMarkerHelper.collapse();
        }
        this._fireChangeEvent();
        return removed;
    },

    addLatLng: function (latlng) { // (DG.LatLng) -> DG.Ruler
        var lastPoint = this._points[this._points.length - 1] || null,
            latlng = DG.latLng(latlng); // jshint ignore:line

        if (lastPoint) {
            var lastLatlng = lastPoint.getLatLng(),
                wraped = latlng.wrap(),
                wrapedLast = lastLatlng.wrap(),
                deltaLng = wraped.lng - wrapedLast.lng;

            if (Math.abs(latlng.lng - lastLatlng.lng) > 180) {
                latlng.lng = lastLatlng.lng + deltaLng;
                deltaLng = latlng.lng - lastLatlng.lng;
                if (Math.abs(deltaLng - 360) < Math.abs(deltaLng)) {
                    latlng.lng -= 360;
                }
            }
        }
        this.spliceLatLngs(this._points.length, 0, latlng);
        return this;
    },
    
    getLatLngs: function () { // () -> Array
        return this._points.map(function (point) {
            return point.getLatLng();
        });
    },

    setLatLngs: function (latlngs) { // (Array) -> DG.Ruler
        var args = latlngs.slice();
        args.unshift(0, this._points.length);
        this.spliceLatLngs.apply(this, args);
        return this;
    },

    _reset : function () { // ()
        DG.extend(this, {
            _lineMarkerHelper: null,
            _morphingNow: false
        });
    },

    _initPathRoot : function () { // ()
        this._rulerPane.appendChild(this._pathRoot = this._map._pathRoot.cloneNode(false));
        this._map.on(this._pathRootEvents, this);
        DG.DomUtil.addClass(this._pathRoot, 'dg-ruler-pane__pathroot');
        L.DomEvent.addListener(this._pathRoot, 'mousedown', function (e) {
            L.DomEvent.stopPropagation(e);
        });
    },

    _pathRootEvents: {
        zoomanim: function () {
            this._pathRoot.style[DG.DomUtil.TRANSFORM] = this._map._pathRoot.style[DG.DomUtil.TRANSFORM];
        },
        moveend : function () {
            ['width', 'height', 'viewBox'].forEach(function (attr) {
                this._pathRoot.setAttribute(attr, this._map._pathRoot.getAttribute(attr));
            }, this);
            ['top', 'left', DG.DomUtil.TRANSFORM].forEach(function (prop) {
                this._pathRoot.style[prop] = this._map._pathRoot.style[prop];
            }, this);
        }
    },

    _lineMouseEvents: {
        click : function (event) {
            var target = event.layer;
            if (target instanceof DG.Marker && target._pos !== this._points.length - 1) {
                if (this._lineMarkerHelper) {
                    this._lineMarkerHelper.collapse();
                }
                target.setText(this._getFormatedDistance(target));
                this._lineMarkerHelper = target;
            } else if (target instanceof DG.Path && this.options.editable) {
                var latlng = event.latlng,
                    insertPos = target._point._pos + 1;
                this.spliceLatLngs(insertPos, 0, latlng);
            }
        },
        mouseover : function (event) { // (MouseEvent)
            var target = event.layer;
            
            target._hovered = true;
            if (this._morphingNow) {
                return;
            }
            if (target instanceof DG.Marker && target._pos !== this._points.length - 1) {
                target.setText(this._getFormatedDistance(target));
            } else if (target instanceof DG.Path && !this._lineMarkerHelper) {
                var point = target._point;

                this._lineMarkerHelper = this._addRunningLabel(
                    this._interpolate(point.getLatLng(), this._points[point._pos + 1].getLatLng(), event.latlng),
                    point
                );
            }
        },
        mouseout : function (event) { // (MouseEvent)
            var target = event.layer;

            target._hovered = false;
            if (this._morphingNow || target._pos === this._points.length - 1) {
                return;
            }
            if (target instanceof DG.Marker) {
                target.collapse();
            } else {
                this._removeRunningLabel();
            }
        },
        mousemove : function (event) { // (MouseEvent)
            if (this._morphingNow || !this._lineMarkerHelper) {
                return;
            }

            var point = event.layer._point,
                latlng = this._interpolate(point.getLatLng(), this._points[point._pos + 1].getLatLng(), event.latlng);

            this._lineMarkerHelper
                    .setLatLng(latlng)
                    .setText(this._getFormatedDistance(point, point.getLatLng().distanceTo(latlng)));
        },
        layeradd : function () { // ()
            Object.keys(this._layers).forEach(function (name) {
                this._layers[name].bringToFront();
            }, this);
        }
    },

    _fireChangeEvent : function () {
        this.fire('changed', { latlngs : this.getLatLngs() });
    },

    _addRunningLabel : function (latlng, previousPoint) { // (DG.LatLng, DG.Ruler.LayeredMarker)
        var point = this._createPoint(latlng, {}).addTo(this._layers.mouse, this._layers);
        
        this._rulerPane.appendChild(point._icon);
        return point.setText(this._getFormatedDistance(previousPoint, previousPoint.getLatLng().distanceTo(latlng)));
    },

    _removeRunningLabel : function () { // ()
        if (this._lineMarkerHelper) {
            this._layers.mouse.removeLayer(this._lineMarkerHelper);
            this._lineMarkerHelper = null;
        }
    },

    _insertPointInLine : function (event) { // (MouseEvent)
        var latlng = this._lineMarkerHelper.getLatLng(),
            insertPos = event.target._point._pos + 1,
            point;

        if (L.Browser.ie) {
            var path = event.originalEvent.target || event.originalEvent.srcElement,
                g = path.parentNode;
            g.appendChild(path); // IE click event leaking problem solution: we reappend mousedown event target element
        }

        this.spliceLatLngs(insertPos, 0, latlng);
        point = this._points[insertPos];
        point.setText(this._getFormatedDistance(point));

        if (document.createEvent) {
            var e = document.createEvent('MouseEvents');
            e.initMouseEvent('mousedown', false, false, document.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 1, point._icon);
            point._icon.dispatchEvent(e);
        } else {
            point._icon.fireEvent('onMouseDown', DG.extend(document.createEventObject(), {
                button: 1,
                bubbles: false,
                cancelable: false
            }));
        }
        this._removeRunningLabel();

        this._updateLegs(point);
    },

    _interpolate: function (fromLatLng, toLatLng, hereLatLng) { // (DG.LatLng, DG.LatLng, DG.LatLng) -> DG.LatLng
        var from = this._map.latLngToLayerPoint(fromLatLng),
            to = this._map.latLngToLayerPoint(toLatLng),
            here = this._map.latLngToLayerPoint(hereLatLng),
            k = (to.x - from.x) / (to.y - from.y),
            b = from.x - k * from.y;
        
        // http://en.wikipedia.org/wiki/Line_(geometry)
        
        if (k === Infinity) { // Infinity is not the limit!
            here.y = to.y;
        } else {
            here.y = (here.y + k * here.x - k * b) / (k * k + 1); // Don't even ask me!
            here.x = k * here.y + b;
        }
        return this._map.layerPointToLatLng(here);
    },

    _addCloseHandler: function (event) { // (Event)
        event.target
                .on('click', this._deletePoint, this)
                .querySelector('delete').style.display = 'inline-block';
    },

    _createPoint: function (latlng, style) { // (DG.LatLng, Object) -> DG.Ruler.LayeredMarker
        var pointStyle = style ? style : this.options.iconStyles.large,
            layers = {};

        Object.keys(pointStyle).forEach(function (layer) {
            layers[layer] = DG.circleMarker(latlng, pointStyle[layer]);
        });

        return DG.Ruler.layeredMarker(latlng, {
            layers : layers,
            draggable : this.options.editable
        });
    },

    _pointEvents: {
        'drag' : function (event) { // (Event)
            var point = event.target,
                latlng = point.getLatLng(),
                lastPoint = this._points[point._pos - 1] || null,
                wraped = latlng.wrap();

            if (lastPoint) {
                var lastLatlng = lastPoint.getLatLng(),
                    wrapedLast = lastLatlng.wrap(),
                    deltaLng = wraped.lng - wrapedLast.lng;

                if (Math.abs(latlng.lng - lastLatlng.lng) > 180) {
                    wraped.lng = lastLatlng.lng + deltaLng;
                    deltaLng = wraped.lng - lastLatlng.lng;
                    if (Math.abs(deltaLng - 360) < Math.abs(deltaLng)) {
                        wraped.lng -= 360;
                    }
                }
            }

            wraped.lat = Math.max(Math.min(this._maxLat, wraped.lat), -this._maxLat);
            if (!latlng.equals(wraped)) {
                point.setLatLng(wraped);
            }

            if (!DG.Browser.touch && point !== this._points[this._points.length - 1]) {
                point.setText(this._getFormatedDistance(point));
            }
            this._updateLegs(point);
            this._updateDistance();
        },
        'dragend' : function (event) {   // (Event)
            var point = event.target;
            this._morphingNow = false;
            if (!point._hovered && point !== this._points[this._points.length - 1]) {
                point.collapse();
            }
            this._fireChangeEvent();
        },
        'dragstart' : function () { // ()
            if (DG.Browser.touch && this._lineMarkerHelper) {
                this._lineMarkerHelper.collapse();
            }
            this._morphingNow = true;
        }
    },

    _deletePoint: function (event) {   // (MouseEvent)
        var originalEvent = event.originalEvent,
            target = originalEvent.target  || originalEvent.srcElement;
        if (target.className !== 'dg-ruler-label__delete') {
            return;
        }
        DG.DomEvent.stop(event.originalEvent);
        this.spliceLatLngs(event.target._pos, 1);
    },

    _addLegs: function (point) {
        var coordinates = [point.getLatLng(), this._points[point._pos + 1].getLatLng()],
            pathStyles = this.options.pathStyles;

        point._legs = {};
        Object.keys(pathStyles).forEach(function (layer) {
            point._legs[layer] = DG.polyline(coordinates, pathStyles[layer]).addTo(this._layers[layer]);
        }, this);

        point._legs.mouse._point = point.once('remove', this._clearRemovingPointLegs, this);

        if (this.options.editable && !DG.Browser.touch) {
            point._legs.mouse.on('mousedown', this._insertPointInLine, this);
        }

        if (this._map) {
            this._pathRoot.appendChild(point._legs.mouse._container);
        }
    },

    _clearRemovingPointLegs: function (event) {  // (Event)
        this._removeLegs(event.target);
    },

    _removeLegs: function (point) {    // (DG.Ruler.LayeredMarker)
        if (point._legs) {
            Object.keys(point._legs).forEach(function (layer) {
                this._layers[layer].removeLayer(point._legs[layer]);
            }, this);
            point._legs = null;
        }
    },

    _updateLegs: function (point) {    // (DG.Ruler.LayeredMarker)
        var latlng = point.getLatLng(),
            previousPoint = this._points[point._pos - 1];

        if (previousPoint) {
            Object.keys(previousPoint._legs).forEach(function (layer) {
                previousPoint._legs[layer].spliceLatLngs(1, 1, latlng);
            });
        }
        if (point._legs) {
            Object.keys(point._legs).forEach(function (layer) {
                point._legs[layer].spliceLatLngs(0, 1, latlng);
            });
        }
    },

    _calcDistance: function (finishPoint, tail) { // (DG.Ruler.LayeredMarker, Number) -> Number
        var distance = tail ? tail : 0,
            calcTo = finishPoint ? finishPoint._pos : this._points.length - 1;

        for (var i = 0; i < calcTo; i++) {
            distance += this._points[i].getLatLng().distanceTo(this._points[i + 1].getLatLng());
        }

        return distance;
    },

    _getFormatedDistance: function (finishPoint, tail) { // (DG.Ruler.LayeredMarker, Number) -> String
        var distance = this._calcDistance.apply(this, arguments),
            units = 'm';

        if (distance > 1000) {
            distance /= 1000;
            units = 'km';
            if (distance > 1000) {
                distance = distance.toFixed();
                distance = distance.slice(0, -3) + ' ' + distance.slice(-3);
            } else {
                distance = distance.toFixed(2).split('.').join(this.t(','));
            }
        } else {
            distance = Math.round(distance);
        }

        return [distance || 0, ' ', this.t(units)].join('');
    },

    _updateDistance: function () {  // ()
        if (this._map && this._points.length) {
            this._points[this._points.length - 1].setText(this._getFormatedDistance());
        }
    }
});

DG.ruler = function (latlngs, options) { // (Array, Object)
    return new DG.Ruler(latlngs, options);
};