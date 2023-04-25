// Create a plane, add texture to it, position it and then add to the scene
function Background(scene, height) {
	
	var geometry = new THREE.PlaneGeometry(1920, 1080)
	
	const textureLoader = new THREE.TextureLoader()
	var material = new THREE.MeshBasicMaterial({ map: textureLoader.load("https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2386&q=80")})
	var bg = new THREE.Mesh(geometry, material)

	bg.rotation.z = -Math.PI / 2;
	bg.position.z = -900;

	scene.add(bg)
}

window.Background = Background;