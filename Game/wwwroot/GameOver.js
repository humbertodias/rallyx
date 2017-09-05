define([], function () {
    return function (game, config) {
        var self = this;

        self.create = function () {
        };

        self.show = function (x, y) {
            self.sprite = game.add.sprite(x, y, "gameover");

            var frameRate = 20;
            
            self.sprite.animations.add('default', [0], frameRate, false);
                        
            self.sprite.anchor.x = 0.5;
            self.sprite.anchor.y = 0.5;

            self.sprite.animations.play("default");
            
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