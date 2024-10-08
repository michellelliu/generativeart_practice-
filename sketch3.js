const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
      
    context.fillStyle = 'black';
      
    const cx = width * 0.5; // center of circle
    const cy = height * 0.5;// center of circle
      
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;
    
    const num = 12;
    const radius = width * 0.3;
    
    // loop for num blocks
    for (let i = 0; i < num; i ++){
        //size of slice of each block
        const slice = degToRad(360/num);
        const angle = slice * i;
        
        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);
        
        context.save();
        context.translate(x,y);
        context.rotate(-angle);

        //rectangle
        context.beginPath();
        context.rect(-w * 0.5, -h * 0.5, w, h);
        context.fill();
        context.restore();
    }
  };
};

canvasSketch(sketch, settings);
