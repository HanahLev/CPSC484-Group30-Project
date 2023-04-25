import filePaths from "./asteroid_main";
function Asteroid(scene, x, y) {
	
	var modelLoader = new THREE.GLTFLoader();
	this.model;
	this.sphere;

    // get random number to get random asteroid from the asteroid directory
    const randomNumber = Math.floor(Math.random() * 10);
    const myFilePath = filePaths[randomNumber];

	modelLoader.load
		( 
			myFilePath, 
			( function(gltf) {
				this.model = gltf.scene;

				this.model.rotation.x = Math.PI / 2;
				this.model.rotation.y = -Math.PI / 2;

				this.model.position.set(x, y, -100);
				this.model.scale.set(0.2,0.2,0.2);

				scene.add(this.model);
				this.model.computeBoudningSphere();
                this.sphere = new THREE.Sphere(this.model.boundingSphere.center, this.model.boundingSphere.radius);
			}).bind(this)
		)

	this.destroy = function() {
		scene.remove(this.model);
	}
}
