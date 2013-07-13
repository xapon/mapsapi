// Extends L.DG.Entrance.Arrow with default animation options
L.DG.Entrance.Arrow.include({

    getFadeOutAnimation: function() {
        return  {
            id: 'hideArrow',
            attributeName: 'stroke-opacity',
            values: "1;0",
            fill: 'freeze',
            dur: '0.2s',
            begin: 'indefinite'
        };
    },

    getFadeInAnimation: function() {
        return  {
            id: 'showArrow',
            attributeName: 'stroke-opacity',
            values: "0;1",
            fill: 'freeze',
            dur: '0.2s',
            begin: 'indefinite'
        };
    },

    getArrowAnimation: function (verticesCount) { // (Number) -> Object
        var animateArrow = {
            id: 'animateArrowPathGeom',
            attributeName: 'd',
            fill: 'freeze',
            begin: 'indefinite'
        };

        animateArrow.getValues = this._getAnimationValues(verticesCount);
        animateArrow.keyTimes = this._getAnimateTiming(verticesCount);
        animateArrow.dur = this._getAnimationTime(verticesCount);

        return animateArrow;
    },

    _getAnimationValues: function(verticesCount) {
        return (verticesCount === 2) ? this._getShakeAnimationValues : this._getSlideAnimationValues;
    },

    _getSlideAnimationValues: function(points) { // (Array) -> String
        var d = '',
            prevPoint = '',
            curPoint = '',
            M = 'M ' + points[0].x + ' ' + points[0].y,
            l = 'l -1 0';

        d = M + ' ' + l + '; ';
        for (var i = 1; i < points.length; i++) {
            curPoint += (points[i].x - points[i-1].x) + ' ' + (points[i].y - points[i-1].y);

            if (i === points.length - 1) {
                curPoint = (points[i].x - points[i-1].x) + ' ' + (points[i].y - points[i-1].y);
                d += M + ' l ' + prevPoint  + curPoint + ';';
                break;
            }

            d += M + ' l ' + curPoint + '; ';
            d += M + ' l ' + curPoint + ' ' + l +'; ';
            curPoint += ' l ';
            prevPoint += (points[i].x - points[i-1].x) + ' ' + (points[i].y - points[i-1].y) + ' l ';
        }

        return d;
    },

    _getShakeAnimationValues: function(points) { // (Array) -> String
        var d = '', px0, py0,
            // config coefficient values for arrow animation
            relDiff = [1, 0.4, 1, 0.84, 1, 0.94, 1],
            dx = points[1].x - points[0].x,
            dy = points[1].y - points[0].y,
            l = ' l ' + dx + ' ' + dy;

        px0 = points[0].x - dx;
        py0 = points[0].y - dy;

        d = 'M ' + px0 + ' ' + py0 + l + '; ';
        for (var i = 0; i < relDiff.length; i++) {
            d += ' M ' + (px0 + dx*relDiff[i]) + ' ' + (py0 + dy*relDiff[i]) + l + ';';
        }

        return d;
    },

    _getAnimateTiming: function (verticesCount) {
        if(verticesCount === 2) return "0; 0.33; 0.495; 0.66; 0.77; 0.88; 0.935; 1";
        if(verticesCount === 3) return "0; 0.33; 0.34; 1";
        else return "0; 0.25; 0.26; 0.5; 0.51; 1";
    },

    _getAnimationTime: function (verticesCount) {
        if(verticesCount === 2) return '0.7s';
        else return "0.5s";
    }
});