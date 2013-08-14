L.DG.PoiStorage = L.Class.extend({
	//
// pois : {
//    poi_uid : poi_data,
//    poi_uid : poi_data,
//    ...
// }
// tiles_poi : {
//     xyz: [poi_uid, poi_uid, ...],
//     xyz: [poi_uid, poi_uid, ...],
//     ...
// }

    pois: {},
    tiles_poi: {},

    getPoi: function (id) {
        return this.pois[id];
    },

    getTilePois: function(tileId, callback) {
        if (!this.tiles_poi.hasOwnProperty(tileId)) {
            this._askByTile(tileId);
        }

        return this.tiles_poi[tileId];
    },

    _addPoisToTile: function (tileId, poi) {
        for (var i = 0, len = poi.length; i < len; i++) {
            var poiId = poi[i].id;
            delete poi[i].id;

            this.tiles_poi[tileId] ? null : this.tiles_poi[tileId] = [];
            this.tiles_poi[tileId].push(poiId);
            this._addPoi(poiId, poi[i]);
        }
    },

    _addPoi: function (poiId, poiInfo) {
        this.pois[poiId] = poiInfo;
    },

    _askByTile: function (tileId) {
        var xyz = tileId.split(',');
        // send request to api http://highlight{0-9}.2gis.ru/{xyz[2]}/{xyz[0]}/{xyz[1]}
        // get:
        var demoPois = {
            1: [
                {
                    "id": "10274906096961615",
                    "linked_id": "10274364931002767",
                    "type": "filial",
                    "hover": "POLYGON((35.9534560522966 51.6468101845176,35.9535042918274 51.6468101845176,35.9535042918274 51.6467801957855,35.9534560522966 51.6467801957855,35.9534560522966 51.6468101845176))",
                    "text": "Продукты, магазин, ИП Костина Т.В."
                },
                {
                    "id": "10274906096961616",
                    "linked_id": "10274364931002814",
                    "type": "filial",
                    "hover": "POLYGON((35.957520030642 51.6518121723409,35.9575682701727 51.6518121723409,35.9575682701727 51.6517821869176,35.957520030642 51.6517821869176,35.957520030642 51.6518121723409))",
                    "text": "Лаванда, продуктовый магазин"
                },
                {
                    "id": "10274906096961624",
                    "linked_id": "10274364931054565",
                    "type": "filial",
                    "hover": "POLYGON((36.1231451145209 51.6455465157316,36.1231933540517 51.6455465157316,36.1231933540517 51.6455165261636,36.1231451145209 51.6455165261636,36.1231451145209 51.6455465157316))",
                    "text": "Закусочная, ИП Косинова Е.В."
                }
            ],
            2: [
                {
                    "id": "10274906096986996",
                    "linked_id": "10274364931071845",
                    "type": "filial",
                    "hover": "POLYGON((36.1912994866433 51.753846483638,36.1913960555364 51.753846483638,36.1913960555364 51.7537867034725,36.1912994866433 51.7537867034725,36.1912994866433 51.753846483638))",
                    "text": "Кафе, ИП Кулабухова Г.А."
                },
                {
                    "id": "10274906096988671",
                    "linked_id": "10274364931054578",
                    "type": "filial",
                    "hover": "POLYGON((36.1134431297894 51.6479310688293,36.1135396986824 51.6479310688293,36.1135396986824 51.647871148568,36.1134431297894 51.647871148568,36.1134431297894 51.6479310688293))",
                    "text": "Продукты, магазин, ООО Молоко"
                },
                {
                    "id": "10274906096993034",
                    "linked_id": "10274364930977921",
                    "type": "filial",
                    "hover": "POLYGON((36.2021335282959 51.7455519107933,36.202230097189 51.7455519107933,36.202230097189 51.745492119649,36.2021335282959 51.745492119649,36.2021335282959 51.7455519107933))",
                    "text": "Лысая Гора, магазин продуктов"
                }
            ],
            def: [
                {
                    "id": "10274906096962752",
                    "linked_id": "10274364931006835",
                    "type": "filial",
                    "hover": "POLYGON((36.1819938386151 51.7669431605213,36.1820420781459 51.7669431605213,36.1820420781459 51.7669132513204,36.1819938386151 51.7669132513204,36.1819938386151 51.7669431605213))",
                    "text": "Точка, магазин продуктов"
                },
                {
                    "id": "10274906096965091",
                    "linked_id": "10274364931057258",
                    "type": "filial",
                    "hover": "POLYGON((36.1668786059815 51.7212295755012,36.1669268455123 51.7212295755012,36.1669268455123 51.7211996360212,36.1668786059815 51.7211996360212,36.1668786059815 51.7212295755012))",
                    "text": "Продукты, магазин, ИП Задирин С.Н."
                }
            ]
        };

        var result = demoPois[xyz[2]] || demoPois.def;
        this._addPoisToTile(tileId, result);

    }

});