const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    // point properties
    const point = { x: 800, y:400, radius:10};
    
    //make a point 
    context.beginPath();
    context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  };
};
     


canvasSketch(sketch, settings);
