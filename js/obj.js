function View() {
    
    // define material textures
    //this.wall_1 = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("res/Tiles/texture-floor-tiles-500x500.jpg") });
    
    //event listeners
    let self = this;

    //$('#b1').click(function() {
        //self.load(0);
    
    
    this.createScene();
    //this.load(0);
    
    //window.addEventListener('resize', self.onWindowResize(), false);
    
    this.render();
}


View.prototype.createScene = function() {
    this.container = document.createElement('div');
    this.container.id = 'prod-canvas';
    this.c = document.getElementById('tab-description');
    this.c.appendChild(this.container);
    
    //this.container = document.getElementById("prod-canvas");
    this.width = this.container.offsetWidth-1;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer( { alpha: true } );
    this.renderer.setClearColor( 0x181818, 1 );
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild( this.renderer.domElement );

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1500);
    this.camera.position.set(-0.2,1.8, 3.4);
    
    // light
	this.ambient_light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
	this.scene.add(this.ambient_light);
	this.light = new THREE.DirectionalLight ('white', 0.6);
	this.light.position.set(0, 1, 0).normalize();
	this.scene.add(this.light);

}


View.prototype.render = function() {
    console.log('render');
    this.renderer.render(this.scene, this.camera);
}

var v = new View();