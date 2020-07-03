/* TO DO
maybe create a couple similar to loadSvgTex() functions, each for different product type

- change model size in Blender to texture size - DONE
- each face different material - DONE

- maybe embade all canvas

- change labels of radio btns - jquery .html or just change names to design 1 / 2
- check if you can remove array at once in rmv function


Access Via index.php -> three_enq functon

*/

jQuery(function($){

    var container, scene, camera, renderer;
    var cube = new Array(4);
    var cont_width, cont_height, mat, tex_mat, tex_mat2, tex1;
    var group, svg;
    var prod_id, type, color_ver;


    function init() {
        // create DOM elements
        prod_id = '#product-' + wcObj.id;
        console.log(prod_id);

        cont = document.createElement('div');
        cont.id = 'canvas-cont';
        $(prod_id).prepend(cont);

        container = document.createElement('div');
        container.id = 'prod-canvas';
        $(cont).prepend(container);
        cont_width = container.offsetWidth-1;
        cont_height = container.offsetHeight;

        renderer = new THREE.WebGLRenderer( { alpha: true } );
        renderer.setClearColor( 0xB3BEBE, 1 );
        renderer.setSize( cont_width, cont_height);
        container.appendChild( renderer.domElement );

        createScene();

        /* -------- */
        var radio1, radio2;
        let cat = wcProd.cat;

        if (cat == 'trailer') {
            type = 0;
            color_ver = 1;
            radio1 = 'design 1';
            radio2 = 'design 2';
        }
        if (cat == 'tees') {
            type = 1;
            color_ver = 1;
            radio1 = 'white';
            radio2 = 'black';
        }

        var panel = document.createElement('div');
        panel.id = 'panel';
//        var type_1 = document.createElement('div');
//        type_1.id = 'type_1';

        /* -- Temporary solution, make embed window instead ! -- */
        $(panel).html( "<a><b>Select file you want to use: </b></a><input type='file' id='file' name='files[]' size='8' /></br> <div class='custom-panel'> <a><b>or use our creator: </b></a></div> <div class='custom-panel'> <input type='radio' id='type1' name='type' value='type1'checked><label for='type1'>" + radio1 + "</label><input type='radio' id='type2' name='type' value='type2'> <label for='type2'>" + radio2 + "</label></div> <div class='custom-panel'> <input value='Your text' id='edt-text'></input><a id='sub-btn'>Ok</a></div>");

        $(cont).append(panel);

        customText('Your text');

        $(document).on('change', '#file', evt => {
            var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

            // FileReader
            if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                //document.getElementById(outImage).src = fr.result;
                var sv = fr.result;
                 if (document.getElementById('type2').checked) {
                    if (type == 1) color_ver = 2;
                 }
                else color_ver = 1;
                rmv();
                loadSvgTex(sv);
            }
            fr.readAsDataURL(files[0]);
            }
        });


        // Event Listener - custom product
        $('#sub-btn').click( function(e) {
            e.preventDefault();
            var customTx = $('#edt-text').val();

            $('.wccpf-field').val(customTx);

            if (document.getElementById('type2').checked) {
                rmv();
                if (type == 0) {
                    customLogo(1, customTx);
                }
                else if (type == 1) // if tees go to custom Text function, black shirt
                {
                    color_ver = 2;
                    customText(customTx);
                }
            }
            else {
                color_ver = 1;
                rmv();
                customText(customTx);
            }
        });
    }


    function createScene() {
        scene = new THREE.Scene();

        // set camera
        camera = new THREE.PerspectiveCamera(60, cont_width / cont_height, 0.1, 1000);
        camera.position.set(10, 2, 12);
        camera.lookAt(0, 0, 0);

        // set light
        ambient_light = new THREE.AmbientLight( 0xffffff, 3 );
        scene.add(this.ambient_light);


        window.onresize = function(e) {
            e.preventDefault();
            onWindowResize();
            //createCanvas();
        }
        // controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0,0,0);
    }




    // on resize
    function onWindowResize() {
        camera.aspect = cont_width/ cont_height;
        camera.updateProjectionMatrix();
        renderer.setSize( container.offsetWidth, container.offsetHeight );
        console.log(cont_width);
    }



    /* LOAD AND CREATE OBJECTS ---------------------------------------------------- */
    // create cube for testing purpose - currently not used
    function createMesh() {
        var geo = new THREE.BoxBufferGeometry( 10, 10, 10);
        var mat = new THREE.MeshBasicMaterial( { color: 0x0022bb } );
        var mesh = new THREE.Mesh( geo, tex_mat );
        scene.add( mesh );
        render();
    }



    // SVG -----------------------------------------------------

    // load svg texture
    function loadSvgTex(customFile) {
        txPath1 = 'https://upload.wikimedia.org/wikipedia/commons/1/18/SVG_example7.svg';
        txPath2 = wpUrl.theme_url + '/res/' + 'nati_web.svg'

        var img = new Image;

        img.crossOrigin = 'anonymous';
        img.onload = function () {
            var tex = new THREE.Texture (img);

            //t_width = bar.image.width;
            //t_height = bar.image.width;
            //console.log(t_width + ' ' + t_height);

            tex.flipY = false;
            tex.needsUpdate = true;
            tex_mat = new THREE.MeshBasicMaterial({ map: tex});
            tex_mat2 = new THREE.MeshBasicMaterial({ map: tex });

            if (type == 0) {
                tex_mat.transparent = false;
                tex_mat2.transparent = false;
                mat = new THREE.MeshBasicMaterial({color: '#fff'});
                console.log('HERE type: ' + type);
            }
            else if (type == 1) {
                tex_mat.transparent = true;
                tex_mat2.transparent = true;
                console.log('HERE type: ' + type);
            }
            modelLoader(color_ver);

        };
        img.onerror = function (e) {
                console.log (e);
        }
        img.src = customFile;
    }


    // customize texture
    function customLogo(logo, text) {
        var color, file;
        if (logo == 1) {
                color = '#121111';
                file = 'globe-1.svg';
            }
            else if (logo == 2) {
                color = '#12475d';
                file = 'globe-2.svg';
            }
            else {
                color = '#121111';
            }

        var txPath = wpUrl.theme_url + '/res/' + file;

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = new Image();
        var texture = new THREE.Texture(canvas);

        canvas.width = 1024;
        canvas.height = 1024;
        context.fillStyle = '#eee';
        context.fillRect(0, 0, canvas.width, canvas.height);

        img.onload = function() {
            context.font = '64pt Play';
            context.fillStyle = color;
            context.textBaseline = "middle";

            var textWidth = context.measureText(text).width;
            var textGap = (canvas.width-textWidth)/2;
            context.fillText( text, textGap, canvas.height/2.05 );
            texture.flipY = false;

            context.drawImage(img, textGap - 110, 450);
            texture.needsUpdate = true;

            mat = new THREE.MeshBasicMaterial({color: '#fff'});
            tex_mat = new THREE.MeshBasicMaterial({ map: texture });
            tex_mat2 = tex_mat;

            modelLoader(color_ver);
        };
        img.src = txPath;
    }



    function customText(customTx) {
        var text = customTx;
        var font = '36pt Righteous';
        var position = 4;

        var canvas = document.createElement('canvas');
        var canvas2 = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var ctx2 = canvas2.getContext('2d');
        tex1 = new THREE.Texture(canvas);
        tex1.needsUpdate = true;
        tex2 = new THREE.Texture(canvas2);
        tex2.needsUpdate = true;

        canvas.width = canvas2.width = 1024;
        canvas.height = canvas2.height = 512;
        if (color_ver == 0) {
            ctx.fillStyle = '#ddd';
            ctx2.fillStyle = '#ddd';
        } else if (color_ver == 1) {
            ctx.fillStyle = '#fff';
            ctx2.fillStyle = '#f2f2f2';
        }
        ctx.fillRect(0, 0, canvas.width/1, canvas.height/1);
        ctx2.fillRect(0, 0, canvas.width/1, canvas.height/1);

        if (type == 0) {
            mat = new THREE.MeshBasicMaterial({color: '#fff'});
            ctx.fillStyle = '#12475d';
            ctx.fillRect(0, 296, canvas.width/1, 10);
            ctx2.fillStyle = '#12475d';
            ctx2.fillRect(0, 296, canvas.width/1, 10);
        }
        if ((type == 1)&&(color_ver == 1)) {
            //mat = new THREE.MeshBasicMaterial({color: '#fff'});
            ctx.fillStyle = '#111';
            font = '240pt Righteous';
            position = 2;
            console.log ('white');
        }
        if ((type == 1)&&(color_ver == 2)) {
            //mat = new THREE.MeshBasicMaterial({color: '#000'});
            ctx.fillStyle = '#eee';
            font = '240pt Righteous';
            position = 2;
            console.log ('black');
        }

        ctx.font = ctx2.font = font;
        ctx.textBaseline = "middle";
        ctx2.textBaseline = "middle";

        var textWidth = ctx.measureText(text).width;
        var text_area = canvas.width/ textWidth;
        var font_size = 240;

        while (textWidth > 0.9 * canvas.width) {
            font_size = font_size - 10;
            font = font_size + 'pt Righteous';
            ctx.font = ctx2.font = font;
            textWidth = ctx.measureText(text).width;
        }


        ctx.fillText( text, (canvas.width-textWidth)/position, canvas.height/2 );
        ctx2.fillText( text, (3*canvas.width/4-textWidth/2), canvas.height/2 );

        tex1.flipY = false;
        tex2.flipY = false;

        tex_mat = new THREE.MeshBasicMaterial({ map: tex1 });
        tex_mat2 = new THREE.MeshBasicMaterial({ map: tex2 });
        modelLoader(color_ver);
    }





    // GLTF ------------------------------------------------

    // load glb model
    function modelLoader(nr) {
        var objName = wcObj.name + nr + '.glb';
        var objPath = wpUrl.theme_url + '/res/3d/' + objName;
        var loader = new THREE.GLTFLoader();
        console.log(objPath);

        loader.load(objPath, function ( gltf ) {
                cube[0] = gltf.scene.children[2].children[0];
                cube[1]= gltf.scene.children[2].children[1];
                cube[2] = gltf.scene.children[2].children[2];
                cube[3] = gltf.scene.children[2].children[3];

                cube[1].geometry.computeBoundingBox();
                var box = cube[1].geometry.boundingBox;
                var size = 'SIZE ' + (box.max.z - box.min.z);
                console.log( size);

                if ((cube[0]) && (mat != null)) {
                    cube[0].traverse(function (node) {
                        console.log('CUBE 0 ' + mat)
                        if (node.isMesh) node.material = mat;
                    });
                }

                if (cube[2]) {
                    cube[2].traverse(function (node) {
                        if (node.isMesh) node.material = tex_mat;
                        //if (node.isMesh) node.material.map = tex1;
                    });
                }
                    if (cube[3]) {
                    cube[3].traverse(function (node) {
                        if (node.isMesh) node.material = tex_mat2;
                        //if (node.isMesh) node.material.map = tex1;
                    });
                }
                scene.add(cube[0]);
                scene.add(cube[1]);
                scene.add(cube[2]);
                scene.add(cube[3]);

                var box = new THREE.Box3().setFromObject( cube[0] );

                console.log(box);

                render();
            },
            function ( xhr ) {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
                console.log( 'Error' );
            }
        );

    }

    // remove objects
    function rmv() {
        console.log('REMOVE');
        cube[0].geometry.dispose();
        cube[0].material.dispose();
        scene.remove( cube[0] );
        cube[1].geometry.dispose();
        cube[1].material.dispose();
        scene.remove( cube[1] );
        cube[2].geometry.dispose();
        cube[2].material.dispose();
        scene.remove( cube[2] );
        cube[3].geometry.dispose();
        cube[3].material.dispose();
        scene.remove( cube[3] );
        cube = [];
        tex1.dispose();
        if ( mat ) mat.dispose();
        mat = undefined;
        console.log('HERE ' + mat);
        if ( tex_mat ) tex_mat.dispose();
        if ( tex_mat2 ) tex_mat2.dispose();
        tex_mat = undefined;
        tex_mat2 = undefined;
        renderer.renderLists.dispose();
    }


    // RENDER & ANIMATE --------------------------

    function render() {
        renderer.render( scene, camera);
    }

    function animate() {
        var lastRender = 0;
        (function animloop(){
            requestAnimationFrame(animloop);
            var now = Date.now();
            if (now >= lastRender + 32) {
                lastRender = now;
                render();
                //v.update();
            }
        })();
    }


    init();
    requestAnimationFrame(animate);

}); // end of jQuery
