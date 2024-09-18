const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
      
    context.fillStyle = 'black';
      
    const x = width * 0.5; // square top corner 50% across
    const y = height * 0.5;// square top corner 50% up/down
    const w = width * 0.01;
    const h = height * 0.1;
    
    context.save();
    context.translate(x,y);
    context.rotate(degToRad(45));
    
    //rectangle 
    context.beginPath();
    context.rect(-w * 0.5, -h * 0.5, w, h);
    context.fill();
    context.restore();
    
    // circle
    context.translate(100,400); //move drawing point (context) at (x,y)
    context.beginPath();
    context.arc(0, 0, 50, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);
