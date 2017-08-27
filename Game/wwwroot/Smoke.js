define([], function () {
    return function (game, config) {
        var self = this;
        self.id = config.id;

        self.preload = function () {
            return self;
        };

        self.create = function () {
            self.sprite = game.add.sprite(config.x0, config.y0, "smoke");

            var frameRate = 20;
            
            self.sprite.animations.add('smoke', [0], frameRate, false);
            
            // enabling ARCADE physics for the  hero
            game.physics.enable(self.sprite, Phaser.Physics.ARCADE);
            self.sprite.body.immovable = true;
                        
            self.sprite.anchor.x = 0.5;
            self.sprite.anchor.y = 0.5;

            self.sprite.animations.play("smoke");

            return self;
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