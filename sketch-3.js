//IMPORTS
const canvasSketch = require('canvas-sketch');
//import random range function
const random = require('canvas-sketch-util/random');
// import math module
const math =require('canvas-sketch-util/math')

//CANVAS SETTINGS
const settings = {
  dimensions: [ 1920, 1080],
  animate: true // set animate function to true
};

// HOUSE INFORMATION
const houseNames = [ "COLUMBA","RUTHERFORD", "MACFARLANE", "MCRAE"]
//colour palettes for each house
const houseColours = {
    "COLUMBA": ['#C52233', '#C20303', '#CD5D67', '#D90202','#C62D2A'],
    "RUTHERFORD" : ['#F7B538', '#FDF8E1','#F4AC32', '#FFF75E'],
    "MACFARLANE" : ['#004BA8', '#003559', '#00A6FB', '#5899E2'],
    "MCRAE" : ['#212529','#DEE2E6', '#ADB5BD', '#E9ECEF', '#495057']
};
///random house colour index
const randomHouseIndex = Math.floor(Math.random() * houseNames.length);
const selectedHouseName = houseNames[randomHouseIndex];
const selectedHouseColours = houseColours[selectedHouseName];

let housePoints = "";

//text size range
const minFontSize = 10;
const maxFontSize = 100;

const sketch = ({ context, width, height }) => {
    const agents = [];
    
    //distribute agents randomly on canvas
    for (let i=0; i < 40; i++) {
        const x = random.range(0,width);
        const y = random.range(0,height);
        const colour = random.pick(selectedHouseColours);
        agents.push(new Agent (x,y,colour))
    }
    
    return ({ context, width, height }) => {
        context.fillStyle = 'white'; //background canvas colour
        context.fillRect(0, 0, width, height);
        
        // draw connections between agents and display texts if in range
        for ( let i=0; i <agents.length; i++){
            const agent = agents[i];
            
            for ( let j= i + 1; j <agents.length; j++){
                const other = agents[j];
                const dist = agent.pos.getDistance(other.pos);
                
                if (dist > 200) continue;
                
                // range 0-200, when dist = 0, line = 12, when dist = 200, line = 1
                context.lineWidth = math.mapRange(dist, 0, 200, 12,1);
                context.strokeStyle = 'black'; //set line colour
                context.beginPath();
                context.moveTo(agent.pos.x, agent.pos.y);
                context.lineTo(other.pos.x, other.pos.y);
                context.stroke();
                
                // Calculate midpoint for text placement
                const midX = (agent.pos.x + other.pos.x) / 2;
                const midY = (agent.pos.y + other.pos.y) / 2;
                
                //range 0-200 when dist = 0, maxFontSize = 90, when dist = 200, minFontSize =12
                const textSize = math.mapRange(dist, 0, 200, maxFontSize, minFontSize);
                
                //draw houseName text
                context.fillStyle = 'black';
                context.font = `${textSize}px Serif`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(selectedHouseName, midX, midY);
                
                //draw points text
                context.fillStyle = 'black';
                context.font = `30px Serif`;
                context.textAlign = 'left';
                context.textBaseline = 'middle';
                context.fillText('points: 100', 20, 1050);
                
            }
        }
        //update and draw each agent
        agents.forEach(agent => {
            agent.update();
            agent.draw(context);
            agent.bounce(width, height);
        });
      
  };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    getDistance(v){
        const dx = this.x - v.x
        const dy = this.y - v.y
        
        return Math.sqrt(dx * dx + dy * dy)
        
    }
}

class Agent {
    constructor(x,y, colour){
        //position point
        this.pos = new Vector(x,y);
        this.vel = new Vector (random.range(-1,1),random.range(-1,1));
        //random radius of agent (within a range)
        this.radius = random.range(5, 45);
        this.colour = colour;
    }
    
    //keeps agents from escaping border of canvas
    bounce(width,height){
        if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
        if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    }
    
    // add velocity to the position using update method
    update(){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    
    draw(context) {
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.fillStyle = this.colour;
        context.lineWidth = 4;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.restore();
    }
}

