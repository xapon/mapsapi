L.DG = L.DG || {};
// ru
L.DG.Dictionary = {};

L.DG.Dictionary.ru = {
    pluralRules: function (n) { // (Number)
        if (n % 10 === 1 && n % 100 !== 11) { // 1, 21
            return 0;
        }
        if ((n % 10 >= 2 && n % 10 <= 4 && (n % 10) % 1 === 0) && (n % 100 < 12 || n % 100 > 14)) { // 2, 3
            return 1;
        }

        if ((n % 10 === 0) || (n % 10 >= 5 && n % 10 <= 9 && (n % 10) % 1 === 0) || (n % 100 >= 11 && (n % 100) <= 14 && (n % 100) % 1 === 0)) { // 13, 17
            return 2;
        }
    }
};

// it
L.DG.Dictionary.it = {
    pluralRules: function (n) { // (Number)
        if (n === 1) { // 1
            return 0;
        }
        if (n >= 2) { // 2, 3, 4 ..
            return 1;
        }
    }
};