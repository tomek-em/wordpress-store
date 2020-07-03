// File enqued in three_enq function called from index.php on 3d product viewer pages only

(function() {
let world;

const resizeCanvas = () => {
	world.onWindowResize();
}

const setEventListeners = () => {

}

// load file
const readFile = (e) => {
	console.log('load file');
	const file = e.target.files[0];
	if(!file) {
		return;
	}
	const reader = new FileReader();
	reader.onload = function(e) {
		let content = e.target.result;
		// document.getElementById('canvas_cont').innerHTML = content;
		world.setCustomElements( content, true );
	}
	// reader.readAsText(file);
	reader.readAsDataURL(file);
}

const loadSvgTex = () => {
	let nr = 2;
	let objName = `globe-${nr}.svg`;
	let path = `${wpUrl.theme_url}/res/${objName}`;
	world.loadSvgTexture( path );
}

const setCustomElements = () => {
	let nr = 2;
	let objName = `globe-${nr}.svg`;
	let path = `${wpUrl.theme_url}/res/${objName}`;
	world.setCustomElements( path );
}

const updateText = ( text ) => {
	world.setText( text );
}





const rotateMesh = () => {
	world.rotateObj('floor');
}

// render with default fps
const simpleRender = () => {
	requestAnimationFrame(render);
	world.animate();
	world.update();
}

const update = () => {
	const interval = 50;
	world.animate();
	world.render();
	setTimeout(() => {
		requestAnimationFrame(update);
	}, interval);
}



// create buttons panel
const createButtonsPanel = (canv) => {
	const colors = [ 'black', 'silver', 'white', 'orange' ,'red', 'blue', 'green' ];

	const panel = document.createElement('div');
	panel.id = 'btn_panel';
	panel.classList.add('btn_panel');

	// create add exemple btn
	const add_btn = document.createElement('a');
	add_btn.id = 'add_btn';
	add_btn.classList.add('btn');
	add_btn.innerHTML = 'Exemple';
	panel.append(add_btn);
	add_btn.addEventListener('click', () => setCustomElements() );


	// create car color select
	const select_color = document.createElement('select');
	select_color.id = 'select_color';
	select_color.classList.add('select');
	panel.append( select_color );
	//create and append options
	for (let i = 0; i < colors.length; i++) {
		let option = document.createElement('option');
		option.value = colors[i];
		if ( i == 1) option.value = '#888';
		option.text = colors[i];
		select_color.appendChild(option);
	}
	select_color.value = 'white';
	select_color.addEventListener('change', () => world.changeColor( select_color.value ) );

	// create file input not displayed
	const load_file = document.createElement('input');
	load_file.id = 'file_input';
	load_file.type = 'file';
	load_file.addEventListener( 'change', readFile, false );
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

		// Set custom prod text
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

	canv.append(panel);
}



// set, create canvas
const setCanvas = () => {
	// create canvas container
  const canvas_cont = document.createElement('div');
  canvas_cont.id = 'canvas_cont';
  canvas_cont.classList.add('canvas_cont');
	// get product page div and prep canvas cont
  const contId = `product-${woocomObj.id}`;
	console.log(contId);
  const product_cont = document.getElementById(contId);
  product_cont.prepend(canvas_cont);
  // canvas_cont.append(canvas);
  return canvas_cont;
}

const init = async () => {
	// create canvas cont
	const canvas = setCanvas();

	// create waiting div
	const waiting_div = document.createElement('div');
  waiting_div.id = 'waiting_divt';
  waiting_div.classList.add('waiting_div');
	const loading_inf = document.createElement('h2');
	loading_inf.id = 'loding_inf';
	loading_inf.classList.add('text_center');
	loading_inf.innerHTML = 'Loading...';
	waiting_div.append(loading_inf);

	canvas.append(waiting_div);

	// create scene
  world = new World(canvas);

	// add events
	window.onresize = resizeCanvas;


	// load product model
	try {
		let objName = `${woocomObj.name}5.glb`;
		let path = `${wpUrl.theme_url}/res/3d/${objName}`;
		console.log( path );
		if(world.scene.children.length <= 3) await world.loadGLTF( path );

		createButtonsPanel(canvas);
		waiting_div.classList.add('d_none');
	}
	catch (e) {
		console.log('error. can not load object file');
		loading_inf.innerHTML = 'Error. Can not load object file.';
		// load obj picture
	};


	update();
}


window.addEventListener('load', (e) => {
  init();
});

}());
