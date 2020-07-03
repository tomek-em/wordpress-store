//  2d Canvas based product designer

  const loadImg = ( path, img ) => {
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
  const setCustomElements = async ( canvas, path, largeSize ) => {

    const img = new Image();

    // open image if set
    if( path ) await loadImg(path, img);

    let ctx = canvas.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // place img if set
    if ( largeSize ) {
      ctx.drawImage(img, 120, 50, 160, 160);
    } else {
      ctx.drawImage(img, 40, 20, 80, 80);
    }

    // fill with color
    let line = null;
    if ( line != null ) {
      ctx.fillStyle = '#ddd';
      ctx.fillRect(0, 0, canvas.width/1, canvas.height/1);
    }
  }


  // Set text
  const setText = ( canvas, text, color ) => {
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

// Clear canvas
const clearCanvas = () => {

}





  // load file
  const readFile = (e) => {
    return new Promise((resolve, reject) => {

      const file = e.target.files[0];
      if(!file) {
        reject();
      } else {
        const reader = new FileReader();
        reader.onload = function(e) {
          let content = e.target.result;

          resolve(content);
        }
        reader.readAsDataURL(file);
      }
    });
  }


  // create buttons panel
  const createButtonsPanel = (canv_cont, canvas) => {
  	const colors = [ 'black', 'white', 'orange' ,'red', 'blue', 'green' ];

  	const panel = document.createElement('div');
  	panel.id = 'btn_panel';
  	panel.classList.add('btn_panel');


  	// create file input not displayed
  	const load_file = document.createElement('input');
  	load_file.id = 'file_input';
  	load_file.type = 'file';
  	load_file.addEventListener( 'change', async (e) => {
      let file = await readFile(e);
      console.log('file read ', file);
      setCustomElements(canvas, file, false);
    }, false );
  	// load btn handle file input
  	const load_btn = document.createElement('a');
  	load_btn.id = 'load_btn';
  	load_btn.classList.add('btn');
  	load_btn.innerHTML = 'Load svg';
  	panel.append(load_btn);
  	load_btn.addEventListener('click', () => {
  		load_file.click();
  	});

  	// text input
  	const text_input = document.createElement('input');
  	text_input.type = 'text';
  	text_input.id = 'text_input';
  	text_input.classList.add('text_input');
  	text_input.placeholder = 'your text';
  	panel.append(text_input);

  	text_input.addEventListener('click', () => {
  		text_input.value = '';
  		world.clearDesign();
  	});
  	text_input.addEventListener('keyup', () => {
  		updateText( text_input.value, null );

  		// let custom_prod_text = document.querySelector('.wccpf-field');
  		let custom_prod_text = document.querySelector('.thwepof-input-field');
  		custom_prod_text.value = text_input.value;
  	});



  	// select colors
  	const select_txColor = document.createElement('select');
  	select_txColor.id = 'select_txColor';
  	select_txColor.classList.add('select');
  	panel.append( select_txColor );
  	//create and append options
  	for (let i = 0; i < colors.length; i++) {
  		let option = document.createElement('option');
  		option.value = colors[i];
  		option.text = colors[i];
  		select_txColor.appendChild(option);
  	}
  	select_txColor.addEventListener('change', () => world.setText( null, select_txColor.value ) );

    canv_cont.append(panel);
  }





// Set canvas
const initCanvas = ( canvas ) => {
  let ctx;

  ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 400;
}

// Create canvas
const setCanvas = () => {
	// create canvas container
  const canvas = document.createElement('canvas');    // canvas type
  canvas.id = 'canvas';
  canvas.classList.add('canvas');

  return canvas;
}

const init = () => {
  const canvas = setCanvas();
  initCanvas( canvas );

  const contId = `product-${woocomObj.id}`;
  const product_cont = document.getElementById(contId);
  product_cont.prepend(canvas);

  createButtonsPanel( product_cont, canvas );
}

window.addEventListener('load', (e) => {
  init();
});
