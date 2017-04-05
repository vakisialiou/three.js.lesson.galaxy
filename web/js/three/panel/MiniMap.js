/**
 *
 * @param {string} [idMap]
 * @constructor
 */
THREE.MiniMap = function ( idMap ) {

    /** @const {number} */
    var MAP_WIDTH = 320;

    /** @const {number} */
    var MAP_HEIGHT = 240;

    /**
     *
     * @type {string}
     */
    var id = idMap == undefined ? 'sw-map' : idMap;

    /**
     *
     * @type {null|Element}
     */
    var map = null;

    /**
     *
     * @returns {null|Element}
     */
    this.getElement = function () {
        return map;
    };

    /**
     *
     * @param {Element} [element]
     * @returns {THREE.MiniMap}
     */
    this.appendTo = function ( element ) {

        var container = element ? element : document.body;
        container.appendChild( templateMap() );
        return this;
    };

    /**
     *
     * @returns {Element}
     */
    function templateMap() {

        var size = getSize();
        map = document.createElement('div');
        map.id = id;
        map.classList.add('sw-map');
        map.style.position = 'absolute';
        map.style.width = size.width + 'px';
        map.style.height = size.height + 'px';
        map.style.right = size.right + 'px';
        map.style.bottom = size.bottom + 'px';
        return map;
    }

    /**
     *
     * @returns {{width: Number, height: Number, left: number, top: number}}
     */
    function getSize() {

        var width = window.innerWidth;
        var height = window.innerHeight;

        return {
            width: MAP_WIDTH,
            height: MAP_HEIGHT,
            right: 0,
            bottom: 0
        }
    }

    /**
     *
     * @returns {void}
     */
    function resize() {

        if ( !map ) {
            return;
        }

        var size = getSize();
        map.style.left = size.left + 'px';
        map.style.top = size.top + 'px';
    }

    window.addEventListener( 'resize', resize, false );
};