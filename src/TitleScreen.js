import ui.View;
import ui.ImageView;
import menus.views.MenuView as MenuView;

exports = Class(ui.ImageView, function(supr) {
    this.init = function(opts) {
        this._menuBaackground = new ImageView({
            x: 0,
            y: 0,
            width: opts.baseWidth,
            height: opts.baseHeight,
            image: 'resources/images/title_screen.png'
        });

        this._createMainMenu();
        //     opts = merge(opts, {
        //         x: 0,
        //         y: 0,
        //         image: "resources/images/title_screen.png"
        //     });

        //     supr(this, 'init', [opts]);
        //     this.build();
        // };

        // this.build = function(){
        //     //Our screen buttons - starts the game
        //     var startButton = new ui.View({
        //         superview: this,
        //         x: 58,
        //         y: 313,
        //         width: 200,
        //         height: 100
        //     });

        //     startButton.on('InputSelect', bind(this, function() {
        //         this.emit('titlescreen:start');
        //     }));
    };

    this._createMainMenu = function() {
        this._mainMenu = new MenuView({
            superview: this,
            title: 'Main Menu',
            items: {}
        }).show();
    };

    this.showMenu = function(menu) {
        this[menu] && (typeof this[menu].show === 'function') && this.menu.show();
    };
});
