/**
 * Created by alenka on 20.06.17.
 */
function Ruler(num){
    this.number  = num;
 var that = this;
    this.add = function(){
      var left =   num == 1 ? "205px" : "400px";
      var back =   num == 1 ? "./img/main1.png" : "./img/main2.png";
        var tank = document.createElement('div');
        var tankStyles = {
            'top': '460px',
            'left': left,
            'zIndex': '10000',
            'transition': 'all 0.2s linear',
            'position': 'absolute',
            'background': 'url('+ back+')',
            'backgroundSize': 'cover',
            'width': '40px',
            'height': '40px'
        };
        for(key in tankStyles){
             tank.style[key] = tankStyles[key];
        }

        tank.classList.add('ruler');
         tank.setAttribute('data-number', that.number);


        $('#field').append(tank);
    };

this.move = function() {
    var el = $('body').find("div[data-number='" + that.number + "']")[0];
     document.body.onkeydown = function (e) {

        var KEYCODE_LEFT,
            KEYCODE_RIGHT,
            KEYCODE_UP,
            KEYCODE_DOWN ;

        if (that.number == 1){
            // управляем стрелками
            KEYCODE_LEFT = 37;
              KEYCODE_RIGHT = 39;
             KEYCODE_UP = 38;
             KEYCODE_DOWN = 40;
        } else {
            // управляем   буквами
            KEYCODE_LEFT = 65;
            KEYCODE_RIGHT = 68;
            KEYCODE_UP = 87;
            KEYCODE_DOWN = 83;
        }

        function rotate(dir) {

            switch (dir) {
                case "bottom":
                    el.style.transform = "rotate(180deg)";
                    break;
                case "top":
                    el.style.transform = "rotate( 0deg)";
                    break;
                case "left":
                    el.style.transform = "rotate(-90deg)";
                    break;
                case "right":
                    el.style.transform = "rotate(90deg)";
                    break;
            }
        }

        var direction = 'top';

        (function movePlayer() {

            if (e.keyCode == KEYCODE_LEFT) {
                direction = 'left';
                rotate(direction);
                el.style.left = (parseInt(el.style.left) - 10) + 'px';

            } else if (e.keyCode == KEYCODE_RIGHT) {
                direction = 'right';
                rotate(direction);
                el.style.left = (parseInt(el.style.left) + 10) + 'px';

            } else if (e.keyCode == KEYCODE_UP) {
                direction = 'top';
                rotate(direction);
                el.style.top = (parseInt(el.style.top) - 10) + 'px';


            } else if (e.keyCode == KEYCODE_DOWN) {
                direction = 'bottom';
                rotate(direction);
                el.style.top = (parseInt(el.style.top) + 10) + 'px';

            }

        })()

    };
};
this.create = function( ){
    var tank = new Ruler(num);
    tank.add();
    tank.move();

}}
var tank1 = new Ruler(1);
tank1.create();

var tank2 = new Ruler(2);
tank2.create();

