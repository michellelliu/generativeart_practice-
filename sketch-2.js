
const canvasSketch = require('canvas-sketch');

const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};
// change degrees to radians
const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
};
// create a min and max range for random function
const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

let houseColours = ['#F7B538','#C62D2A','#004BA8', '#495057'];
let houseNames = ['RU','CO','MF','MC'];
//pick a random index in houseColours
randomColour = Math.floor(Math.random() * houseColours.length);

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = houseColours[randomColour];
    context.fillRect(0, 0, width, height);
    
    
    context.fillStyle = 'white';
    context.font = '200px serif';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
      
    context.save();
    context.translate(width * 0.5, height* 0.5);
    context.fillText(houseNames[randomColour],0,0);
    context.restore();
    
      
    const cx = width * 0.5; // center of circle
    const cy = height * 0.5;// center of circle
      
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;
    
    const num = 40;
    const radius = width * 0.3;
    
    // loop for num blocks
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

        //rectangle
        context.beginPath();
        context.rect(-w * 0.5,random.range(0, h*0.5), w, h);
        context.fill();
        context.restore();
        
        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
        
        context.lineWidth = random.range(5,20);
        
        context.beginPath();
        context.arc(0, 0, radius * random.range(0.7,1.3), slice * random.range(1,-8), slice * random.range(1,5));
        context.stroke();
        
        context.restore();
    }
  };
};

canvasSketch(sketch, settings);
