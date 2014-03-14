/* Board
 * 
 * `Board` and `Score` rely on a Magic Square:
 * http://en.wikipedia.org/wiki/Magic_square
 *
 * The Magic Square this game uses is:
 * 4  9  2
 * 3  5  7
 * 8  1  6
 *
 * For implementation details, see the `Score` metaobject.
 * --------------------------------------------------------------- */

var Board = function() {

    var N = 3;

    // "Magic Constant"
    var M = (N * (Math.pow(N, 2) + 1)) / 2;

    var state = [
        { piece: null, magic: 4 },
        { piece: null, magic: 9 },
        { piece: null, magic: 2 },
        { piece: null, magic: 3 },
        { piece: null, magic: 5 },
        { piece: null, magic: 7 },
        { piece: null, magic: 8 },
        { piece: null, magic: 1 },
        { piece: null, magic: 6 }
    ];

    return {

        N: N,

        M: M,
        
        set: function(idx, piece) {
            state[idx].piece = piece;
        },
            
        get: function(idx, magic) {
            var i = 0, len = state.length;
            if (magic) {
                for (; i < len; i++) {
                    if (state[i].magic === magic) {
                        return i;
                    }
                }
            } else {
                return state[idx];
            }
        },

        each: function(fn) {
            var i = 0, len = state.length;
            for (; i < len; i++) {
                fn(state[i], i);
            }
        },

        corners: function() {
            return [0, 2, 6, 8];
        },

        sides: function() {
            return [1, 3, 5, 7];
        },

        center: function() {
            return 4;
        },

        get_square_type: function(type) {
            if (type === 'corner') {
                return [0, 2, 6, 8];
            } else if (type === 'side') {
                return [1, 3, 5, 7];
            } else if (type === 'center') {
                return [4];
            }
        },

        is_full: function() {
            var i = 0, len = state.length;
            for (; i < len; i++) {
                if (this.is_empty(i)) {
                    return false;
                }
            }
            return true;
        },

        is_empty: function(idx) {
            if (state[idx].piece === null) {
                return true;
            }
            return false;
        }

    };
};
