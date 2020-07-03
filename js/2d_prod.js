//  2d Canvas based product designer

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
  const createButtonsPanel = ( canv_cont ) => {
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
      imgCanvas.setCustomElements(file, false);
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
  		imgCanvas.clearCanvas();
  	});
  	text_input.addEventListener('keyup', () => {
  		imgCanvas.updateText( text_input.value, null );

      // Set custom prod text
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
  	select_txColor.addEventListener('change', () => imgCanvas.updateText( null, select_txColor.value ) );

    canv_cont.append(panel);
  }




// Create canvas container
const createCanvasCont = () => {
  const canvas_cont = document.createElement('div');    // canvas type
  canvas_cont.id = 'canvas_cont';
  canvas_cont.classList.add('canvas_cont');

  const contId = `product-${woocomObj.id}`;
  const product_cont = document.getElementById(contId);
  product_cont.prepend(canvas_cont);

  return canvas_cont;
}


const init = () => {
  const cont = createCanvasCont();
  imgCanvas = new ImgCanvas( cont );

  createButtonsPanel( cont );

  window.onresize = imgCanvas.onWindowResize;
}

window.addEventListener('load', (e) => {
  init();
});
