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

    this.txColor = 'black';
    this.color = 'white';
    this.frames = 0;

    // this.setTestScene();
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




  loadTextures() {
    var loader = new THREE.TextureLoader();

    var texture = loader.load( './res/tiles/brown.jpg', function ( texture ) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set( 0, 0 );
        texture.repeat.set( 0.8, 2.4);
    } );

    this.kafle2 = new THREE.MeshPhongMaterial( {
         color: 0xffffff,
         specular:0x111111,
         shininess: 10,
         map: texture,
      } );

    this.metal = new THREE.MeshPhongMaterial({
      color: 0xbbbbbb,
      specular: 0x050505,
      metalness: 1,
      roughness: 0.6,
      shininess: 80
    });

      // floor panel tex
      var floor_panel_tex = loader.load( './res/tex/floor.png', function ( texture ) {
          floor_panel_tex.wrapS = texture.wrapT = THREE.RepeatWrapping;
          floor_panel_tex.offset.set( 0, 0 );
          floor_panel_tex.repeat.set( 0.8, 2.4);
      } );

      this.floor_panel_mat = new THREE.MeshPhongMaterial( {
           color: 0xffffff,
           specular:0x111111,
           shininess: 10,
           map: floor_panel_tex,
        } );
  }



  // Load side svg texture material
  loadSvgTexture( path ) {
    let mat = new THREE.MeshBasicMaterial( {color: '#aff'} );
    // let trailer_side = this.product_model.children[2].children[2];
    let elements = [];
    elements[0] = this.product_model.children[0].children[11];
    elements[1] = this.product_model.children[0].children[12];
    elements[2] = this.product_model.children[0].children[13];

    // let height = geometry.boundingBox,

    const loader = new THREE.TextureLoader()
    loader.load( path ,
    function( data ) {
      // on texture loaded
      let tex = data;

      let tex_h = tex.image.height;
      console.log( tex_h );

      tex.flipY = false;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      // tex.wrapT = THREE.RepeatWrapping;

      let repeatX = 4;
      let repeatY = 4;
      tex.repeat.set(repeatX, repeatY);
      tex.offset.x = -1.5;
      tex.offset.y = -0.8;

      let tex_mat = new THREE.MeshLambertMaterial({
        map: tex,
        combine: THREE.MixOperation,
        blending: 1,
        transparent: true,
        color: 0x00FF00
      });

      // console.log( elements[0].material );
    },
    function ( err ) {
      console.log( err );
    });
  }





  // change elements
  // setCustomElements( path, text, largeSize ) {
  //   let elements = [];
  //   elements[0] = this.product_model.children[0].children[11];
  //   elements[1] = this.product_model.children[0].children[12];
  //   elements[2] = this.product_model.children[0].children[13];
  //   let large_size;
  //
  //   // open image if set
  //   const img = new Image();
  //   img.src = path;
  //
  //   img.onload = function() {
  //     const canvas = document.createElement('canvas');
  //     canvas.width = 400;
  //     canvas.height = 400;
  //
  //     const texture = new THREE.Texture(canvas);
  //
  //     let ctx = canvas.getContext('2d');
  //     ctx.fillStyle = '#fff';
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //     if ( largeSize ) {
  //       ctx.drawImage(img, 150, 50, 200, 200);
  //     } else {
  //       ctx.drawImage(img, 160, 100, 80, 80);
  //     }
  //
  //     // create text if set
  //     if( text ) {
  //       console.log( text );
  //     }
  //
  //     texture.flipY = false;
  //     texture.needsUpdate = true;
  //
  //     let texture2 = new THREE.Texture(canvas);
  //     texture2.wrapS = THREE.RepeatWrapping;
  //     texture2.repeat.x = - 1;
  //     texture2.flipY = false;
  //     texture2.needsUpdate = true;
  //
  //
  //     let mat_left = new THREE.MeshBasicMaterial({ map: texture });
  //     let mat_right = new THREE.MeshBasicMaterial({ map: texture2 });
  //
  //     elements[0].material = mat_left;
  //     elements[1].material = mat_right;
  //     elements[2].material = mat_left;
  //     // elements[0].material.side = THREE.DoubleSide;
  //   }
  // }





  loadImg( path, img ) {
    return new Promise((resolve, reject) => {
      if(path) {
        this.img_path = path;
        img.src = `${path}`;
        img.onload = function( res ) {
          resolve( img );
        }
      } else {
        reject();
      }
    });
  }


  // change elements
  async setCustomElements ( path, largeSize ) {

    let elements = [];
    elements[0] = this.product_model.children[0].children[11];
    elements[1] = this.product_model.children[0].children[12];
    elements[2] = this.product_model.children[0].children[13];

    let materials;

    const img = new Image();

    // open image if set
    if( path ) await this.loadImg(path, img);

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;

    const texture = new THREE.Texture(canvas);

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // place img if set
    if ( largeSize ) {
      ctx.drawImage(img, 120, 50, 160, 160);
    } else {
      ctx.drawImage(img, 160, 100, 80, 80);
    }

    // fill with color
    let line = null;
    if ( line != null ) {
      ctx.fillStyle = '#ddd';
      ctx.fillRect(0, 0, canvas.width/1, canvas.height/1);
    }

    texture.flipY = false;
    texture.needsUpdate = true;

    let texture2 = new THREE.Texture(canvas);
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.repeat.x = -1;
    texture2.offset.y = -0.04;
    texture2.flipY = false;
    texture2.needsUpdate = true;

    let texture3 = new THREE.Texture(canvas);
    texture3.offset.x = -0.02;
    texture3.offset.y = -0.32;
    texture3.flipY = false;
    texture3.needsUpdate = true;

    this.tex1 = texture;
    this.ctx = ctx;

    elements[0].material = new THREE.MeshBasicMaterial({ map: texture });
    elements[1].material = new THREE.MeshBasicMaterial({ map: texture2 });
    elements[2].material = new THREE.MeshBasicMaterial({ map: texture3 });
  }


  // Set text
  setText( text, color ) {
    let path = null;
    if ( text != null ) this.text = text;
    else if ( text == null ) path = this.img_path;

    if ( color != null ) this.txColor = color;
    if ( path == null ) this.img_path = null;

    // create text if set
    this.setCustomElements( path, true );

    if( this.text != null ) {
      // FONT from google
      let font_size = '36pt';
      if (this.text.length < 7) font_size = '52pt';

      this.ctx.font = `${font_size} Righteous`;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = this.txColor;
      this.ctx.fillText( this.text, 200 , 120 );

      this.ctx.needsUpdate = true;
      // this.product_model.children[0].children[11].material = new THREE.MeshBasicMaterial({ map: this.tex1 });
    }
    console.log( this.text, ' ', this.txColor );
  }


  // change car color
  changeColor( color ) {
    this.color = color;
    let color_mat = new THREE.MeshBasicMaterial({ color: color });

    this.product_model.children[0].children[0].material = color_mat;
    this.product_model.children[0].children[0].material.side = THREE.DoubleSide;
    this.product_model.children[0].children[11].material = color_mat;
    this.product_model.children[0].children[12].material = color_mat;
    this.product_model.children[0].children[13].material = color_mat;

    this.setText(null, this.txColor);
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



  // remove objects
  rmv() {
      cube[0].geometry.dispose();
      cube[0].material.dispose();
      scene.remove( cube[0] );
      cube = [];
      tex1.dispose();
      if ( mat ) mat.dispose();
  }

  clearDesign() {
    let elements = [];
    elements[0] = this.product_model.children[0].children[11];
    elements[1] = this.product_model.children[0].children[12];
    elements[2] = this.product_model.children[0].children[13];
    let color_mat = new THREE.MeshBasicMaterial({ color: this.color });

    elements[0].material = color_mat;
    elements[1].material = color_mat;
    elements[2].material = color_mat;

    this.ctx = null;
    this.tex1 = null;

    this.text = '';
    this.img_path = null;

    console.log( 'clear design' );
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
