/*
 *  jQuery keyhinting plugin - v0.0.1
 *  ~
 *  
 *
 *  Made by kosich <kosich@users.noreply.github.com>
 *  Under ISC License
 */
;(function ( $, window, document, undefined ) {
    'use strict';

    // CONSTANTS
    var pluginName = "keyHint",
        DATA_KEY_ATTR  = 'data-keyhint',
        KEYS = [ 'shift', 'alt', 'ctrl', 'meta' ],
        KEYCODES = {
            '16' : 'shift',
            '18' : 'alt',
            '17' : 'ctrl',
            '91' : 'meta'
        };

    var defaults = { };

    function KeyHint ( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    KeyHint.prototype = {
        init: function () {
            var $this = $( this.element ),
                ke = { };

            // cache the keyhinting elements
            for (var i = 0, j = KEYS.length; i < j; i++ ){
                ke[ KEYS[i] ] = $this.find( '[' + DATA_KEY_ATTR + '="' + KEYS[i] + '"]' );
            }

            $this.on('keydown', keyhandler( true ));
            $this.on('keyup', keyhandler( false ));

            function keyhandler (state){
                return function( e ){
                    var keyName = KEYCODES[ e.keyCode ];

                    console.log(e ,keyName, ' - ', e.keyCode);
                    if ( !keyName ){
                        return true;
                    }

                    var el = ke[ keyName ];
                    if ( el ) {
                        el[ state ? 'addClass' : 'removeClass']('hinted');
                    }
                };
            }
        }
    };

    KeyHint.prototype.constructor = KeyHint;

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        if ( !$.data( this, "plugin_" + pluginName ) ) {
            console.log('applying to', this);
            $.data( this, "plugin_" + pluginName, new KeyHint( this, options ) );
        }
        return this;
    };

})( jQuery, window, document );
