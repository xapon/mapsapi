// Fix a lot of bugs with pinch-zooming
// See https://github.com/2gis/mapsapi/issues/327
DG.Map.mergeOptions({
    bounceAtZoomLimits: false
});

//Inject observing localization change
var controlAddTo = DG.Control.prototype.addTo;

DG.Control.include({
    addTo: function (map) {
        map.on('langchange', this._renderTranslation, this);

        return controlAddTo.call(this, map);
    },
    _renderTranslation: function () {}
});

// Add some browser detection
DG.Browser.safari51 = DG.Browser.safari && navigator.userAgent.indexOf('Version/5.1') !== -1;

// Applies 2GIS divIcon to marker
DG.Marker.prototype.options.icon = DG.divIcon(DG.configTheme.markersData);

// support old option clickable
var utilSetOptions = DG.Util.setOptions;

DG.setOptions = L.setOptions = DG.Util.setOptions = function (obj, options) {
    if (options && typeof options.clickable !== 'undefined') {
        options.interactive = options.clickable;
    }

    return utilSetOptions.call(this, obj, options);
};

DG.Layer.mergeOptions({
    nonBubblingEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu']
});


// todo:  Remove after update to commit bbf32ebfcdb0d24d187dbb54eecbea367fd7b72d in Leaflet.
DG.GridLayer.include({
    _setView: function (center, zoom, noPrune, noUpdate) {
        var tileZoom = Math.round(zoom);
        if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
            (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
            tileZoom = undefined;
        }

        var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

        if (!noUpdate || tileZoomChanged) {

            this._tileZoom = tileZoom;

            if (this._abortLoading) {
                this._abortLoading();
            }

            this._updateLevels();
            this._resetGrid();

            if (tileZoom !== undefined) {
                this._update(center);
            }

            if (!noPrune) {
                this._pruneTiles();
            }

            // Flag to prevent _updateOpacity from pruning tiles during
            // a zoom anim or a pinch gesture
            this._noPrune = !!noPrune;
        }

        this._setZoomTransforms(center, zoom);
    }
});
