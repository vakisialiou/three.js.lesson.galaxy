/**
 * @param {string} idElement
 * @param {boolean} [lock]
 * @constructor
 */
THREE.SceneControls = function ( idElement, lock ) {

    /**
     *
     * @type {boolean}
     * @private
     */
    this._lock = lock;

    /**
     *
     * @type {Scene}
     */
    this.scene = new THREE.Scene();

    /**
     *
     * @type {Element}
     */
    this.container = document.getElementById( idElement );

    /**
     *
     * @type {WebGLRenderer}
     */
    this.renderer = new THREE.WebGLRenderer();

    /**
     *
     * @type {PerspectiveCamera}
     */
    this.camera = new THREE.PerspectiveCamera();

    /**
     *
     * @type {THREE.SceneControls}
     */
    var scope = this;

    var flyControls = null;

    /**
     *
     * @type {THREE.MultiLoader}
     */
    var loader = new THREE.MultiLoader( this.scene );

    loader.addLoad(
        'mi-starship',
        '/web/models/M1/cwwf1303rf28-W/Wraith Raider Starship/',
        'Wraith Raider Starship.obj',
        'Wraith_Raider_Starship.mtl'
    );

    loader.addLoad(
        'mi-rocket',
        '/web/models/rockets/MissileMBDA Meteor/Files/',
        'Missile MBDA Meteor.obj',
        'Missile MBDA Meteor.mtl'
    );

    // var model = null;

    loader.load(function () {

        // model = loader.getModel('mi-starship');
        // model.add( scope.camera );



        flyControls = new THREE.FlyControls( scope.scene, loader, scope.camera, scope.renderer.domElement );
        flyControls.initOrbitControl();
        // scope.scene.add(model);

        var miniMap = new THREE.MiniMap();
        miniMap.appendTo();

        var panel = new THREE.PanelControl( miniMap );

        panel.addAction( function () {

            new ui.FullScreen().toggle();

        }, null, 'fullscreen', null, true );

        panel.addProgress( 1, 'energy', 2000, 25, '#FF9900' );
        panel.addProgress( 2, 'armor', 4000, 20, '#008AFA' );
        panel.addProgress( 3, 'hull', 1000, 10, '#C10020' );
        panel.appendTo();


        // var rocket = loader.getModel('mi-rocket');
        // scope.scene.add(rocket);

        initScene();

    });


    window.addEventListener( 'resize', windowResize, false );
    document.addEventListener( 'contextmenu', contextMenu, false );
    document.addEventListener( 'keydown', keyDown, false );

    /**
     *
     * @returns {Number}
     */
    this.getWidth = function() {
        return window.innerWidth;
    };

    /**
     *
     * @returns {Number}
     */
    this.getHeight = function() {
        return window.innerHeight;
    };

    /**
     *
     * @returns {number}
     */
    this.getAspect = function() {
        return  this.getWidth() / this.getHeight();
    };

    /**
     *
     * @returns {void}
     */
    function initScene() {

        scope.renderer.setSize( scope.getWidth(), scope.getHeight() );
        scope.container.appendChild( scope.renderer.domElement );

        initCamera();
        initLight();
        render();
    }

    var clock = new THREE.Clock();

    /**
     *
     * @returns {void}
     */
    function render() {
        requestAnimationFrame( render );

        if ( flyControls ) {
            var delta = clock.getDelta();
            flyControls.update( delta );
        }

        scope.renderer.render( scope.scene, scope.camera );
    }

    /**
     *
     * @returns {void}
     */
    function initCamera() {

        scope.camera.position.x = 0;
        scope.camera.position.z = -2500;
        scope.camera.position.y = 1000;
        scope.camera.fov = 45;
        scope.camera.near = 0.1;
        scope.camera.far = 100000;
        scope.camera.aspect = scope.getAspect();
        scope.camera.lookAt( scope.scene.position );
        scope.camera.updateProjectionMatrix();
        // scope.scene.add( scope.camera );
    }

    function initLight() {

        var light = new THREE.HemisphereLight( 0xFFFFFF, 0x000000, 1 );
        light.position.set( 0, 500, 0 );
        scope.scene.add( light );

        var color = new THREE.Color( 0xCCCCCC );
        var grid = new THREE.GridHelper( 6500, 50, color, 0x666666 );
        scope.scene.add( grid );
    }

    /**
     *
     * @returns {void}
     */
    function windowResize () {
        scope.camera.aspect = scope.getAspect();
        scope.camera.updateProjectionMatrix();
        scope.renderer.setSize( scope.getWidth(), scope.getHeight() );
    }

    /**
     *
     * @returns {void}
     */
    function contextMenu( e ) {
        if ( scope._lock ) {
            e.preventDefault();
        }
    }

    /**
     *
     * @returns {void}
     */
    function keyDown( e ) {

        switch ( e.which ) {
            case 123:
                if ( scope._lock ) {
                    e.preventDefault();
                }
                break;
            case 122:
                if ( scope._lock ) {
                    e.preventDefault();
                }
                break;
        }
    }

};