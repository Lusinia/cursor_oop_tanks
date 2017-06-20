/**
 * Created by alenka on 20.06.17.
 */
function Ruler(num){
    var id = Math.random();

    this.add = function(num){
      var left =   num == 1 ? "205px" : "400px";
      var back =   num == 1 ? "./img/main1.png" : "./img/main2.png";
        var tank = document.createElement('div');
        var tankStyles = {
            'top': '460px',
            'left': left,
            'zIndex': '10000',
            'transition': 'all 0.12s linear',
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
         tank.setAttribute('data-id', id);


        $('#field').append(tank);
    };

this.move = function(num) {
    var el = $('body').find("div[data-id='" + id + "']")[0];
    console.log('el ',el)
    document.body.onkeydown = function (e) {

        var KEYCODE_LEFT,
            KEYCODE_RIGHT,
            KEYCODE_UP,
            KEYCODE_DOWN ;
        if (num == 1){
            // управляем буквами
            KEYCODE_LEFT = 37;
              KEYCODE_RIGHT = 39;
             KEYCODE_UP = 38;
             KEYCODE_DOWN = 40;
        } else if (num == 2) {
            // управляем  стрелками
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
                el.style.left = (parseInt(el.style.left) - 10) + 'px';
                direction = 'left';
                rotate(direction);
            } else if (e.keyCode == KEYCODE_RIGHT) {
                el.style.left = (parseInt(el.style.left) + 10) + 'px';
                direction = 'right';
                rotate(direction);

            } else if (e.keyCode == KEYCODE_UP) {
                el.style.top = (parseInt(el.style.top) - 10) + 'px';
                direction = 'top';
                rotate(direction);

            } else if (e.keyCode == KEYCODE_DOWN) {
                el.style.top = (parseInt(el.style.top) + 10) + 'px';
                direction = 'bottom';
                rotate(direction);


            }
            // if (el.offsetTop < 0) {
            //     el.style.top = '0px';
            // } else if (el.offsetTop > maxHeight) {
            //     el.style.top = maxHeight - 20 + 'px';
            // } else if (el.offsetLeft < 0) {
            //     el.style.left = '0px';
            // } else if (el.offsetLeft > maxWidth) {
            //     el.style.left = maxWidth - 10 + 'px';
            // }
        })()

    };
};
this.create = function(num){
    var tank = new Ruler();
    tank1.add(num);

}}
var tank1 = new Ruler();
tank1.add(1);
tank1.move();

var tank2 = new Ruler();
tank2.add(2);
tank2.move();

