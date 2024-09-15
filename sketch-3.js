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
const houseNames = ["Rutherford", "Columba", "Macfarlane", "McRae"]
const houseColours = ['#F7B538', '#C62D2A', '#004BA8', '#000000'];
//random colour index
const  randomColour = Math.floor(Math.random() * houseColours.length);


const sketch = ({ context, width, height }) => {
    const agents = [];
    
    // for loop to create 40 agents
    for (let i=0; i < 40; i++) {
        const x = random.range(0,width);
        const y = random.range(0,height);
        
        agents.push(new Agent (x,y))
    }
    
    
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);
        
        for ( let i=0; i <agents.length; i++){
            const agent = agents[i];
            
            for ( let j= i + 1; j <agents.length; j++){
                const other = agents[j];
                
                const dist = agent.pos.getDistance(other.pos);
                
                if (dist > 200) continue;
                // n = mapRange(value, inputMin, inputMax,outputMin, outputMax, clamp = false)
                // range 0-200, when dist = 0, line = 12, when dist = 200, line = 1
                context.lineWidth = math.mapRange(dist, 0, 200, 12,1);
                
                context.beginPath();
                context.moveTo(agent.pos.x, agent.pos.y);
                context.lineTo(other.pos.x, other.pos.y);
                context.stroke();
            }
        }
        
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
    constructor(x,y){
        //position point
        this.pos = new Vector(x,y);
        this.vel = new Vector (random.range(-1,1),random.range(-1,1));
        //random radius (within a range)
        this.radius = random.range(4,12);
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
        context.lineWidth = 4;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        
        context.restore();
    }
}

