// 2017.08.24 code works, but look at https://phaser.io/tutorials/coding-tips-005 to improve the grid testing
define([], function() {
    return function(game, config) {
        var self = this;
        self.suspended = true;
        if (config.initialLives !== undefined) {
            self.lives = config.initialLives;

            self.explode = function() {
                self.animate("explode");
                self.lives--;
                return self;
            };
        }
        if (config.initialScore !== undefined) {
            self.score = config.initialScore;

            self.addScore = function(value) {
                self.score += value;
                return self;
            };
        }

        self.create = function() {

            var typeIndex = (config.type || 0) * 12;

            // adding the hero sprite
            self.sprite = game.add.sprite(config.x0, config.y0, "car");

            var frameRate = 20;

            self.sprite.animations.add('right', [typeIndex + 3], frameRate, false);
            self.sprite.animations.add('leftright', [typeIndex + 9, typeIndex + 10, typeIndex + 11, typeIndex + 0, typeIndex + 1, typeIndex + 2, typeIndex + 3], frameRate, false);
            self.sprite.animations.add('upright', [typeIndex + 0, typeIndex + 1, typeIndex + 2, typeIndex + 3], frameRate, false);
            self.sprite.animations.add('downright', [typeIndex + 6, typeIndex + 5, typeIndex + 4, typeIndex + 3], frameRate, false);

            self.sprite.animations.add('left', [typeIndex + 9], frameRate, false);
            self.sprite.animations.add('rightleft', [typeIndex + 3, typeIndex + 4, typeIndex + 5, typeIndex + 6, typeIndex + 7, typeIndex + 8, typeIndex + 9], frameRate, false);
            self.sprite.animations.add('upleft', [typeIndex + 0, typeIndex + 11, typeIndex + 10, typeIndex + 9], frameRate, false);
            self.sprite.animations.add('downleft', [typeIndex + 6, typeIndex + 7, typeIndex + 8, typeIndex + 9], frameRate, false);

            self.sprite.animations.add('up', [typeIndex + 0], frameRate, false);
            self.sprite.animations.add('downup', [typeIndex + 6, typeIndex + 7, typeIndex + 8, typeIndex + 9, typeIndex + 10, typeIndex + 11, typeIndex + 0], frameRate, false);
            self.sprite.animations.add('rightup', [typeIndex + 3, typeIndex + 2, typeIndex + 1, typeIndex + 0], frameRate, false);
            self.sprite.animations.add('leftup', [typeIndex + 9, typeIndex + 10, typeIndex + 11, typeIndex + 0], frameRate, false);

            self.sprite.animations.add('down', [typeIndex + 6], frameRate, false);
            self.sprite.animations.add('updown', [typeIndex + 0, typeIndex + 1, typeIndex + 2, typeIndex + 3, typeIndex + 4, typeIndex + 5, typeIndex + 6], frameRate, false);
            self.sprite.animations.add('rightdown', [typeIndex + 3, typeIndex + 4, typeIndex + 5, typeIndex + 6], frameRate, false);
            self.sprite.animations.add('leftdown', [typeIndex + 9, typeIndex + 8, typeIndex + 7, typeIndex + 6], frameRate, false);

            self.sprite.animations.add('roll', [typeIndex + 0, typeIndex + 1, typeIndex + 2, typeIndex + 3, typeIndex + 4, typeIndex + 5, typeIndex + 6], frameRate, true);

            self.sprite.animations.add('explode', [48], frameRate, false);

            // enabling ARCADE physics for the  hero
            game.physics.enable(self.sprite, Phaser.Physics.ARCADE);

            // setting hero anchor point
            self.sprite.anchor.x = 0.5;
            self.sprite.anchor.y = 0.5;

            self.reset();

            return self;
        };

        self.direction = function() {
            switch (self.sprite.body.facing) {
                case Phaser.LEFT:
                    return "left";
                case Phaser.RIGHT:
                    return "right";
                case Phaser.UP:
                    return "up";
                case Phaser.DOWN:
                    return "down";
                    // case Phaser.NONE:
                default:
                    return "stop";
            }
        };

        self.reset = function() {
            self.sprite.x = config.x0;
            self.sprite.y = config.y0;
            if (config.initialFuel !== undefined) {
                self.fuel = config.initialFuel;
            }
            self.animate("up");
            // self.sprite.body.facing = Phaser.UP;
            return self;
        };

        self.suspend = function() {
            self.stop();
            self.suspended = true;
            return self;
        };

        self.continue = function(direction) {
            self.suspended = false;
            direction = direction || self.direction();
            self[direction]();
            return self;
        };

        self.animate = function(name) {
            var newAnimation = self.sprite.animations.getAnimation(name);
            if (self.currentAnimation !== undefined) {
                if (self.currentAnimation.isFinished === false) {
                    self.currentAnimation.stop();
                    self.currentAnimation = undefined;
                }
            }
            newAnimation.play();
            self.currentAnimation = newAnimation;
        };

        self.left = function() {
            var sourceDirection = self.direction();
            if (sourceDirection === "left" && self.sprite.body.velocity.x < 0) return;
            if (sourceDirection === "stop" || sourceDirection === "left") sourceDirection = "";
            self.animate(sourceDirection + "left");
            self.sprite.body.velocity.x = -config.speed;
            self.sprite.body.velocity.y = 0;
            return self;
        };

        self.right = function() {
            var sourceDirection = self.direction();
            if (sourceDirection === "right" && self.sprite.body.velocity.x > 0) return;
            if (sourceDirection === "stop" || sourceDirection === "right") sourceDirection = "";
            self.animate(sourceDirection + "right");
            self.sprite.body.velocity.x = config.speed;
            self.sprite.body.velocity.y = 0;
            return self;
        };

        self.up = function() {
            var sourceDirection = self.direction();
            if (sourceDirection === "up" && self.sprite.body.velocity.y < 0) return;
            if (sourceDirection === "stop" || sourceDirection === "up") sourceDirection = "";
            self.animate(sourceDirection + "up");
            self.sprite.body.velocity.x = 0;
            self.sprite.body.velocity.y = -config.speed;
            return self;
        };

        self.down = function() {
            var sourceDirection = self.direction();
            if (sourceDirection === "down" && self.sprite.body.velocity.y > 0) return;
            if (sourceDirection === "stop" || sourceDirection === "down") sourceDirection = "";
            self.animate(sourceDirection + "down");
            self.sprite.body.velocity.x = 0;
            self.sprite.body.velocity.y = config.speed;
            return self;
        };

        self.stop = function() {
            self.sprite.body.velocity.x = 0;
            self.sprite.body.velocity.y = 0;
            self.sprite.animations.stop();
            return self;
        };

        self.reverse = function() {
            var direction = self.direction();
            if (direction === "right") {
                self.left();
            } else if (direction === "left") {
                self.right();
            } else if (direction === "down") {
                self.up();
            } else if (direction === "up") {
                self.down();
            }
        };

        self.canTurnLeft = function(map, layer) {
            var tile1 = self.getTile(map, layer);
            var tile = map.getTileLeft(map.currentLayer, tile1.x, tile1.y);
            if (tile == undefined) return false;
            if (tile.index > 1) return false;
            if ((self.sprite.y - self.sprite.height / 2) < (tile.worldY)) return false;
            if ((self.sprite.y + self.sprite.height / 2) > (tile.worldY + tile.height)) return false;
            return true;
        };

        self.canTurnRight = function(map, layer) {
            var tile1 = self.getTile(map, layer);
            var tile = map.getTileRight(map.currentLayer, tile1.x, tile1.y);
            if (tile == undefined) return false;
            if (tile.index > 1) return false;
            if ((self.sprite.y - self.sprite.height / 2) < (tile.worldY)) return false;
            if ((self.sprite.y + self.sprite.height / 2) > (tile.worldY + tile.height)) return false;
            return true;
        };

        self.canTurnUp = function(map, layer) {
            var tile1 = self.getTile(map, layer);
            var tile = map.getTileAbove(map.currentLayer, tile1.x, tile1.y);
            if (tile == undefined) return false;
            if (tile.index > 1) return false;
            if ((self.sprite.x - self.sprite.width / 2) < (tile.worldX)) return false;
            if ((self.sprite.x + self.sprite.width / 2) > (tile.worldX + tile.width)) return false;
            return true;
        };

        self.canTurnDown = function(map, layer) {
            var tile1 = self.getTile(map, layer);
            var tile = map.getTileBelow(map.currentLayer, tile1.x, tile1.y);
            if (tile == undefined) return false;
            if (tile.index > 1) return false;
            if ((self.sprite.x - self.sprite.width / 2) < (tile.worldX)) return false;
            if ((self.sprite.x + self.sprite.width / 2) > (tile.worldX + tile.width)) return false;
            return true;
        };

        self.getTile = function(map, layer) {
            return map.getTileWorldXY(self.sprite.world.x, self.sprite.world.y, map.tileWidth, map.tileHeight, layer);
        };

        self.follow = function(tile, map, layer) {
            if (self.suspended === true) return;

            var x = tile.worldX + tile.width / 2;
            var y = tile.worldY + tile.height / 2;

            var dx = tile.worldX + tile.width / 2 - self.sprite.world.x;
            var dy = tile.worldY + tile.height / 2 - self.sprite.world.y;
            var adx = Math.abs(dx);
            var ady = Math.abs(dy);
            if (adx > ady) {
                if (dx > 0) {
                    if (self.canTurnRight(map, layer)) self.right();
                } else {
                    if (self.canTurnLeft(map, layer)) self.left();
                }
            } else {
                if (dy > 0) {
                    if (self.canTurnDown(map, layer)) self.down();
                } else {
                    if (self.canTurnUp(map, layer)) self.up();
                }
            }
        };

        self.update = function(map, layer) {
            if (self.suspended === true) return;

            if (self.fuel !== undefined) {
                self.fuel -= 1 / 50;
            }

            game.physics.arcade.collide(self.sprite, layer, function(sprite, tile) {
                if (sprite.body.blocked.up === true) {
                    if (self.canTurnRight(map, layer)) self.right();
                    else if (self.canTurnLeft(map, layer)) self.left();
                    else if (self.canTurnDown(map, layer)) self.down();
                } else if (sprite.body.blocked.left === true) {
                    if (self.canTurnUp(map, layer)) self.up();
                    else if (self.canTurnDown(map, layer)) self.down();
                    else if (self.canTurnRight(map, layer)) self.right();
                } else if (sprite.body.blocked.down === true) {
                    if (self.canTurnLeft(map, layer)) self.left();
                    else if (self.canTurnRight(map, layer)) self.right();
                    else if (self.canTurnUp(map, layer)) self.up();
                } else if (sprite.body.blocked.right === true) {
                    if (self.canTurnDown(map, layer)) self.down();
                    else if (self.canTurnUp(map, layer)) self.up();
                    else if (self.canTurnLeft(map, layer)) self.left();
                } else {
                    self.stop();
                }
            }, null, self);

            return self;
        };

        self.delete = function() {
            if (self.sprite === undefined) return;
            self.sprite.destroy();
            self.sprite = undefined;
        };

        self.smoked = function() {
            self.suspend();
            self.animate("roll");
            return self;
        };

        return self;
    };
});