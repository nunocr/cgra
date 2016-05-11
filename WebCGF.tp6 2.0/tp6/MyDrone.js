 var degToRad = Math.PI / 180.0;
 var time = 0;
 var lastTime = 0;

function MyDrone(scene, slices, stacks)
{
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;

   this.droneAppearance = new CGFappearance(scene);
   this.droneAppearance.setDiffuse(1, 1, 1, 1);
   this.droneAppearance.setSpecular(1, 1, 1, 1);
   this.droneAppearance.setAmbient(1, 1, 1, 1);
   this.droneAppearance.setShininess(100);
    

    this.xpos = 0;
    this.zpos = 0;
    this.ypos = 4;
    this.rotate = 0;

    this.bodycylinder1 = new MyCylinder(scene, slices, stacks);
    this.bodycylinder1.initBuffers();

    this.bodycylinder2 = new MyCylinder(scene, slices, stacks);
    this.bodycylinder2.initBuffers();

    this.body = new MyHalfSphere(scene, slices, stacks);
    this.body.initBuffers();

    this.wingcylinder1 = new MyCylinder(scene, slices, stacks);
    this.wingcylinder1.initBuffers();

    this.wingcylinder2 = new MyCylinder(scene, slices, stacks);
    this.wingcylinder2.initBuffers();

    this.wingcylinder3 = new MyCylinder(scene, slices, stacks);
    this.wingcylinder3.initBuffers();

    this.wingcylinder4 = new MyCylinder(scene, slices, stacks);
    this.wingcylinder4.initBuffers();

    this.dronelegs1 = new MyDroneLegs(scene, slices, stacks);
    this.dronelegs1.initBuffers();

    this.dronelegs2 = new MyDroneLegs(scene, slices, stacks);
    this.dronelegs2.initBuffers();

    this.dronelegscylinder1 = new MyCylinder(scene,stacks, slices);
    this.dronelegscylinder1.initBuffers();

    this.dronelegscylinder2 = new MyCylinder(scene,stacks, slices);
    this.dronelegscylinder2.initBuffers();

    this.dronehelicebase1 = new MyHalfSphere(scene, stacks, slices);
    this.dronehelicebase1.initBuffers();

    this.dronehelicebase2 = new MyHalfSphere(scene, stacks, slices);
    this.dronehelicebase2.initBuffers();

    this.dronehelicebase3 = new MyHalfSphere(scene, stacks, slices);
    this.dronehelicebase3.initBuffers();

    this.dronehelicebase4 = new MyHalfSphere(scene, stacks, slices);
    this.dronehelicebase4.initBuffers();


   this.initBuffers();
};

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor = MyDrone;

/*
MyDrone.prototype.initBuffers = function()
{
    this.vertices = [
    .5,.3,-.4,
    -.5,.3,-.4,
    0,.3,1.6
    ];
    this.indices = [
    0,1,2,
    2,1,0
    ];
    this.normals = [
    0,0,1,
    0,0,1,
    0,0,1
    ];   

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
*/


