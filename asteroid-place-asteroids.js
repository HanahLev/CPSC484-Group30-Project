function placeAsteroids(scene) {

	const theAsteroids = [];

	// asteroid model files into array

	const directoryPath = "./asteroid_assets/asteroids_specifically/";
	let filePaths = ["as1.glb", "as2.glb", "as3.glb", "as4.glb", "as5.glb", "as6.glb", "as7.glb", "as8.glb", "as9.glb", "as10.glb"];


	for (let index = 0; index < filePaths.length; index++) {
		filePaths[index] = directoryPath + filePaths[index];
	}

	[...Array(5).keys()].map(y => {

		getRandomPositions().map(x => { 
			// get random number to get random asteroid from the asteroid directory
			const randomNumber = Math.floor(Math.random() * 10);
			const myFilePath = filePaths[randomNumber];

			const e = new Asteroid(scene, 200*(x-4), 400*(y+1), myFilePath);
			theAsteroids.push(e);
		});
	});

	return theAsteroids;
	
	function getRandomPositions() {

		var noAsteroids = Math.floor((Math.random() * 4));	
		
		var arr = [...Array(9).keys()];

		for (let i = arr.length - 1; i > 0; i--) {
		    
		    const j = Math.floor(Math.random() * i);
		    const temp = arr[i];
		    arr[i] = arr[j];
		    arr[j] = temp;
		}

		return arr.slice(0, noAsteroids);
    }


}

window.placeAsteroids = placeAsteroids;

