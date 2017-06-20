document.addEventListener("DOMContentLoaded", function (event) {

    var field = $('#field')[0];
    $('body').append(field);

    function Tank() {
        var position, weight;
        var that = this;
        var id = Math.random();
        this.id = id;

        function createUnit(position, weight) {
            var tank = document.createElement('div');
            tank.classList.add('tank');
            tank.style.transition = 'all 0.5s linear';
            console.log(tank);
            switch (position) {
                case 'left':
                    tank.style.left = '2px';
                    tank.style.top = '2px';
                    tank.setAttribute('data-side', "left");
                    break;
                case 'center':
                    tank.style.left = '48%';
                    tank.style.top = '2px';
                    tank.setAttribute('data-side', 'center');
                    break;
                case 'right':
                    tank.style.left = '98%';
                    tank.style.top = '2px';
                    tank.setAttribute('data-side', 'right');
                    break;
            }
            console.log(weight);

            switch (weight) {
                case 'light':
                    tank.setAttribute('data-weight', 'light');
                    break;
                case 'medium':
                    tank.setAttribute('data-weight', 'medium');
                    break;
                case 'hard':
                    tank.setAttribute('data-weight', 'hard');
                    break;
            }
            tank.setAttribute('data-id', id);

            field.append(tank);
            return tank
        }


        this.create = function (position, weight) {
            createUnit(position, weight);
        };
        this.setAttr = function (position, weight) {
            this.position = position;
            this.weight = weight;
        };
        this.getAttr = function () {
            return {
                position: this.position,
                background: this.background,
                speed: this.speed
            }
        };
        this.ride = function () {

            function randomDirection() {
                var chooseSide = Math.round(Math.random() * 3);
                var dir;
                switch (chooseSide) {
                    case 0:
                        dir = "bottom";
                        break;
                    case 1:
                        dir = "top";
                        break;
                    case 2:
                        dir = "left";
                        break;
                    case 3:
                        dir = "right";
                        break;
                }
                return dir;
            }

            function rotate(dir) {
                var tank = $('body').find("div[data-id='" + that.id + "']")[0];
                switch (dir) {
                    case "bottom":
                        tank.style.transform = "rotate(180deg)";
                        break;
                    case "top":
                        tank.style.transform = "rotate( 0deg)";
                        break;
                    case "left":
                        tank.style.transform = "rotate(-90deg)";
                        break;
                    case "right":
                        tank.style.transform = "rotate(90deg)";
                        break;
                }
            }


            var tank = $('body').find("div[data-id='" + that.id + "']")[0];
            var elemOffsetTop = tank.offsetTop + tank.offsetHeight;
            var elemOffsetLeft = tank.offsetLeft + tank.offsetWidth;
            var docHeight = ($(document).height() - tank.offsetHeight);
            var docWidth = ($(document).width() - tank.offsetWidth);

            function isHit() {
                var elem = $('body').find("div[data-id='" + that.id + "']");
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

            // start animation
            function moveRight() {
                tank.style.left = (parseInt(tank.style.left) + 1) + '%';
            }

            function moveLeft() {
                tank.style.left = (parseInt(tank.style.left) - 1) + '%';
            }

            function moveTop() {
                tank.style.top = (parseInt(tank.style.top) - 1) + '%';
            }

            function moveBottom() {
                tank.style.top = (parseInt(tank.style.top) + 1) + '%';
            }

            function speed(weight) {
                var speed;
                switch (weight) {
                    case 'light':
                        speed = '100';
                        break;
                    case 'medium':
                        speed = '300';
                        break;
                    case 'hard':
                        speed = '500';
                        break;
                }
            return speed;
            }

            (function frame() {

                var tank = $('body').find("div[data-id='" + that.id + "']")[0];
                var elem = $(tank);
                var end = false;
                direction = randomDirection();
                console.log(end);
                console.log(' speed() ',  speed(that.weight));
                console.log(' that.weight ',  that.weight);
                console.log(direction);
                switch (direction) {
                    case "bottom":
                        rotate('bottom');
                        var bottom = setInterval(moveBottom, speed(that.weight));
                        if ((parseInt(tank.style.top) == ($('#field ').height() - 50))) {
                            clearInterval(bottom);
                            direction = randomDirection();
                            frame(direction);
                            end = true;
                            return;
                        }
                        break;
                    case "top":
                        rotate('top');
                        var top = setInterval(moveTop, speed(weight));
                        if (parseInt(tank.style.top) <= '5' || isHit(elem)) {
                            console.log('')
                            clearInterval(top);
                            direction = randomDirection();
                            frame(direction);
                            end = true;
                            return;
                        }
                        break;
                    case "left":
                        rotate('left');
                        var left = setInterval(moveLeft, speed(weight));
                        if (parseInt(tank.style.left) < (($('#field ').width() / 2)- 20) ) {
                            console.log('left',(parseInt(tank.style.left) < ($(document).width() - ($('#field ').width() / 2))), ' isHit(elem)', isHit(elem));
                            clearInterval(left);
                            direction = randomDirection();
                            frame(direction);
                            end = true;
                            return;

                        }
                        break;
                    case "right":
                        rotate('right');
                        var right = setInterval(moveRight, speed(weight));
                        if (parseInt(tank.style.left) >= (($(document).width() - ($('#field ').width() / 2) - 50)  )) {
                            clearInterval(right);

                            end = true;
                            frame(direction);
                            return;

                        }
                        break;
                }
                if (end) {
                    console.log('end', end)
                }

            })()


        };
    }


 //   var tank = new Tank();
  //  tank.create('center', 'light');
   // tank.ride();
    // var tank2 = new Tank();
    // tank2.create('left', 'hard');
    // tank2.ride();
    // var tank2 = new Tank('right', 'medium').create().ride();
    // var tank3 = new Tank('left', 'hard').create().ride();


});
// function repeatAnim(){
//     return new  Promise(function(resolve, reject) {
//         var random = randomDirection();
//         animation(random);
//           resolve();
//     }).then(function( ){
//         var random = randomDirection();
//
//         animation(random);
//     })

//  repeatAnim();
//  Promise.resolve().then(function resolver() {
//      var random = randomDirection();
//     return rotate(random)
//         .then(animation(random))
//         .then(resolver);
// }).catch(function (error) {
//     console.log("Error: " + error);
// })
