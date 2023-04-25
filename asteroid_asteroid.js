import filePaths from "./asteroid_main";
function Asteroid(scene, x, y) {
	
	var modelLoader = new THREE.GLTFLoader();
	this.model;
	this.height;
	this.width;
    this.thicc;

    // get random number to get random asteroid from the asteroid directory
    const randomNumber = Math.floor(Math.random() * 10);
    const myFilePath = filePaths[randomNumber];

	modelLoader.load
		( 
			myFilePath, 
			( function(obj) {
				this.model = obj.scene;

				this.model.rotation.x = Math.PI / 2;
				this.model.rotation.y = -Math.PI / 2;

				this.model.position.set(x, y, -100);
				this.model.scale.set(0.2,0.2,0.2);

				scene.add(this.model);
				var enemyBndBox = new THREE.Box3().setFromObject(this.model);
                let enemyBndSphere = new THREE.Sphere(this.model.
				this.height = enemyBndBox.getSize().y;
				this.width = enemyBndBox.getSize().x;
                this.thicc = enemyBndBox.getSize().z;
			}).bind(this)
		)

	this.destroy = function() {
		scene.remove(this.model);
	}
}
