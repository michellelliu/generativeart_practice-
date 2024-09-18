const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [1920, 1080],
  animate: true,
  duration: 5, // duration of animation (secs)
  fps: 60 // frame rate
};

// House colours
const houseColours = ['#F7B538', '#C62D2A', '#004BA8', '#000000'];
let randomColour = Math.floor(Math.random() * houseColours.length);
let lastColour = randomColour; // Track the last used color index

// Function to get a new color index that is different from the current one
const getNewColour = (currentIndex) => {
  let newIndex;
  do {
    // Randomize for a new index for a new house colour
    newIndex = Math.floor(Math.random() * houseColours.length);
  } while (newIndex === currentIndex);
  return newIndex;
}

const sketch = () => {
  const gridRows = 6; // Number of rows
  const gridCols = 11; // Number of columns
  const delay = 0.05; // Delay between each cell appearing (secs)
  const colourChangeInterval = 2; // How often to change colour (secs)

  let frameCount = 0; // Variable to keep track of the number of frames that have passed
  let lastColourChangeTime = 0; // Track when the color was last changed
 
  //calculate the total time for all cells to appear
  let cellsFilled = false;
  const totalCells = gridRows * gridCols;
  const totalFillTime = totalCells * delay;

  // Calculate the total number of frames
  const totalFrames = settings.duration * settings.fps;
 

  return ({ context, width, height }) => {
    // Time passed since start of animation
    const currentTime = frameCount / settings.fps;
    
      //draw house name text
      context.fillStyle = 'black';
      context.font = `100px Serif`;
      context.textAlign = 'left';
      context.textBaseline = 'middle';
      context.fillText('columba', 20, height - 20);
      
    //check if all cells are filled in animation
      if (currentTime > totalFillTime){
          cellsFilled = true;

          // Change color when all cells are filled
          if (currentTime - lastColourChangeTime > colourChangeInterval) {
              // Update to a new background color that is different from the last one
              lastColour = randomColour;
              randomColour = getNewColour(lastColour);
              lastColourChangeTime = currentTime;
              
          }
      }

    // Background color
    context.fillStyle = houseColours[randomColour];
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01; // Responsive line width
    context.strokeStyle = '#FFFFFF';

    // Responsive variables
    const w = width * 0.06;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.02; // Initial x
    const iy = height * 0.07; // Initial y
    const off = width * 0.025; // Responsive offset

    let x, y;
    
    // Loop to create a grid
    for (let i = 0; i < gridCols; i++) {
      for (let j = 0; j < gridRows; j++) {
        const cellIndex = i + j * gridCols;
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();

        // Increase delay progressively for each cell
        const cellDelay = cellIndex * delay;

        // Reveal cells randomly based on time
        if (currentTime > cellDelay) {
          // Draw smaller boxes inside the larger boxes
          context.beginPath();
          context.rect(x + off / 2, y + off / 2, w - off, h - off);
          context.stroke();
        }
      }
    }

    // Increment frameCount
    frameCount++;
    // Loop the animation by resetting frameCount
    if (frameCount > totalFrames) {
      frameCount = 0;
    }
  };
};

canvasSketch(sketch, settings);
