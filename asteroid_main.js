// Main: has access to DOM and contains SceneManager

// asteroid model files into array
const fs = require("fs");
const path = require("path");

const directoryPath = "asteroid_assets/asteroids_specifically";

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const filePaths = files.map((file) => path.join(directoryPath, file));
});

export default filePaths;


// create SceneManager
const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

// handle DOM events
bindEventListeners();

// Render Loop 
render();



function bindEventListeners() {
	window.onresize = resizeCanvas;
	resizeCanvas();	
}

function resizeCanvas() {
	canvas.style.width  = '100%';
	canvas.style.height = '100%';
	
	canvas.width  = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
    
    sceneManager.onWindowResize();
}


function render() {

    requestAnimationFrame(render);
    sceneManager.update();
}



