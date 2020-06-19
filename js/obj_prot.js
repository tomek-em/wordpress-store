/*
This is the main file for viewing of 3d objects in AdStore Wp theme
Author: Tomasz Mejer

ReadMe:
    createScene() gets the div in product viewer and put 3d canvas there. 
*/

/* Remeber
    - call the render inside the LOAD from file function, becouse it takes time to load
*/

/* To Do 
    change path to obj from theme folder to wp upload folder in loadObj()
    
    try to add canvas outside from wordpress? why is slowing the processor so much down?
    mniejsze biblioteki js?
*/
    
jQuery(function($){

    function Main() {
        // definicja metod could be inside here e.g. createScene() but I used prototype outside
        
        let self = this;
        this.createScene();
        // need to call onResizeWIndow because CSS doesn't work for our created child here (canvas has set width outside class)
        this.cube;
        this.mat2;
        window.onresize = function(e) {
            e.preventDefault();
            self.onWindowResize();
        }
        //this.addDefaultMesh();
        //this.loadObj_2();
        //this.addText();
        this.loadTx();
        //this.loadGltf();
        this.render();
    }

        // define material textures
        //this.wall_1 = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture("res/Tiles/texture-floor-tiles-500x500.jpg") });
    
    
    // create scene, set camera and the light
    Main.prototype.createScene = function() {
        this.container = document.createElement('div');
        this.container.id = 'prod-canvas';
        $('.product-type-simple').prepend(this.container);

        this.width = this.container.offsetWidth-1;
        this.height = this.container.offsetHeight;

        this.renderer = new THREE.WebGLRenderer( { alpha: true } );
        this.renderer.setClearColor( 0xaaaaaa, 1 );
        this.renderer.setSize(this.width, this.height);
        this.container.appendChild( this.renderer.domElement );

        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 200);
        this.camera.position.set(10,10,0);
        this.camera.lookAt(0, 0, 0);

        // light
        this.ambient_light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
        this.scene.add(this.ambient_light);
        //this.light = new THREE.DirectionalLight ('white', 1);
        //this.light.position.set(10, 1, 0).normalize();
       // this.scene.add(this.light);
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0,0,0);
        //this.camera.up = new THREE.Vector3(0,1,0);
        //this.camera.lookAt(new THREE.Vector3(0,0,0));
       
    }
    
    // on window resize fun.
    Main.prototype.onWindowResize = function() {
        this.camera.aspect = this.container.offsetWidth/ this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.container.offsetWidth-1, this.container.offsetHeight );
    }

    // -----------------------------------------------------------------
    
    
    
    /* LOAD AND CREATE OBJ ------------------------------------------------------ */
    
    // load texture
    Main.prototype.loadTx = function() {
        var self = this;
        
        var loader = new THREE.TextureLoader();
        var txPath = wpUrl.theme_url + '/res/hero/alphabet-bar-blue-316149.jpg';
        loader.load(txPath,
            function ( texture ) {
                //var bitmap = document.createElement('canvas');
                //var g = bitmap.getContext('2d');
//                bitmap.width = 100;
//                bitmap.height = 100;
//                g.font = 'Regular 20px sans-serif';
//
//                g.fillStyle = 'red';
//                g.fillText('text', 0, 20);
//                g.strokeStyle = 'black';
//                g.strokeText('text', 0, 20);

                // canvas contents will be used for a texture
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                texture1 = new THREE.Texture(canvas); 
                texture1.needsUpdate = true;  
                
                canvas.width = 100;
                canvas.height = 100;
                ctx.font = '16pt Arial';
                ctx.fillStyle = 'red';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //ctx.fillStyle = 'white';
                //ctx.fillRect(10, 10, canvas.width, canvas.height);
                ctx.fillStyle = 'black';
                //ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText('hello', 20, 20);
            
                //texture2 = new THREE.Texture( canvas ); 
                //texture2.needsUpdate = true;
                
                // in this example we create the material when the texture is loaded
                self.mat3 = new THREE.MeshBasicMaterial( { map: texture1 } );
                
                self.loadGltf();
            },
            undefined,
            function ( err ) {
                console.error( 'An error happened.' );
            }
        );
    }
    
    
    
    // add texture with text
    Main.prototype.addText = function() {
        // create a canvas element
        this.canvas1 = document.createElement('canvas');
        var context1 = this.canvas1.getContext('2d');
        context1.font = "Bold 45px Arial";
        context1.fillStyle = "rgba(255,0,0,1)";
        context1.fillText('TXT', 0, 40);
 
        // canvas contents will be used for a texture
        this.texture1 = new THREE.Texture(this.canvas1) 
        this.texture1.needsUpdate = true;
        
        //mat2 = new THREE.MeshBasicMaterial( {map: this.texture1, side:THREE.DoubleSide } );
        //mat2.transparent = true;
//        var mesh1 = new THREE.Mesh(
//            new THREE.PlaneGeometry(this.canvas1.width, this.canvas1.height),
//            mat2
//          );
        
        var geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        //var mesh = new THREE.Mesh( geometry, mat2 );
        //mesh1.position.set(0,0,0);
        //this.scene.add( mesh );
        
        this.render();
    }
    
    
    // add mesh
    Main.prototype.addDefaultMesh = function() {
        var geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(5, 0, 0);
        this.scene.add( mesh );
    }
    
    // load obj.
    Main.prototype.loadObj = function() {
        const self = this;
        
        var material_1 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        var mtlMat;
        
        var objPath = wpUrl.theme_url + '/res/3d/cube.obj';
        var mtlPath = wpUrl.theme_url + '/res/3d/cube.mtl';
        
        // MTL Loader
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.load( mtlPath,
            function ( mtl ) {
                material_1 = mtl;
                console.log('mat loaded');
        },  
            function ( error ) {
                console.log( 'MTL - An error happened' );
            }
        );
        
        
        // instantiate a loader
        var objLoader = new THREE.OBJLoader();
        // load a resource
        objLoader.load( objPath,
            // called when resource is loaded
            function ( obj ) {
                obj.traverse( function( child ) {
                    if ( child instanceof THREE.Mesh ) {
                        child.material = material_1;
                    }
                });
                obj.scale.set(1, 1, 1);
                self.scene.add( obj );
                //obj.position.set(5, 5, 0);
                obj.rotateZ( Math.PI / 8 );
                obj.rotateY( Math.PI / 1.5 );
                //var p = new THREE.Vector3();
                //p.getPositionFromMatrix( self.camera.matrixWorld );
                console.log(obj);
            
                // NEEDED !! loading takes to long time
                self.render();
            },
            // called when loading is in progresses
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            // called when loading has errors
            function ( error ) {
                console.log( 'An error happened' );
            }        
        );
    }
    
    Main.prototype.loadObj_2 = function() {
        const self = this;
        var objPath = wpUrl.theme_url + '/res/3d/cube.obj';
        var mtlPath = wpUrl.theme_url + '/res/3d/cube.mtl';
        
        let mtlLoader = new THREE.MTLLoader();
        let objLoader = new THREE.OBJLoader();

        mtlLoader.load(mtlPath, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(objPath, (object) => {
                this.scene.add(object);
                self.render();
            })
        })
    }
    
    
    
    
    // load glTF ----------------------------------------------------------------
    
    Main.prototype.loadGltf = function() {
        const self = this;
        var objName = wcObj.name;
        var objPath = wpUrl.theme_url + '/res/3d/' + objName;
        
        var mat1 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
        
        var loader = new THREE.GLTFLoader();
//        loader.load(objPath, handle_load);
//        var cube;
//        
//        function handle_load(gltf) { 
//            cube = gltf.scene.children[2];
//            self.scene.add(cube);
//            cube.position.set(0, 0, 0);
//            self.render();
//        }
        var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        var mesh = new THREE.Mesh( geometry, this.mat3 );
        //this.scene.add( mesh );
        
        //mat2 = this.mat2;
        mat3 = this.mat3;
        //tx1 = this.texture1;
        
        loader.load(objPath, function ( gltf ) {
                this.cube = gltf.scene.children[2].children[0];
                cube_w1 = gltf.scene.children[2].children[1]; 
            
                if (cube_w1) {
                    cube_w1.traverse(function (node) {
                        if (node.isMesh) node.material = mat3;
                        //if (node.isMesh) node.material.map = tx1;
                    });
                }
                self.scene.add(this.cube);
                self.scene.add(cube_w1);
                //this.cube.position.set(0, 0, 0);
                self.render();
            }, 
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            }, 
            function ( error ) {
                console.log( 'Error' );
            }
        );
    }
    
    // -------------------------------------------------
    
    
    /* ANIMATE AND RENDER ----------------------------- */
    
    // render scene
    Main.prototype.render = function() {
        console.log('render');
        this.renderer.render(this.scene, this.camera);
    }
    
    Main.prototype.update = function() {
        //if ( keyboard.pressed("z") ) 
        //{ 
            // do something
        //}

        //controls.update();
        //stats.update();
    }
    
    function animate(){
        //requestAnimationFrame ( animate ); //only if tab is open
        //v.render();
        //reduce high cpu usage (reduce fps form ca 60 to 30)    
        var lastRender = 0;
        (function animloop(){
            requestAnimationFrame(animloop);
            var now = Date.now();
            if (now >= lastRender + 32) {
                lastRender = now;
                v.render();
                //v.update();
            }
        })();
        
        // clean up
        //geometry.dispose();
        //material.dispose();
    }
    
    

    var v = new Main();
    requestAnimationFrame( animate );
 
}); // end of jQuery  
