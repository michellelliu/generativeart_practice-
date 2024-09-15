// imports
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1920, 1080]
};

// school houses
let houseColours = ['#F7B538','#C62D2A','#004BA8', '#495057'];
let houseNames = ['RUTHERFORD','COLUMBA','MACFARLANE','MCRAE'];

// pick a random index in houseColours
let randomColour = Math.floor(Math.random() * houseColours.length);

let text = houseNames[randomColour];
let fontSize = 250;
let fontFamily = 'serif';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`; // Corrected string interpolation
    context.textBaseline = 'top';
    context.textAlign = 'center'; // Center align text horizontally

    // measure text
    const metrics = context.measureText(text);
    
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    // align text in the centre
    const x = (width - mw) * 0.5 - mx;
    const y = (height - mh) * 0.5 - my;

    context.save();
    context.translate(x, y);
      
    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();
      
    // text - generates new house each time page is refreshed
    context.fillText(text, 0, 0);
    context.restore();
  };
};

canvasSketch(sketch, settings);
