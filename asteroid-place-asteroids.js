function placeAsteroids(scene) {

	// const theAsteroids = [];

	// asteroid model files into array

	const directoryPath = "./asteroid_assets/asteroids_specifically/";
	let filePaths = ["as1.glb", "as2.glb", "as3.glb", "as4.glb", "as5.glb", "as6.glb", "as7.glb", "as8.glb", "as9.glb", "as10.glb"];


	for (let index = 0; index < filePaths.length; index++) {
		filePaths[index] = directoryPath + filePaths[index];
	}

	// get random number to get random asteroid from the asteroid directory
	const randomNumber = Math.floor(Math.random() * 10);
	const myFilePath = filePaths[randomNumber];

	new Asteroid(scene, getRandomPositions().x, getRandomPositions().y, myFilePath);

	// [...Array(5).keys()].map(y => {

	// 	getRandomPositions().map(x => { 
	// 		// get random number to get random asteroid from the asteroid directory
	// 		const randomNumber = Math.floor(Math.random() * 10);
	// 		const myFilePath = filePaths[randomNumber];

	// 		const e = new Asteroid(scene, 200*(x-4), 400*(y+1), myFilePath);
	// 		theAsteroids.push(e);
	// 	});
	// });


	// return theAsteroids;
	
	function getRandomPositions() {

		return {x: Math.random() * 160 - 80, y: Math.random() * 160 - 80}
    }


}

window.placeAsteroids = placeAsteroids;

