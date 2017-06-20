document.addEventListener("DOMContentLoaded", function (event) {

    var field = $('#field')[0];
    $('body').append(field);

    function Tank() {
        var position, weight;
        var that = this;
        var id = Math.random();
        this.id = id;
        console.log(' that.weight ', weight);
        function createUnit(position, weight) {
            var tank = document.createElement('div');
            tank.classList.add('tank');
            tank.style.transition = 'all 0.5s linear';
            tank.style.transformOrigin = 'center center';
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
            function speed() {
                console.log('weight', weight);
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


            (function frame() {

                var tank = $('body').find("div[data-id='" + that.id + "']")[0];
                var elem = $(tank);
                var end = false;
                direction = randomDirection();


                switch (direction) {
                    case "bottom":
                        rotate('bottom');
                        var bottom = setInterval(function () {
                            moveBottom();

                            if (isHit() || parseInt(tank.offsetTop) > ($('#field ').offset().top + $('#field ').height() - 60)) {
                                tank.style.top = parseInt(tank.style.top) - 5 + '%';
                                clearInterval(bottom);
                                direction = randomDirection();
                                frame(direction);
                                end = true;
                                return;
                            }
                        }, 50);
                        break;
                    case "top":
                        rotate('top');
                        var top = setInterval(function () {
                            moveTop();
                            if (isHit() || parseInt(tank.offsetTop) <= 5) {
                                tank.style.top = parseInt(tank.style.top) + 5 + '%';

                                clearInterval(top);
                                direction = randomDirection();
                                frame(direction);
                                end = true;
                                return;
                            }
                        }, 50);
                        break;
                    case "left":
                        rotate('left');
                        var left = setInterval(function () {
                            moveLeft();

                            if (isHit() || (parseInt(tank.offsetLeft) <= ($('#field ').offset().left - 10 ))) {
                                tank.style.left = parseInt(tank.style.left) + 1 + '%';

                                clearInterval(left);
                                direction = randomDirection();
                                frame(direction);
                                end = true;
                                return;
                            }

                        }, 50);

                        break;
                    case "right":
                        rotate('right');

                        var right = setInterval(function () {
                            moveRight();

                            if (isHit() || parseInt(tank.offsetLeft) > ( $('#field').width() - 100)) {
                                tank.style.left = parseInt(tank.style.left) - 1 + '%';

                                clearInterval(right);
                                direction = randomDirection();
                                frame(direction);
                                end = true;
                                return;
                            }
                        }, 50);

                        break;
                }
                if (end) {
                    console.log('end', end)
                }
            })()

        };
        this.createButtleField = function (bots) {
            var tank;
            var oneSort = Math.floor(bots/3);
            var divided = oneSort % 3;
            for (var i = 0; i <= oneSort; i++) {
                tank = new Tank();
                tank.create('center', 'light');
                tank.ride();
            }
            for (var i = 0; i <= oneSort; i++) {
                tank = new Tank();
                tank.create('left', 'medium');
                tank.ride();
            }
            for (var i = 0; i <= oneSort+divided; i++) {
                tank = new Tank();
                tank.create('right', 'hard');
                tank.ride();
            }
        }
    }


    $('body').on('keydown', function (e) {
        if (e.keyCode == 13) {
            setTimeout(function () {
                $('.main').css('display', 'block');
            }, 500);
        }
    });

    $('.start').on('click', function () {
        var number = $('#bots').val();
        console.log(number);
        var tank = new Tank().createButtleField(number);
    });

});

