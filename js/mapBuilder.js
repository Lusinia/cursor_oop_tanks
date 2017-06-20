/**
 * Created by alenka on 20.06.17.
 */
/**
 * Created by alenka on 14.06.17.
 */
document.addEventListener("DOMContentLoaded", function (event) {
function Block(top, left, type,width,height ) {
    this.type = type;
    this.top = top;
    this.left = left;
    this.width = width;
    this.height = height;
    //    var rectangle = new Rectangle( this.top,  this.left, this.width, this.width);

    this.createBlock = function () {
        var unit =  document.createElement('div');
        unit.style.width=  this.width;
        unit.style.height=  this.height;
        unit.style.position=  'absolute';
        unit.style.left=   this.left;
        unit.style.top=  this.top;
        unit.style.border=  '1px solid #eee';
        unit.classList.add('block');
        var background = {
            'brick': './img/map/brick.jpg',
            'concrete': './img/map/concrete.jpg'
        };

        if (this.type == 'brick') {
            unit.style.background ='url(' + background.brick + ')';
        } else if(this.type == 'concrete'){
            unit.style.background = 'url(' + background.concrete + ')';
        } else {
            unit.style.background  = 'transparent';
        }
        field.append(unit);
        return unit;

    };
}

function inherit(child, parent){
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.prototype.parent = parent;
}

function BrickBlock (top,left) {
    Block.call(this);
    this.top = top;
    this.left = left;
    this.width = '50px';
    this.height = '50px';
    this.type = 'brick';
}
inherit(BrickBlock,Block);


function ConcreteBlock(top,left) {
    Block.call(this);
    this.top = top;
    this.left = left;
    this.width = '50px';
    this.height = '25px';
    this.type = 'concrete';

}
inherit(ConcreteBlock,Block);


function Map() {
    var coords;
function builder(coords) {
    for (var i=0; i< coords.length; i++){
        for(var j=0; j<coords[i].length; j++){
            switch (coords[i][j]) {
                case 1:
                    new BrickBlock(50*i +'px', (j)*50+'px').createBlock();
                    break;
                case 2:
                    new ConcreteBlock(50*i+'px',j*50+'px').createBlock();
                    break;
                case 3:
                    new ConcreteBlock(50*i+'px',j*50+'px').createBlock();
                    new ConcreteBlock(50*i + 25 +'px',j*50+'px').createBlock();
                    break;
                case 4:
                      new Block(50*i + 25 +'px',j*50+12.5+'px', 'brick', '25px','25px').createBlock();
                     new Block(50*i   +'px',j*50+12.5+'px', 'brick', '25px','25px').createBlock();
                     new Block(50*i -25  +'px',j*50+12.5+'px', 'brick', '25px','25px').createBlock();
                    break;
                case 5:
                     new Block(50*i + 25 +'px',j*50-12.5+'px', 'brick', '75px','25px').createBlock();

                    break;
                case 0:
                    continue;
                    break;
            }
            var goal =   document.createElement('div');
            goal.classList.add('goal');
            field.append(goal);

        }

    }
}

   this.setCoords = function (num) {
       switch (num){
           case 1:
               coords = [
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ],
                   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0  ],
                   [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0  ],
                   [0, 1, 0, 1, 0, 1, 3, 1, 0, 1, 0, 1, 0  ],
                   [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0  ],
                   [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0  ],
                   [2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 2  ],
                   [0, 1, 1, 1, 0, 1, 2, 1, 0, 1, 1, 1, 0  ],
                   [0, 1, 0, 1, 0, 0, 5, 0, 0, 1, 0, 1, 0  ],
                   [0, 1, 0, 0, 0, 4, 0, 4, 0, 0, 0, 1, 0  ]

               ];
               builder(coords);
               break;
           case 2:
               coords = [
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ],
                   [0, 1, 1, 1, 0, 1, 2, 1, 0, 1, 1, 1, 0  ],
                   [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0  ],
                   [0, 1, 1, 1, 2, 1, 0, 1, 2, 1, 1, 1, 0  ],
                   [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0  ],
                   [1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1  ],
                   [1, 0, 3, 0, 0, 1, 0, 1, 0, 0, 3, 0, 1  ],
                   [0, 0, 0, 1, 0, 1, 2, 1, 0, 1, 0, 0, 0  ],
                   [0, 1, 0, 1, 0, 0, 5, 0, 0, 1, 0, 1, 0  ],
                   [0, 1, 0, 0, 0, 4, 0, 4, 0, 0, 0, 1, 0  ]

               ];
               builder(coords);
               break;
           case 3:
               coords = [
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ],
                   [0, 1, 3, 1, 0, 1, 1, 1, 0, 1, 3, 1, 0  ],
                   [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0  ],
                   [0, 1, 3, 1, 0, 1, 1, 1, 0, 1, 3, 1, 0  ],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0  ],
                   [1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1  ],
                   [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1  ],
                   [0, 0, 1, 1, 0, 1, 2, 1, 0, 1, 1, 0, 0  ],
                   [0, 1, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1, 0  ],
                   [0, 3, 0, 0, 0, 4, 0, 4, 0, 0, 0, 3, 0  ]

               ];
               builder(coords);

               break;
       }
   };

 this.createMapOne = function (num) {
    return new Map().setCoords(num);

 }
}

var map = new Map().setCoords(3);

});