/*
MyDrone.prototype.update = function(){
    console.log("drone.display()");
    this.materialDefault.apply();
    this.scene.pushMatrix();   
    this.scene.rotate(this.rotate, 0, 1, 0);
	this.scene.translate(this.xpos, this.ypos, this.zpos);
	this.scene.popMatrix();
	this.moved = 0;
};
*/
MyDrone.prototype.moveForward  = function(speed)
{  
    this.zpos += speed*Math.cos(this.rotate)/14;
    this.xpos += speed*Math.sin(this.rotate)/14;
     if(this.zpos < 2){
        this.zpos = 2;
    } else if(this.zpos > 13){
        this.zpos = 13;
    }
    if(this.xpos < 2){
        this.xpos = 2;
    } else if(this.xpos > 13){
        this.xpos = 13;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveBackward = function(speed)
{   
    this.zpos -= speed*Math.cos(this.rotate)/14;
    this.xpos -= speed*Math.sin(this.rotate)/14;
    if(this.zpos < 2){
        this.zpos = 2;
    } else if(this.zpos > 13){
        this.zpos = 13;
    }
    if(this.xpos < 2){
        this.xpos = 2;
    } else if(this.xpos > 13){
        this.xpos = 13;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveUp = function(speed)
{   
    this.ypos += speed*Math.cos(this.rotate)/14;
    if(this.ypos > 8){
        this.ypos = 8;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.moveDown = function(speed)
{   
    this.ypos -= speed*Math.cos(this.rotate)/14;
    if(this.ypos < 1.2) {
    this.ypos = 1.2;
    }
    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.rotateLeft = function(speed)
{
 
    this.rotate += speed*degToRad;

    if(this.rotate >= 2*Math.PI)
        this.rotate %= 2*Math.PI;

    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);

};

MyDrone.prototype.rotateRight = function(speed)
{
    this.rotate -= speed*degToRad;

    if(this.rotate < 0)
        this.rotate += 2*Math.PI;    

    console.log("x: %f | z: %f | alpha: %f",this.xpos,this.zpos,this.rotate);
};

MyDrone.prototype.draw = function(scene){

    this.droneAppearance.apply();

    scene.pushMatrix();

    scene.rotate(this.rotate,0,1,0);

    var tmpz = (Math.cos(this.rotate)*this.zpos + Math.sin(this.rotate)*this.xpos)/
               (Math.pow(Math.sin(this.rotate),2) + Math.pow(Math.cos(this.rotate),2));

    var tmpx = -(Math.sin(this.rotate)*this.zpos - Math.cos(this.rotate)*this.xpos)/
               (Math.pow(Math.sin(this.rotate),2) + Math.pow(Math.cos(this.rotate),2));               
/*
    //vetor diretor da orientação do drone
    var v = [Math.cos(this.rotate),Math.sin(this.rotate)];

    //vetor posição do drone
    var x = [this.xpos,this.zpos];

    //vetor da projeção do vetor x na reta formada por v
    var proj = 
             [
             (x[0]*v[0]+x[1]*v[1])*v[0]/(Math.pow(v[0],2)+Math.pow(v[1],2)),
             (x[0]*v[0]+x[1]*v[1])*v[1]/(Math.pow(v[0],2)+Math.pow(v[1],2)) 
             ];

    //vetor proj-x
    var dist = [proj[0]-x[0],proj[1]-x[1]];

    var tmpx = Math.sqrt(Math.pow(dist[0],2)+Math.pow(dist[1],2));
    var tmpz = Math.sqrt(Math.pow(proj[0],2)+Math.pow(proj[1],2));

    if(this.rotate >= 0 && this.rotate < Math.PI/2){
       // tmpz = - tmpz;
        tmpx = - tmpx;
    }
    else  if(this.rotate >= Math.PI/2 && this.rotate < Math.PI){
        tmpz = - tmpz;
        tmpx = - tmpx;
    }
    else if(this.rotate >= Math.PI && this.rotate < 3*Math.PI/2){
        tmpz = - tmpz;
    }
*/
    scene.translate(tmpx,this.ypos,tmpz);

    /*
     this.tmp_rot = this.rotate;

     while(this.tmp_rot >= Math.PI/2)
         this.tmp_rot %= Math.PI/2;     

    if(this.xpos != 0 && this.zpos != 0)
        this.tmp_rot += Math.abs(Math.atan(this.xpos/this.zpos));       
    
    this.tmp_rad = Math.sqrt(Math.pow(this.xpos,2)+Math.pow(this.zpos,2));

    this.tmpx = Math.sin(this.tmp_rot)*this.tmp_rad;
    this.tmpz = Math.cos(this.tmp_rot)*this.tmp_rad;   

    scene.translate(this.tmpx,this.ypos,this.tmpz);
    */

    this.display();

    scene.popMatrix();
};

MyDrone.prototype.update = function(currTime)
{
    
};

MyDrone.prototype.display = function()
{
    this.scene.pushMatrix();
  
    this.scene.pushMatrix();
    this.scene.scale(0.1, 0.1, 4);
    this.scene.translate(0, -1, -0.5);
    this.bodycylinder1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(90*(Math.PI/180), 0, 1, 0);
    this.scene.translate(0, -0.1, -2);
    this.scene.scale(0.1, 0.1, 4);
    this.bodycylinder2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.rotate(Math.PI, 0, 0, 1);
    this.scene.scale(0.7, 0.7, 0.7);
    this.body.display();
    this.scene.popMatrix();


    this.scene.pushMatrix();
    this.scene.translate(2, 0.1, 0);
    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2, 0.1, 0);
    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, -2);
    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder3.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, 2);
    this.scene.rotate(90*Math.PI/180, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.3);
    this.wingcylinder4.display();
    this.scene.popMatrix();

    
    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, -0.6);
    this.scene.rotate(90*Math.PI/180, 0, 0, 1);
    this.scene.scale(1, 1, 0.2);
    this.dronelegs1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, -1.2, 0.4);
    this.scene.rotate(90*Math.PI/180, 0, 0, 1);
    this.scene.scale(1, 1, 0.2);
    this.dronelegs2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-1, -1.2, -1);
    this.scene.scale(0.05, 0.05, 2);
    this.dronelegscylinder1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(1, -1.2, -1);
    this.scene.scale(0.05, 0.05, 2);
    this.dronelegscylinder2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2, 0.1, 0);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.scale(0.1, 0.2, 0.1);
    this.dronehelicebase1.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2, 0.1, 0);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.scale(0.1, 0.2, 0.1);
    this.dronehelicebase2.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, 2);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.scale(0.1, 0.2, 0.1);
    this.dronehelicebase3.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.1, -2);
    this.scene.rotate(Math.PI, 1, 0, 0);
    this.scene.scale(0.1, 0.2, 0.1);
    this.dronehelicebase4.display();
    this.scene.popMatrix();

    this.scene.popMatrix();
    
};
