define([], function () {
    return function (game, config) {
        var self = this;
        self.id = config.id;

        self.preload = function () {
            game.load.spritesheet("flag", "assets/flag-spritesheet.png", 64, 64);
            return self;
        };

        self.create = function () {
            return self.show(config.x0, config.y0, config.type);
        };

        self.show = function (x, y) {
            self.sprite = game.add.sprite(x, y, "flag");

            var frameRate = 20;
            
            self.sprite.animations.add('flag', [0], frameRate, false);
            self.sprite.animations.add('flagS', [1], frameRate, false);
            self.sprite.animations.add('flagL', [2], frameRate, false);
            self.sprite.animations.add('100', [10+0], frameRate, false);
            self.sprite.animations.add('200', [10+1], frameRate, false);
            self.sprite.animations.add('300', [10+2], frameRate, false);
            self.sprite.animations.add('400', [10+3], frameRate, false);
            self.sprite.animations.add('500', [10+4], frameRate, false);
            self.sprite.animations.add('600', [10+5], frameRate, false);
            self.sprite.animations.add('700', [10+6], frameRate, false);
            self.sprite.animations.add('800', [10+7], frameRate, false);
            self.sprite.animations.add('900', [10+8], frameRate, false);
            self.sprite.animations.add('1000', [20+9], frameRate, false);
            self.sprite.animations.add('100x2', [20+0], frameRate, false);
            self.sprite.animations.add('200x2', [20+1], frameRate, false);
            self.sprite.animations.add('300x2', [20+2], frameRate, false);
            self.sprite.animations.add('400x2', [20+3], frameRate, false);
            self.sprite.animations.add('500x2', [20+4], frameRate, false);
            self.sprite.animations.add('600x2', [20+5], frameRate, false);
            self.sprite.animations.add('700x2', [20+6], frameRate, false);
            self.sprite.animations.add('800x2', [20+7], frameRate, false);
            self.sprite.animations.add('900x2', [20+8], frameRate, false);
            self.sprite.animations.add('1000x2', [20+9], frameRate, false);
            
            // enabling ARCADE physics for the  hero
            game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
            self.sprite.body.immovable = true;
                        
            self.sprite.anchor.x = 0.5;
            self.sprite.anchor.y = 0.5;

            if (self.doubleValue())
                self.sprite.animations.play("flagS");
            else
                self.sprite.animations.play("flag");
            
            return self;
        };
        
        self.doubleValue = function() {
            return config.doubleValue || false;
        };

        self.catch = function(value, double) {
            self.sprite.animations.play(value + (double == true ? "x2" : ""));
            self.sprite.body.enable = false;
            setTimeout(function(){
                self.delete();
            }, 2000);
        };
                  
        self.update = function(map, layer) {
            return self;
        };
      
        self.delete = function() {
            if (self.sprite === undefined) return;
            self.sprite.destroy();
            self.sprite = undefined;
        };

        return self;
    };
});