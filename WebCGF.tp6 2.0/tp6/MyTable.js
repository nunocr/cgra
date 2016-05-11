

function MyTable(scene) {
    CGFobject.call(this,scene);	
	this.cube = new MyUnitCubeQuad(scene);

	this.tableLegsAppearance = new CGFappearance(scene);
	this.tableTopAppearance = new CGFappearance(scene);
	
	this.tableTopAppearance .setAmbient(0.2,0.2,0.2,1);
	this.tableTopAppearance .setDiffuse(0.4,0.4,0.4,1);
	this.tableTopAppearance .setSpecular(.2,.2,.2,1);
	this.tableTopAppearance .setShininess(.2,.2,.2,1);
	this.tableTopAppearance .loadTexture("../resources/images/table.png");

};

MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {  
   
	this.tableLegsAppearance.apply();

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.75,-1.35);
    this.scene.scale(.3,3.5,.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2.35,1.75,1.35);
    this.scene.scale(.3,3.5,.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.75,-1.35);
    this.scene.scale(.3,3.5,.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2.35,1.75,1.35);
    this.scene.scale(.3,3.5,.3);
    this.cube.display();
    this.scene.popMatrix();

	
	this.tableTopAppearance.apply();

	this.scene.pushMatrix();   
    this.scene.translate(0,3.65,0);
    this.scene.scale(5,.3,3);    
    this.cube.display();
    this.scene.popMatrix();
};
