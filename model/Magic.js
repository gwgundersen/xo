/* Magic
 * --------------------------------------------------------------- */

var Magic = function(board) {
    
    var N = board.N;

    var state = _.map(_.range(2 * N + 2), function(i) {
        return {
            v: 0,
            n: 0
        };
    });

    return {

        SUM: board.SUM,

        // This will update whichever state object you give it.
        internal_update: function(num, side, arr) {
            var pt = board.get(num).pt,
                val = num[1] * side,
                count = 1 * side;

            arr[pt.x].v += val;
            arr[pt.x].n += count;
            arr[pt.y + N].v += val;
            arr[pt.y + N].n += count;
            
            // (0,0) => (1,1) => (2,2)
            if (pt.x === pt.y) {
                arr[2 * N].v += val;
                arr[2 * N].n += count;
            }

            // (0,2) => (1,1) => (2,0)
            if (pt.x + pt.y === N - 1) {
                arr[2 * N + 1].v += val;
                arr[2 * N + 1].n += count;
            }
        },

        // index <=> (x, y) conversions for board size N
        // i = x + y * N
        // x = i % N
        // y = Math.floor(i / N)
        update: function(num, side) {
            this.internal_update(num, side, state);
        },

        // We do not need a side because only the AI will try this.
        test: function(num) {
            var stateClone = state.slice(0);
            this.internal_update(num, -1, stateClone);
            return stateClone;
        },

        each: function(fn) {
            for (var i = 0, len = state.length; i < len; i++) {
                fn(state[i], [i]);
            }
        },
        
        is_over: function() {
            for (var i = 0; i < state.length; i++) {
                if (Math.abs(state[i].v) === this.SUM) {
                    return true;
                }
            }
            return false;
        }

    };

}; 
