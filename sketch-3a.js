const canvasSketch = require('canvas-sketch');
//import random range function
const random = require('canvas-sketch-util/random');

//canvas settings
const settings = {
  dimensions: [ 1080, 1080],
  animate: true // set animate function to true
};

//dummy animate function
const animate = () => {
    console.log('domestika');
    //browser window function - triggers when browser is ready to repaint frame
    requestAnimationFrame(animate);
};
//animate();

const sketch = ({ context, width, height }) => {
    const agents = [];
    
    // for loop to create 40 agents
    for (let i=0; i < 40; i++) {
        const x = random.range(0,width);
        const y = random.range(0,height);
        
        agents.push(new Agent (x,y))
    }
    
    
    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        
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
        context.strokeStyle = "white";
        context.stroke();
        context.restore();
    }
}

