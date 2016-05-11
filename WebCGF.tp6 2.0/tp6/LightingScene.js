var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 1;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.option1=true;
	this.option2=false;
	this.speed = 3;

	this.Luz1 = true;
	this.Luz2 = true;
	this.Luz3 = true;
	this.Luz4 = true;
	
	this.enableTextures(true);
	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new Plane(this);

	//clock com uma stack ta demasiado grosso
	this.clock = new MyClock(this, 12, 1);
	
	//Drone
	this.drone = new MyDrone(this, 20, 12);

	//Interface
	this.interface = new MyInterface();

	
	//this.floor = new MyQuad(this);
	this.leftWall = new MyQuad(this, -0.6, 1.55, -0.6, 1.55);
	//this.leftWall = new MyQuad(this, 0, 1, 0, 1);
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	
	this.boardA = new Plane(this, 30);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.2,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	//Floor Texture
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
	this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.floorAppearance.setAmbient(0.2, 0.2, 0.2 ,1);
	this.floorAppearance.setShininess(4);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	

	//Window Texture
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setDiffuse(0.2, 0.2, 0.2, 1);
	this.windowAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.windowAppearance.setAmbient(0.2, 0.2, 0.2, 1);
	this.windowAppearance.setShininess(7);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	//Board Textures
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setDiffuse(1, 1, 1, 1);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.slidesAppearance.setShininess(7);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setDiffuse(.2, .2, .2, 1);
	this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("../resources/images/board.png");

	this.setUpdatePeriod(100);

};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true);
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true);

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(4, 6, 5, 1);
	this.lights[3].setVisible(true);
	
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(.2);
	this.lights[3].enable();
};


LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};



LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();	

	// Board A	
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();		
		//this.materialA.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B	
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);			
		this.slidesAppearance.apply();	
		//this.materialB.apply();
		this.boardB.display();
	this.popMatrix();

	// Left Wall
	this.windowAppearance.apply();
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.leftWall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Floor
	this.floorAppearance.apply();
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();

	//Clock
	this.windowAppearance.apply();
	this.pushMatrix();
	//this.metalAppearance.apply();
	this.scale(0.8, 0.8, 0.2);
	this.translate(9, 9, 0);
	this.clock.display();
	this.popMatrix();

	//Drone	
	this.drone.draw(this);
	// ---- END Geometric transformation section	
};

LightingScene.prototype.LightsUpdate = function(currTime)
{
	if(this.Luz1)
	{
		this.lights[0].enable();
		this.lights[0].update();
	}
	if(!this.Luz1)
	{
		this.lights[0].disable();
		this.lights[0].update();
	}

	if(this.Luz2)
	{
		this.lights[1].enable();
		this.lights[1].update();
	}
	if(!this.Luz2)
	{
		this.lights[1].disable();
		this.lights[1].update();
	}

	if(this.Luz3)
	{
		this.lights[2].enable();
		this.lights[2].update();
	}
	if(!this.Luz3)
	{
		this.lights[2].disable();
		this.lights[2].update();
	}

	if(this.Luz4)
	{
		this.lights[3].enable();
		this.lights[3].update();
	}
	if(!this.Luz4)
	{
		this.lights[3].disable();
		this.lights[3].update();
	}
};

LightingScene.prototype.update = function(currTime)
{
	this.clock.update(currTime);
	this.LightsUpdate(currTime);
};
