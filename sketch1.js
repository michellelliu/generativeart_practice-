const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions:[1080, 1080]};

let colours = ['#4287f5', '#9b42f5', '#c8f542', '#f5e942', '#c42929'];

const sketch = () => {
  return ({ context, width, height }) => {
      for (let i = 0; i < colours.length; i++){
          bg = Math.floor(Math.random() * colours.length);
          console.log(bg)
          context.fillStyle = colours[bg] ;
      }
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01; //responsive line width
    context.strokeStyle = '#FFFFFF';
    
    //responsive variables
    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.19; //initial x
    const iy = height * 0.19;//initial y
    const r = height * 0.01
      
    const off = width * 0.025; //responsive offset
    
    let x,y;

    //arrays and loops
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j ++) {
            x = ix + (w + gap) * i;
            y = iy + (h + gap) * j;
            //large boxes
            context.beginPath();
            context.rect(x, y, w, h);
            context.stroke();
            
            //circles
            context.beginPath();
            context.arc(x, y, r, 0, Math.PI * 2);
            context.strokeStyle = '#000000'
            context.stroke();
            
            //smaller boxes
              if (Math.random() > 0.5) {
                  context.beginPath();
                  context.rect(x + (off/2) / 2, y + (off/2) / 2, w - off, h - off);
                  context.strokeStyle = '#FFFFFF'
                  context.stroke();
              }
            //circles
              if (Math.random() > 0.5) {
                  
              }
          }
          
      }


    
  };
};

canvasSketch(sketch, settings);
