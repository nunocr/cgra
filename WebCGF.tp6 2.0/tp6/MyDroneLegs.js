
 function MyDroneLegs(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyDroneLegs.prototype = Object.create(CGFobject.prototype);
 MyDroneLegs.prototype.constructor = MyDroneLegs;

 MyDroneLegs.prototype.initBuffers = function() {
 	
	this.vertices = [];
	this.indices = [];
	this.normals = [];

	var stack_h = 1 / this.stacks;

	//BASE INFERIOR
	//gerar os vertices da base
	
	for(i = 0; i < this.slices; i++){
		this.vertices.push(Math.sin(i*Math.PI*2/this.slices),Math.cos(i*Math.PI*2/this.slices),0);
		this.normals.push(0,0,-1);
	}


	//gerar os triangulos da base
	/*
	for(i = 0; i < this.slices - 2; i++){
		//poligono de n lado é decomposto em n-2 triangulos
		this.indices.push(0,i+1,i+2);
	}
	*/

	//CORPO
	//gerar os vertices das faces
	for(i = 0; i < this.stacks + 1; i++){
		for(j = 0; j < this.slices; j++){

			this.vertices.push(Math.sin(j*Math.PI*2/this.slices),Math.cos(j*Math.PI*2/this.slices),i*stack_h);
			this.normals.push(Math.sin(j*Math.PI*2/this.slices),Math.cos(j*Math.PI*2/this.slices),0);

		}
	}

	//gerar triagulos das faces
	for(i = 0; i < this.stacks; i++){
		for(j = 0; j < this.slices/2; j++){
			
			this.indices.push(
			this.slices + this.slices*i + this.slices + j,
			this.slices + this.slices*i + 1 + j,
			this.slices + this.slices*i + j
			);

			this.indices.push(
			this.slices + this.slices*i + 1 + j,
			this.slices + this.slices*i + this.slices + j,
			this.slices + this.slices*i + this.slices + 1 + j
			);
			
		}
	}

//BASE SUPERIOR
//gerar os vertices da base

for(i = 0; i < this.slices; i++){
	this.vertices.push(Math.sin(i*Math.PI*2/this.slices),Math.cos(i*Math.PI*2/this.slices),1);
	this.normals.push(0,0,1);
}


//gerar os triangulos da base

for(i = 0; i < this.slices - 2; i++){
	//poligono de n lado é decomposto em n-2 triangulos
	this.indices.push(
	 /*(this.slices*(this.stacks +1) + i + 2)/2*/ 0,
	 /*(this.slices*(this.stacks +1) + i + 1)/2*/ 0,
	 /*(this.slices*(this.stacks +1))/2*/ 0
	 );
}
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };

