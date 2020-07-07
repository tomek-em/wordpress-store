class World {
  constructor(canvas) {
    // init scene
    this.canvas = canvas;
    this.canv_width = canvas.offsetWidth;
		this.canv_height = canvas.offsetHeight;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.canv_width / this.canv_height, 0.1, 1000 );
    this.camera.position.set(7.0, 3.0, 10.0);

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setClearColor( 0xB3BEBE, 1 );
  	this.renderer.setSize( this.canv_width, this.canv_height );
  	this.canvas.appendChild( this.renderer.domElement );


    // Light
    const am_light = new THREE.AmbientLight( 0xd0d0d0, 1.5 );
    this.scene.add( am_light );


    // Set controls
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.update();

    // init basic texture canvas
    this.tex_canv = document.createElement('canvas');
    this.tex_canv.width = 512;
    this.tex_canv.height = 512;
    this.ctx = this.tex_canv.getContext('2d');

    this.txColor = 'black';
    this.color = 'white';
    this.img = '';
    this.text = '';
    this.frames = 0;
  }


  // set tests
  setTestScene() {
    this.loadTextures();
    const white = 0xffffff;
  	this.grey_mat = new THREE.MeshLambertMaterial({color:'#aaa'});
  	this.red_mat = new THREE.MeshLambertMaterial({color:'#e65'});
    // this.kafle = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("./res/tiles/brown.jpg") });

    // Window material
    this.alpha_mat = new THREE.MeshPhongMaterial({
      color:'#aaf',
      opacity: 0.4,
      transparent: true,
    });

    // Test cube
    const cube_geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const plane_geometry = new THREE.BoxGeometry( 10, 0.1, 10 );
  	this.cube = new THREE.Mesh( cube_geometry, this.red_mat );
    this.cube.position.set(3.0, 0.5, 0.0);
    this.plane = new THREE.Mesh( plane_geometry, this.grey_mat );
    this.plane.position.set(0.0, 0.0, 0.0);
  	this.scene.add( this.cube );
  	this.scene.add( this.plane );
  }






  // load image from file
  loadImg( path ) {
    const img = new Image();

    return new Promise((resolve, reject) => {
      if(path) {
        this.img_path = path;
        img.src = `${path}`;
        img.onload = function( res ) {
          resolve( img );
        }
      } else {
        console.error('can not load bg file');
        reject();
      }
    });
  }



    // Change custom image
    async changeCustomImage( path, bg_color, size ){
      this.clearCanvasObj();

      // load element
      if ( path ) {
        this.img = await this.loadImg( path );
        this.setCustomImage( size );
      }
    }


    // Set custom image
    setCustomImage( size ){
      let x = this.tex_canv.width /2;
      let a;
      size == 'l' ? a = 180 : a = 120;

      // set canvas context color
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, this.tex_canv.width, this.tex_canv.height);

      this.ctx.drawImage(this.img, x, 220-a, a, a);

      this.updateObjMaterials();
    }



    // Set custom text
    setCustomText( text, color, size ) {
      let x = this.tex_canv.width /2;

      if( color ) this.txColor = color;
      if( text && text.length <= 12 ) this.text = text;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, this.tex_canv.width, this.tex_canv.height);

      let font_size = '32pt';
      if (this.text.length < 7) font_size = '64pt';

      this.ctx.font = `${font_size} Righteous`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = this.txColor;
      this.ctx.fillText( this.text, 310 , 150 );

      this.ctx.needsUpdate = true;

      if( this.text ) this.updateObjMaterials();
    }


    // update obj mat
    updateObjMaterials() {
      const texture = new THREE.Texture( this.tex_canv );

      texture.flipY = false;
      texture.needsUpdate = true;

        let texture2 = new THREE.Texture( this.tex_canv );
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.repeat.x = -1;
        texture2.offset.x = 0.2;
        texture2.offset.y = -0.04;
        texture2.flipY = false;
        texture2.needsUpdate = true;

        let texture3 = new THREE.Texture( this.tex_canv );
        texture3.offset.x = 0.08;
        texture3.offset.y = -0.32;
        texture3.flipY = false;
        texture3.needsUpdate = true;

      this.product_model.children[0].children[11].material = new THREE.MeshBasicMaterial({ map: texture });
      this.product_model.children[0].children[12].material = new THREE.MeshBasicMaterial({ map: texture2 });
      this.product_model.children[0].children[13].material = new THREE.MeshBasicMaterial({ map: texture3 });
    }


    // change car color
    setCarColor( color ) {
      if( color ) this.color = color;
      let color_mat = new THREE.MeshBasicMaterial({ color: this.color });

      this.product_model.children[0].children[0].material = color_mat;
      this.product_model.children[0].children[0].material.side = THREE.DoubleSide;
      this.product_model.children[0].children[11].material = color_mat;
      this.product_model.children[0].children[12].material = color_mat;
      this.product_model.children[0].children[13].material = color_mat;

      if(this.img) this.setCustomImage();
      if(this.text) this.setCustomText();
    }


    // Clear elements - text, img
    clearCanvasObj() {
      this.img = '';
      this.text = '';

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, this.tex_canv.width, this.tex_canv.height);
      this.updateObjMaterials();
    }





  // Load GLTF Obj
  loadGLTF( path ) {
    const loader = new THREE.GLTFLoader();
    let nr = 1; // color ver
    let obj = [];
    const self = this

    return new Promise( ( resolve, reject ) => {

      loader.load(path,
        function ( gltf ) {
        gltf.scene.traverse( function ( node ) {
          if ( node.isMesh ) {
            // if( node.material.name == 'new_glass' ) node.material = self.alpha_mat;
          }
        });

        let side_mat = new THREE.MeshBasicMaterial({color:'#fff'});
        let grey_mat = new THREE.MeshBasicMaterial({color:'#777'});
        let glass = new THREE.MeshPhongMaterial({
          color:'#AAC',
          opacity: 0.94,
          transparent: true,
        });

        // Set main element color
        gltf.scene.children[0].children[0].material = side_mat;
        gltf.scene.children[0].children[0].material.side = THREE.DoubleSide;
        // Set door and hood colors
        gltf.scene.children[0].children[11].material = side_mat;
        gltf.scene.children[0].children[12].material = side_mat;
        gltf.scene.children[0].children[13].material = side_mat;
        // Set windows and light color
        gltf.scene.children[0].children[6].material = glass;
        gltf.scene.children[0].children[6].material.side = THREE.DoubleSide;
        // Set other material color
        gltf.scene.children[0].children[4].material = grey_mat;
        gltf.scene.children[0].children[4].material.side = THREE.DoubleSide;
        gltf.scene.children[0].children[10].material = grey_mat;
        gltf.scene.children[0].children[10].material.side = THREE.DoubleSide;

        // obj[1].material = side_mat;
        self.product_model = gltf.scene;
        self.scene.add( self.product_model );

        resolve();
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'Error' );
            reject();
        }
      );  // end of loader
    });
  }




  rotateMesh(mesh) {
    if(mesh) mesh.rotation.y += 0.045;
  }

  animate() {
    this.frames ++;
    this.rotateMesh(this.cube);
  }

  render() {
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }



  onWindowResize() {
    const canvas_cont = document.getElementById('canvas_cont');
  	const width  = canvas_cont.offsetWidth;
  	const height = canvas_cont.offsetHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

}
