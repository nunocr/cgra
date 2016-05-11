function MyClock(scene, slices, stacks)
{
    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.updatePeriod = 100; //miliseconds

    this.metalAppearance = new CGFappearance(scene);

	this.metalAppearance.setAmbient(0.2, 0.2, 0.2, 1);
	this.metalAppearance.setDiffuse(0.2, 0.2, 0.2 ,1);
	this.metalAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.metalAppearance.setShininess(120);


   this.clockAppearance = new CGFappearance(scene);
   this.clockAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
   this.clockAppearance.setSpecular(0.4, 0.4, 0.4, 1);
   this.clockAppearance.setAmbient(0.9, 0.9, 0.9, 1);
   this.clockAppearance.setShininess(10);
   this.clockAppearance.loadTexture("../resources/images/clock.png");


   this.ponteiroAppearance = new CGFappearance(scene);
   this.ponteiroAppearance.setDiffuse(0.0, 0.0, 0.0, 1);
   this.ponteiroAppearance.setSpecular(0.0, 0.0, 0.0, 1);
   this.ponteiroAppearance.setAmbient(0.0, 0.0, 0.0, 1);
    this.ponteiroAppearance.setShininess(0);



   this.cylinder = new MyCylinder(scene, slices, stacks);
   this.cylinder.initBuffers();

   this.tampa = new MyCircle(scene, slices, stacks);
   this.tampa.initBuffers();

   this.hours = new MyClockHand(scene, 0.7, 0);
   this.hours.initBuffers();

   this.minutes = new MyClockHand(scene, 1, 0);
   this.minutes.initBuffers();

   this.seconds = new MyClockHand(scene, 1.2, 0);
   this.seconds.initBuffers();
};

    MyClock.prototype = Object.create(CGFobject.prototype);
    MyClock.prototype.constructor = MyClock;

    MyClock.prototype.display = function()
    {       
 
        this.metalAppearance.apply();
 
        this.scene.pushMatrix();
     
        this.cylinder.display();
        this.clockAppearance.apply();
        this.scene.translate(0, 0, 0.1);
        this.tampa.display();

        this.ponteiroAppearance.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.2);
        //this.hours.setAngle(90);
        this.scene.rotate(-this.hours.angle*Math.PI/180, 0, 0, 1);
        this.hours.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.2);
        //this.minutes.setAngle(0);
        this.scene.rotate(-this.minutes.angle*Math.PI/180, 0, 0, 1);
        this.minutes.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.2);
        //this.seconds.setAngle(0);
        this.scene.rotate(-this.seconds.angle*Math.PI/180, 0, 0, 1);
        this.seconds.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    };

 
 MyClock.prototype.update = function(currTime)
 {
     /*
     this.seconds.setAngle( (((currTime/1000)%60)/60)*360 );
     this.minutes.setAngle( (((currTime/1000)%60)/60)*360/60);
     this.hours.setAngle( (((currTime/1000)%60)/60)*360/3600);
    */
     this.seconds.setAngle(currTime/(1000)%60 * 360/60);
     this.minutes.setAngle((currTime/1000)%3600 *360/3600);
     this.hours.setAngle(currTime / (1000*60*60) % 24/ 24*360);
 };


 MyClock.prototype.setUpdatePeriod = function(value)
 {
   this.updatePeriod = value;  
 };
