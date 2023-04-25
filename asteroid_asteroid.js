distance = 50;
worldOrigin = new THREE.Vector3(0, 0, 0);
function Asteroid(scene, x, y, path) {
	
	var modelLoader = new THREE.GLTFLoader();
	this.model;


	console.log(path);
	modelLoader.load
		(
			path, 
			( function(gltf) {
				this.model = gltf.scene;
				console.log(this.model);

				this.model.rotation.x = Math.PI / 2;
				this.model.rotation.y = -Math.PI / 2;

				this.model.position.set(x, y, -200);
				// this.model.scale.set(0.2,0.2,0.2);
				// this.model.scale.set(100, 100, 100);
				this.model.updateMatrixWorld(true);
				this.bbox = new THREE.Box3().setFromObject(this.model);

				scene.add(this.model);
				this.getMoving();
				return this;

			}).bind(this)
		)
	this.destroy = function() {
		scene.remove(this.model);
	}

	this.getMoving = function() {
		console.log(typeof(this.model));
		this.model.translateOnAxis(this.model.worldToLocal(worldOrigin).normalize(), distance);
		requestAnimationFrame(this.getMoving);
	}

}
