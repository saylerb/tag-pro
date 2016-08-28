export default class MapBlueprint {
  constructor() {

    this.test = {
      tiles: [ 53, 164, 164, 164, 164, 164, 164, 56,
               81, 78, 78, 78, 78, 78, 78, 92,
               81, 78, 78, 78, 78, 78, 78, 92,
               81, 78, 78, 78, 78, 78, 78, 92,
               81, 78, 78, 78, 78, 78, 78, 92,
               81, 78, 78, 78, 78, 1, 78, 92,
               81, 78, 78, 78, 78, 78, 78, 92,
               168, 164, 164, 164, 164, 164, 164, 165
             ],
      columns: 8,
      rows: 8
    }

    //          0    1    2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22  23
    this.level_one = { 
      tiles: [ 53, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 56,
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               81,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78,  78, 81,  
               168, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 164, 165
             ],
    columns: 24,
    rows: 16
    }
  }
}