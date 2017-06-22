/**
 * Created by alenka on 20.06.17.
 */
function Ruler(num) {
    this.number = num;
    var that = this;

    function isHit() {
        var elem = $('body').find("div[data-number='" + that.number + "']");
        var map = $('.block');
        var isHitBlock = false;
        for (var i = 0; i < map.length; i++) {
            var block = $(map[i]);
            if (elem.objectHitTest({"object": block, "transparency": true})) {
                isHitBlock = true;
            }
        }
        if (isHitBlock) {
            console.log('isHitBlock ', isHitBlock);
        }
        return isHitBlock;
    }


    this.add = function () {
        var left = num == 1 ? "205px" : "400px";
        var back = num == 1 ? "./img/top/main1.png" : "./img/top/main2.png";
        var tank = document.createElement('div');
        var tankStyles = {
            'top': '460px',
            'left': left,
            'zIndex': '100',
            'transition': 'all 0.2s linear',
            'transformOrigin': 'center center',
            'position': 'absolute',
            'background': 'url(' + back + ')',
            'backgroundSize': 'cover',
            'width': '35px',
            'height': '35px'
        };
        for (key in tankStyles) {
            tank.style[key] = tankStyles[key];
        }

        tank.classList.add('ruler');
        tank.setAttribute('data-number', that.number);


        $('#field').append(tank);
    };

    this.move = function (num) {
        var el = $('body').find("div[data-number='" + that.number + "']")[0];
        document.body.onkeydown = function (e) {

            var KEYCODE_LEFT,
                KEYCODE_RIGHT,
                KEYCODE_UP,
                KEYCODE_DOWN;

            if (num == 1) {
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
                var back;
                console.log(that.number)
                switch (dir) {
                    case "bottom":
                        back = that.number == 1 ? "./img/bottom/main1.png" : "./img/bottom/main2.png";
                        el.style.background = 'url(' + back + ')';
                        el.style.backgroundSize = 'cover';
                        break;
                    case "top":
                        back = that.number == 1 ? "./img/top/main1.png" : "./img/top/main2.png";
                        el.style.background = 'url(' + back + ')';
                        el.style.backgroundSize = 'cover';
                        break;
                    case "left":
                        back = that.number == 1 ? "./img/left/main1.png" : "./img/left/main2.png";
                        el.style.background = 'url(' + back + ')';
                        el.style.backgroundSize = 'cover';
                        break;
                    case "right":
                        back = that.number == 1 ? "./img/right/main1.png" : "./img/right/main2.png";
                        el.style.background = 'url(' + back + ')';
                        el.style.backgroundSize = 'cover';
                        break;
                }
            }

            var direction = 'top';

            (function movePlayer() {

                if (e.keyCode == KEYCODE_LEFT) {
                    direction = 'left';
                    rotate(direction);
                    setTimeout(function () {
                        el.style.left = (parseInt(el.style.left) - 5) + 'px';
                        if (isHit()) {
                            el.style.left = parseInt(el.style.left) + 25 + 'px';
                        }

                    }, 100)

                } else if (e.keyCode == KEYCODE_RIGHT) {
                    direction = 'right';
                    rotate(direction);
                    setTimeout(function () {
                        el.style.left = (parseInt(el.style.left) + 5) + 'px';
                        if (isHit()) {
                            el.style.left = parseInt(el.style.left) - 10 + 'px';
                        }
                    }, 100)


                } else if (e.keyCode == KEYCODE_UP) {
                    direction = 'top';
                    rotate(direction);
                    setTimeout(function () {
                        el.style.top = (parseInt(el.style.top) - 5) + 'px';
                        if (isHit()) {
                            el.style.top = parseInt(el.style.top) + 10 + 'px';
                        }
                    }, 100)


                } else if (e.keyCode == KEYCODE_DOWN) {
                    direction = 'bottom';
                    rotate(direction);
                    setTimeout(function () {
                        el.style.top = (parseInt(el.style.top) + 5) + 'px';
                        if (isHit()) {
                            el.style.top = parseInt(el.style.top) - 10 + 'px';
                        }
                    }, 100)


                }
                console.log(el.offsetLeft);
                if (el.offsetTop < 0) {
                    el.style.top = '0px';
                } else if (el.offsetTop >= ($('#field').height() - 50)) {
                    el.style.top = $('#field').height() - 45 + 'px';
                } else if (el.offsetLeft < 0) {
                    el.style.left = '2px';
                } else if (el.offsetLeft >= ($('#field').width() - 50 )) {
                    el.style.left = $('#field').width() - 60 + 'px';
                }

                //    console.log(parseInt(el.style.left), $(el).offset().left)

            })()
            /*top: 0;
             left: 0;
             ------
             top: calc(100% - widthTank);
             left: 0;
             ------
             top: 0;
             left: calc(100% - widthTank);
             ------
             top: calc(100% - widthTank);
             left: calc(100% - widthTank);*/

        };
    };
    this.create = function (x) {
        var tank = new Ruler(num);
        tank.add();
        tank.move(x);

    }
}
new Ruler(1).create(1);
new Ruler(2).create(2);


