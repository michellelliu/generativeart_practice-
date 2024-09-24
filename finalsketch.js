//Imports
const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

let houseIndex = parseInt(localStorage.getItem('houseIndex')) || 0;
// Refresh page every 0.5 seconds
setInterval(() => {
    // Update houseIndex for the next frame
      houseIndex ++;
      
      if(houseIndex >= housePointsCycle.length) {
          houseIndex = 0; //reset to the first house if at the end
      }
    // store updated houseIndex in local storage
    localStorage.setItem('houseIndex', houseIndex)
    //refresh the page
    location.reload();
}, 500); //500ms

const settings = {
  dimensions: [ 1920, 1080],
};
// Change degrees to radians
const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
};
// Create a min and max range for random function
const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

//House data in order - RU,CO, MF, MC
let housePoints = ["0326", "0134", "0299", "0235"];
const houseColours = ['#F7B538','#C62D2A','#004BA8','#495057'];
const houseNames = ['RU','CO','MF','MC'];
const totalHouses = houseColours.length;
const repeatNum = 5; //num of house repeats


const housePointsCycle = [];
const houseColoursCycle = [];
const houseNamesCycle = [];

// repeat each houses data 3 times
for(let i = 0; i < totalHouses; i++){
    for(let j = 0; j < repeatNum; j++){
        housePointsCycle.push(housePoints[i]);
        houseColoursCycle.push(houseColours[i]);
        houseNamesCycle.push(houseNames[i]);
    }
}

const sketch = () => {
  return ({ context, width, height }) => {
    // Set the background colour
    context.fillStyle = houseColoursCycle[houseIndex]; // house colour
    context.fillRect(0, 0, width, height);
    
    // Draw house name
    context.fillStyle = 'white';
    context.font = '200px serif';
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.save();
    context.translate(width * 0.5, height* 0.5);
    context.fillText(houseNamesCycle[houseIndex],0,0); //house name
    context.restore();
      
    // Draw house points
    context.font = '70px serif';
    context.save();
    context.translate(width * 0.5, (height* 0.5) + 150);
    context.fillText(housePointsCycle[houseIndex],0,0); // house points
    context.restore();
    
    // Circle parameters
    const cx = width * 0.5; // center of circle x
    const cy = height * 0.5;// center of circle y
    const num = 40;
    const radius = width * 0.3;
      
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;
    
    // Loop to create pattern
    for (let i = 0; i < num; i ++){
        const slice = math.degToRad(360/num);
        const angle = slice * i;
        x = cx + radius * Math.sin(angle);
        y = cy + radius * Math.cos(angle);
        
        context.save();
        context.translate(x,y);
        context.rotate(-angle);
        context.scale(random.range(0.1,2),random.range(0.2,0.5));

        // Draw rectangle
        context.beginPath();
        context.rect(-w * 0.5,random.range(0, h*0.5), w, h);
        context.fill();
        context.restore();
        
        // Draw arcs
        context.save();
        context.translate(cx, cy);
        context.rotate(-angle);
        context.lineWidth = random.range(5,20);
        context.beginPath();
        context.arc(0, 0, radius * random.range(0.7,1.3), slice * random.range(1,-8), slice * random.range(1,5));
        //arc stroke style
        context.strokeStyle = "black";
        context.stroke();
        context.restore();
    }
      
    
  };
};

canvasSketch(sketch, settings);
