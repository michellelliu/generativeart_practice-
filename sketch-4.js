// imports
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1920, 1080]
};

let manager;

// school houses
let houseColours = ['#F7B538','#C62D2A','#004BA8', '#495057'];
let houseNames = ['RU','CO','MF','MC'];

// pick a random index in houseColours
let randomColour = Math.floor(Math.random() * houseColours.length);

//font settings
let text = houseNames[randomColour];
let fontSize = 1200;
let fontFamily = 'serif';

//seperate canvas for letter to read data
const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cells = 20; //w & h of cell
  const cols = Math.floor(width / cell);
  const row = Math.floor(height / cell);
  const numCells = cols * rows;
    
  typeCanvas.width = cols;
  typeCanvas.height = rows;

    
  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);
      
    fontSize = cols;
    
    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`; // Corrected string interpolation
    typeContext.textBaseline = 'top';
    typeContext.textAlign = 'center'; // Center align text horizontally

    // measure text
    const metrics = typeContext.measureText(text);
    
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    // align text in the centre
    const x = (cols - mw) * 0.5 - mx;
    const y = (rows - mh) * 0.5 - my;

    typeContext.save();
    typeContext.translate(x, y);
      
    typeContext.beginPath();
    typeContext.rect(mx, my, mw, mh);
    typeContext.stroke();
      
    // text - generates new house each time page is refreshed
    typeContext.fillText(text, 0, 0);
    typeContext.restore();
    
    context.drawImage(typeCanvas, 0, 0);
  };
};

const onKeyUp = (e) => {
    text = e.key.toUpperCase();
    manager.render();
};

document.addEventListener('keyup', onKeyUp);

const start  = async () => {
    manager = await canvasSketch(sketch, settings);
};

start();

