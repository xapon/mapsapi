L.DG.Entrance.Arrow = L.Polyline.extend({

    _marker: null,
    _markerPath: null,

    initialize: function (latlngs, options) { // (Array, Object)
        var options = options || {},
            animation = this.getArrowAnimation(latlngs.length);

        options.animation = [animation];

        L.Polyline.prototype.initialize.call(this, latlngs, options);
    },

    _initElements: function () {
        this._map._initPathRoot();
        this._initPath();
        this._initMarker();
        this._initMarkerPath();
        this._initStyle();
    },

    _initMarker: function () {
        this._marker = this._createElement('marker', this.options.marker[18].attr);
        // TODO: расхардкодить привязку к 18 зуму
        this._marker.id = 'zoom18-arrow-marker-' + L.Util.stamp(this);
        this._path.parentNode.appendChild(this._marker);
    },

    _initMarkerPath: function () {
        this._markerPath = this._createElement('path', this.options.marker[18].path);
        this._marker.appendChild(this._markerPath);
        this._path.setAttribute('marker-end', 'url(#' + this._marker.id + ')');

        // TODO:
        /**
         * - Надо разобраться, в какую сторону все же должна смотреть стрелка. Написал Денису Телюху из WAPI вопрос о том, с какой стороны начало стрелки и с какой конец в прилетающем WKT
         * - Надо чтоб стрелка не смещалась от входа при анимации
         * - Надо подумать, что еще не покрыто тестами и стоит покрыть
         * - Сформировать пулреквест в ЛЛ
         */
    },

    _updatePath: function () {
        L.Polyline.prototype._updatePath.call(this);
        //this._originalPoints[this._originalPoints.length-1].x += 4;//this.options.marker[18].attr.refX;
        //this._originalPoints[this._originalPoints.length-1].y += 3; //this.options.marker[18].attr.refY;
    }
});

L.DG.Entrance.arrow = function (latlngs, options) {
    return new L.DG.Entrance.Arrow(latlngs, options);
};
