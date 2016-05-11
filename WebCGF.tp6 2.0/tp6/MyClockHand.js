function MyClockHand(scene, s, angulo)
{
    CGFobject.call(this, scene);
    this.angle = angulo;
    this.length = s;
    this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor = MyClockHand;
MyClockHand.prototype.initBuffers = function()
{
    this.vertices = [];
    this.indices = [];
    this.normals = [];

    this.vertices.push(0, this.length/1.5, 0);
    this.vertices.push(0.04, 0, 0);
    this.vertices.push(-0.04, 0, 0);

    this.indices.push(0, 2, 1);

    this.normals.push(0, 0, 1);
    this.normals.push(0, 0, 1);
    this.normals.push(0, 0, 1);

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};

MyClockHand.prototype.setAngle = function(angulo)
{
    this.angle = angulo;
};

/*
MyClockHand.prototype.display = function()
{
    this.display();
};
*/
