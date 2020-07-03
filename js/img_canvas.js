class ImgCanvas {
  constructor(canvas_cont) {
    // create canvas
    this.canvas = document.createElement('canvas');    // canvas type
    this.canvas.id = 'canvas';
    this.canvas.classList.add('canvas');
    canvas_cont.appendChild(this.canvas);

    this.canvas.width = this.canvas.parentElement.clientWidth -2;
    this.canvas.height = 460;

    this.ctx = this.canvas.getContext('2d');

    // Set default values
    this.color = 'white';
    this.txColor = 'black';
  }

  // on resize
  onWindowResize() {
    const canvas_cont = document.getElementById('canvas_cont');
    this.canvas.width = canvas_cont.clientWidth -2;
    const height = 460;
  }


    // load image from file
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

      const img = new Image();

      // open image if set
      if( path ) await this.loadImg(path, img);

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // place img if set
      if ( largeSize ) {
        this.ctx.drawImage(img, 120, 50, 160, 160);
      } else {
        this.ctx.drawImage(img, 40, 20, 80, 80);
      }

      // fill with color
      let line = null;
      if ( line != null ) {
        this.ctx.fillStyle = '#ddd';
        this.ctx.fillRect(0, 0, canvas.width/1, canvas.height/1);
      }
    }



    // Set text
    updateText( text, color ) {
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
  clearCanvas() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }


}
