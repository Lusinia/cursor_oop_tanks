document.addEventListener("DOMContentLoaded", function (event) {

    var Direction = {
        top: 0,
        bottom: 1,
        left: 2,
        right: 3
    };

    var OppositeDirection = [
        Direction.top = Direction.bottom,
        Direction.bottom = Direction.top,
        Direction.left = Direction.right,
        Direction.right = Direction.left
    ];

    var Tank_weight = {
        light: 0,
        medium: 1,
        heavy: 2
    };

    var Tank_weightFileSuffix = [
        Tank_weight.light = "",
        Tank_weight.medium = "1",
        Tank_weight.heavy = "2"
    ];

    var TankDirectionDirectoryName = [
        Direction.top = "top",
        Direction.bottom = "bottom",
        Direction.left = "left",
        Direction.right = "right"
    ];

    /**
     * Shuffles array in place.
     * @param {Array} a items The array containing the items.
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    /* ----------------------------------------------------------------------------
    *  TANK
    */

    function Tank(weight, direction) {
        this._weight = weight;
        this._direction = direction;

        this.id = Math.random();

        this._view = this.getView(); // LOL :)

        this.collisionMap = [
            Direction.top = 0,
            Direction.bottom = 0,
            Direction.left = 0,
            Direction.right = 0
        ];
    }
    
    Tank.prototype.setDirection = function (direction) {
        this._direction = direction;
        
        // var tank = $('body').find("div[data-id='" + that.id + "']")[0];

        // auto-rotate to proper direction
        var fileNameSuffix = Tank_weightFileSuffix[_weight];
        var directoryName = TankDirectionDirectoryName[direction];
        var fullPath = "./img/" + directoryName + "/tank" + fileNameSuffix + ".png";

        this._view.style.background = 'url(' + fullPath + ')';
        this._view.style.backgroundSize = 'cover';
    };

    Tank.prototype.getDirection = function () {
        return this._direction;
    };

    Tank.prototype.getView = function () {
        if (this._view === "") {
            this._view = document.createElement('div');
            this._view.classList.add('tank');
            this._view.style.transition = 'all 0.5s linear';
            this._view.style.transformOrigin = 'center center';

            this._view.setAttribute('data-id', id);

            this._view = S(this._view);
        }

        return this._view;
    };

    Tank.prototype.move = function () {
        if (!this.canMove(this.getDirection())) {
            return;
        }

        // reset collision for opposite direction
        var oppositeDirection = OppositeDirection[this.getDirection()];
        this.collisionMap[oppositeDirection] = 0;

        switch (this.getDirection()) {
            case Direction.top:
                this.view.style.top = (parseInt(tank.style.top) - 1) + '%';
                break;

            case Direction.bottom:
                this.view.style.top = (parseInt(tank.style.top) + 1) + '%';
                break;

            case Direction.left:
                this.view.style.left = (parseInt(tank.style.left) - 1) + '%';
                break;

            case Direction.right:
                this.view.style.left = (parseInt(tank.style.left) + 1) + '%';
        }

    };

    Tank.prototype.canMove = function (direction) {
        return this.collisionMap[direction] === 0;
    };

    /* ----------------------------------------------------------------------------
     *  ENEMY AI
     */

    function EnemyAI(tanks) {
        this.tanks = tanks;
    }

    EnemyAI.prototype.tick = function () {
        for (var i = 0; i < this.tanks.length; i++) {
            var currentTank = tanks[i];

            if (currentTank.canMove(currentTank.getDirection())) {
                currentTank.move();
                continue;
            }

            var shuffledDirections = [
                Direction.top, Direction.bottom, Direction.left, Direction.right
            ];
            shuffle(shuffledDirections);

            for (var k = 0; i < shuffledDirections.length; k++) {
                var direction = shuffledDirections[k];

                if (currentTank.canMove(direction)) {
                    currentTank.setDirection(direction);
                    currentTank.move();
                    break;
                }
            }
        }
    };

    /* ----------------------------------------------------------------------------
     *  PLAYER CONTROLLER
     */

    function PlayerController (tankOne, tankTwo) {
        this.tankOne = tankOne;
        this.tankTwo = tankTwo;
    }

    /* ----------------------------------------------------------------------------
     *  COLLISION
     */

    function CollisionDetector (mapBlocks, allTanks) {
        this.mapBlocks = mapBlocks;
        this.allTanks = allTanks;
    }
    
    CollisionDetector.prototype.detect = function () {
        for (var i = 0; i < mapBlocks.length; i++) {
            var currentBlock = mapBlocks[i];

            for (var k = 0; k < allTanks.length; k++) {
                var currentTank =  allTanks[k];

                if (currentTank.getView().objectHitTest({"object": currentBlock, "transparency": true})) {
                    currentTank.collisionMap[currentTank.getDirection()] = 1;
                }
            }
        }
    };




















    var field = $('#field')[0];
    $('body').append(field);

    function Tank() {

        this.ride = function (speed) {



            function isHit() {
                var objectTank = $('body').find("div[data-id='" + that.id + "']");
                var map = $('.block');
                var isHitBlock = false;
                for (var i = 0; i < map.length; i++) {
                    var block = $(map[i]);
                    if (objectTank.objectHitTest({"object": block, "transparency": true})) {
                        isHitBlock = true;
                    }
                }

                return isHitBlock;
            }


            (function frame() {
                //
                // var tank = $('body').find("div[data-id='" + that.id + "']")[0];
                // var elem = $(tank);
                // direction = randomDirection();
                //
                //
                // switch (direction) {
                //     case "bottom":
                //         rotate('bottom');
                //         var bottom = setInterval(function () {
                //             moveBottom();
                //             if(isHit()){
                //                 isIntersects.bottom = 1;
                //                 isIntersects.top = 0;
                //             }
                //             if( isIntersects.bottom = 1){
                //                 clearInterval(bottom);
                //             }
                //             if (parseInt(tank.offsetTop) > ($('#field ').height() - 60)) {
                //                 tank.style.top = parseInt(tank.style.top) - 1 + '%';
                //                 clearInterval(bottom);
                //                  frame(direction);
                //                 return;
                //             }
                //         }, 100);
                //         break;
                //     case "top":
                //         rotate('top');
                //         var top = setInterval(function () {
                //             moveTop();
                //             if(isHit()){
                //                 isIntersects.bottom = 0;
                //                 isIntersects.top = 1;
                //             }
                //             if( isIntersects.top = 1){
                //                 clearInterval(top);
                //             }
                //             if ((parseInt(tank.style.top) <= 1)) {
                //                 tank.style.top = '2%';
                //                 clearInterval(top);
                //                 direction = randomDirection();
                //                 frame(direction);
                //                 return;
                //             }
                //         }, 100);
                //         break;
                //     case "left":
                //         rotate('left');
                //         var left = setInterval(function () {
                //             moveLeft();
                //             if(isHit()){
                //                 isIntersects.left = 1;
                //                 isIntersects.right = 0;
                //             }
                //             if( isIntersects.left = 1){
                //                 clearInterval(top);
                //             }
                //             if ((tank.offsetLeft <= 30 )) {
                //                 tank.style.left = parseInt(tank.style.left) + 1 + '%';
                //                 clearInterval(left);
                //                 direction = randomDirection();
                //                 frame(direction);
                //                 return;
                //             }
                //
                //         }, 100);
                //
                //         break;
                //     case "right":
                //         rotate('right');
                //
                //         var right = setInterval(function () {
                //             moveRight();
                //             if(isHit()){
                //                 isIntersects.left = 0;
                //                 isIntersects.right = 1;
                //             }
                //             if( isIntersects.left = 0){
                //                 clearInterval(top);
                //             }
                //             if ((tank.style.left >= '97%')) {
                //                 tank.style.left = parseInt(tank.style.left) - 1 + '%';
                //                 clearInterval(right);
                //                 direction = randomDirection();
                //                 frame(direction);
                //                 return;
                //             }
                //         }, 100);
                //
                //         break;
                // }

            })()

        };


        this.createButtleField = function (bots) {

            var tank;
            var oneSort = Math.floor(bots / 3);
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
            for (var i = 0; i <= oneSort + divided; i++) {
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
        var tank = new Tank().createButtleField(number);
    });

});

