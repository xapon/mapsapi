L.Map.mergeOptions({
    poi: false
});

DG.Poi = L.Handler.extend({

    options: {
        disableLabel: false
    },

    initialize: function (map, options) { // (Object)
        this._map = map;
        L.Util.setOptions(this, options);
    },

    addHooks: function () {
        this._map.on(this._mapEventsListeners, this);
        this._map.meta.enablePoiListening();
        if (!this.options.disableLabel) {
            this._labelHelper = new DG.Label();
        }
    },

    removeHooks: function () {
        this._map.off(this._mapEventsListeners, this);
        this._map.off('mousemove', this._onMouseMove, this);
        this._map.meta.disablePoiListening();
        if (this._labelHelper) {
            this._map.removeLayer(this._labelHelper);
            this._labelHelper = null;
        }
    },

    _mapEventsListeners : {
        poihover: function (e) { // (Object)
            this._setCursor('pointer');
            if (this._labelHelper) {
                this._labelHelper
                    .setPosition(e.latlng)
                    .setContent(e.poi.linked.name);
                this._map
                    .on('mousemove', this._onMouseMove, this)
                    .addLayer(this._labelHelper);
            }
        },

        poileave: function () {
            this._setCursor('auto');
            if (this._labelHelper) {
                this._map
                    .off('mousemove', this._onMouseMove, this)
                    .removeLayer(this._labelHelper);
            }
        }
    },

    _onMouseMove: function (e) { // (Object)
        this._labelHelper.setPosition(e.latlng);
    },

    _setCursor: function (cursor) { // (String)
        this._map.getContainer().style.cursor = cursor;
    }

});

L.Map.addInitHook('addHandler', 'poi', DG.Poi);
