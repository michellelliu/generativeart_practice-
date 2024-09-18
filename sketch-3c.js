//imports
const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

//canvas settings
const settings = {
  dimensions: [ 1920, 1080],
  animate: true // set animate function to true
};

//sketch function
const sketch = ({ context, width, height }) => {
    const agents = [];
    
    // for loop to create 40 agents
    for (let i=0; i < 40; i++) {
        const x = random.range(0,width);
        const y = random.range(0,height);
        //add agent to agent array
        agents.push(new Agent (x,y))
    }
    
    
    return ({ context, width, height }) => {
        //make the background colour black
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        
        agents.forEach(agent => {
            //moves agent based on it's velocity
            agent.update();
            
            agent.draw(context);
            //prevent agents from escaping the size of canvas
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
}

class Agent {
    constructor(x,y){
        // set position, velocity and radius for each agent
        this.pos = new Vector(x,y);
        this.vel = new Vector (random.range(-1,1),random.range(-1,1));
        //random radius (within a range)
        this.radius = random.range(4,12);
    }
    
    //reverses agents direction if it hits the canvas edge
    bounce(width,height){
        if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
        if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
    }
    
    // add velocity to the position using update method
    update(){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    //draw agent as a circle on the canvas
    draw(context) {
        context.save();
        context.translate(this.pos.x, this.pos.y);
        context.lineWidth = 4;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        //fill inside of circles blue
        context.fillStyle = "blue";
        context.fill();
        //outline the circles white
        context.strokeStyle = "white";
        context.stroke();
        context.restore();
    }
}

