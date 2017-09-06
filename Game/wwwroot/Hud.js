define([], function () {
    return function (game, config) {

        this.create = function () {
            var self = this;
            self.sprite = game.add.sprite(config.x0, config.y0, "hud");

            self.sprite.animations.add('hud', [0], 1, false);
            self.sprite.fixedToCamera = true;
            self.sprite.z = 100;

            self.sprite.animations.play("hud");

            self.hudGraphics = game.add.graphics(1088, 0);
            self.hudGraphics.fixedToCamera = true;
            self.hudGraphics.z = 101;

            self.hudHighScoreText = game.add.text(1280, 22, (config.highScore || 0), {
                font: "28px Courier",
                fill: "#ffff00",
                align: "right"
            });
            self.hudHighScoreText.fixedToCamera = true;
            self.hudHighScoreText.anchor.x = 1;
            self.hudHighScoreText.z = 101;

            self.hudScoreText = game.add.text(1280, 71, "", {
                font: "28px Courier",
                fill: "#ffff00",
                align: "right"
            });
            self.hudScoreText.fixedToCamera = true;
            self.hudScoreText.anchor.x = 1;
            self.hudScoreText.z = 101;

            self.hudRoundText = game.add.text(1280, 624, "", {
                font: "28px Courier",
                fill: "#ffffff",
                align: "right"
            });
            self.hudRoundText.fixedToCamera = true;
            self.hudRoundText.anchor.x = 1;
            self.hudRoundText.z = 101;

            return self;
        };

        this.render = function () {
            var self = this;
            
            self.hudGraphics.clear();
            // hude 2UP
            self.hudGraphics.beginFill(0x000000, 1);
            self.hudGraphics.drawRect(0, 94, 192, 36);
            self.hudGraphics.endFill();
            return self;
        };
        
        this.location = function (tile, color, startx, starty) {
            var self = this;
            self.hudGraphics.beginFill(color, 1);
            self.hudGraphics.drawRect(tile.x * 5 + 0 + (startx || 0), tile.y * 5 + 0 + (starty || 0), 5, 5);
            self.hudGraphics.endFill();
            return self;
        };

        this.fuel = function(fuel) {
            var self = this;
            var fuelx = fuel * 192 / 100;
            self.hudGraphics.beginFill(0xffff00, 1);
            self.hudGraphics.drawRect(192 - fuelx, 194, fuelx, 20);
            self.hudGraphics.endFill();
            return self;
        };
        
        this.lives = function(lives) {
            var self = this;
            var livesx = lives * 48;
            self.hudGraphics.beginFill(0x000000, 1);
            self.hudGraphics.drawRect(livesx, 575, 192 - livesx, 36);
            self.hudGraphics.endFill();
            return self;
        };

        this.round = function(round) {
            var self = this;
            self.hudRoundText.text = round;
            return self;
        };

        this.score = function(score) {
            var self = this;
            self.hudScoreText.text = score || 0;
            return self;
        };

        this.highScore = function(highScore) {
            var self = this;
            self.hudHighScoreText.text = highScore || 0;
            return self;
        };

        return this;
    };
});