const Util = {
    print2DArrey: function(grid){
        grid.map((row, i) => {
            return console.log(...grid[i]);
        });
    },
    copyGrid: function(from, to) {
        for ( let i = 0; i < from.length; i++ ){
            to[i] = [...from[i]];
        }
    },

    sleep: async function (ms) {
        if (ms === 0) return;
        if (!ms) throw new Error("Speed parameter not defined!");
        return new Promise((resolve, reject) => {
          setTimeout(resolve, ms);
        });
      },

};

export {Util}