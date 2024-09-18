//import canvas sketch library
const canvasSketch = require('canvas-sketch');
//import math  functions
const math = require('canvas-sketch-util/math');
//import random functions
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true //enable animation
}

//start the sketch
const sketch = () => {
  return ({ context, width, height, playhead}) => {
    //canvas settings
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    // Get a seamless 0-1 value for our loop
    const t = Math.sin(playhead * Math.PI);
    
    //context.fillStyle = 'black';
    const cx = width * 0.5; // center of circle
    const cy = height * 0.5;// center of circle
    
    //thickness of rect lines
    const w = width * 0.01; // w of rect
    const h = height * 0.1; // h of rect
    let x, y;
    
    // number of wedges 
    const num = 12;
    
    const radius = width * 0.3;
      
    // for loop to create num of wedges
    for (let i = 0; i < num; i ++){
        //size of slice of each block
        const slice = math.degToRad(360/num);
        const angle = slice * i;
        
        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);
        
        context.save();
        
        context.translate(x,y);
        context.rotate(-angle);
        context.scale(random.range(0.1,2),random.range(0.2,0.5));
        
        const wedge = new Wedge(-w * 0.5,random.range(0, h * 0.5), w,h)
        
        //rectangle
        context.beginPath();
        context.rect(wedge.x,wedge.y, w, h);
        context.fill();
        context.restore();
        
        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
        
        context.lineWidth = random.range(5,20);
        
        //arc
        context.beginPath();
        context.arc(0, 0, radius * random.range(0.7,1.3), slice * random.range(0,0.5), slice * random.range(0,0.5));
        context.stroke();
        
        context.restore();
    }
      
      wedges.forEach(wedge => {
          wedge.draw(context);

      });
      
      
  };
};

canvasSketch(sketch, settings);

class Wedge {
    constructor(x,y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    draw(context) {
        
    }
}
