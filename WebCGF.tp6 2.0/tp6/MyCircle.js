function MyCircle(scene, slices, stacks)
{
    CGFobject.call(this, scene);
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers;
};

MyCircle.prototype = Object.create(CGFobject.prototype);
MyCircle.prototype.constructor = MyCircle;

MyCircle.prototype.initBuffers = function()
{
   this.vertices = [];
   this.indices = [];
   this.normals = [];
   this.texCoords = [];

   this.vertices.push(0, 0, this.stacks);
   this.normals.push(0, 0, this.stacks);
   this.texCoords.push(0.5, 0.5);

 //BASE SUPERIOR
//gerar os vertices da base
for(i = 0; i < this.slices; i++)
    {
    	var x = Math.cos(i*(2*Math.PI)/this.slices);
    	var y = Math.sin(i*(2*Math.PI)/this.slices);
    	//this.vertices.push(this.stacks, y, x);
    	this.vertices.push(x, y, this.stacks);

    	//this.normals.push(this.stacks, 0, 0);
    	this.normals.push(0, 0, this.stacks);

    	var tx = 0.5+Math.cos(i*(2*Math.PI)/this.slices)/2;
    	var ty = 0.5-Math.sin(i*(2*Math.PI)/this.slices)/2;
    	//this.texCoords.push(ty, tx);
    	this.texCoords.push(tx, ty);
    }
	


//gerar os triangulos da base
/*for(i = 0; i < this.slices -2; i++){
	//poligono de n lado é decomposto em n-2 triangulos
	this.indices.push(this.slices*(this.stacks +1) + i + 2, this.slices*(this.stacks +1) + i + 1,this.slices*(this.stacks +1));
}*/

//gerar os triangulos da base
	for(i = 0; i < this.slices /*- 2*/; i++){
		//poligono de n lado é decomposto em n-2 triangulos
		if(i == this.slices - 1)
		{
			this.indices.push(0, i+1, 1);
		}

	  	else this.indices.push(0,i+1,i+2);
	}


/*
for (var i = 0; i < this.slices; i++) {

		if (i == this.slices - 1) {
			this.indices.push(0);
			this.indices.push(i + 1);
			this.indices.push(1);
		}
		else {
			this.indices.push(0);
			this.indices.push(i + 1);
			this.indices.push(i + 2);
		}
	}
*/



    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers(); 
};