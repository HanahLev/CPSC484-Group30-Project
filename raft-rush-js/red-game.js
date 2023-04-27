/**
 * Constants used in this game.
 */
var Colors = {
  cherry: 0xe35d6a,
  blue: 0x1560bd,
  white: 0xd8d0d1,
  black: 0x000000,
  brown: 0xf6cf92,
  log: 0x310c0c,
  peach: 0xffdab9,
  shirt: 0x808080,
  grey: 0x696969,
  river: 0x3e8090,
  raft: 0x59332e,
};

var deg2Rad = Math.PI / 180;

// Make a new world when the page is loaded.
window.addEventListener("load", function () {
  new World();
});

/**
 * A class of which the world is an instance. Initializes the game
 * and contains the main game loop.
 *
 */
function World() {
  // Explicit binding of this even in changing contexts.
  var self = this;

  // Scoped variables in this world.
  var element,
    scene,
    camera,
    character,
    renderer,
    light,
    objects,
    paused,
    keysAllowed,
    score,
    difficulty,
    treePresenceProb,
    maxTreeSize,
    fogDistance,
    gameOver;

  // Initialize the world.
  init();

  /**
   * Builds the renderer, scene, lights, camera, and the character,
   * then begins the rendering loop.
   */
  function init() {
    // Locate where the world is to be located on the screen.
    element = document.getElementById("world");

    // Initialize the renderer.
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(element.clientWidth, element.clientHeight);
    renderer.shadowMap.enabled = true;
    element.appendChild(renderer.domElement);

    // Initialize the scene.
    scene = new THREE.Scene();
    fogDistance = 40000;
    scene.fog = new THREE.Fog(0xbadbe4, 1, fogDistance);

    // Initialize the camera with field of view, aspect ratio,
    // near plane, and far plane.
    camera = new THREE.PerspectiveCamera(
      60,
      element.clientWidth / element.clientHeight,
      1,
      120000
    );
    camera.position.set(0, 1500, -2000);
    camera.lookAt(new THREE.Vector3(0, 600, -5000));
    window.camera = camera;

    // Set up resizing capabilities.
    window.addEventListener("resize", handleWindowResize, false);

    // Initialize the lights.
    light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(light);

    // Initialize the character and add it to the scene.
    character = new Character();
    scene.add(character.element);

    var ground = createBox(3000, 20, 120000, Colors.river, 0, -400, -60000);
    scene.add(ground);

    objects = [];
    treePresenceProb = 0.2;
    maxTreeSize = 0.5;
    for (var i = 10; i < 40; i++) {
      createRowOfTrees(i * -2000, treePresenceProb, 0.5, maxTreeSize);
    }

    // The game is paused to begin with and the game is not over.
    gameOver = false;
    paused = true;

    // start taking input from server


    // Start receiving feedback from the player.
    var left = 37;
    var up = 38;
    var right = 39;
    var p = 80;

    keysAllowed = {};
    document.addEventListener("keydown", function (e) {
      if (!gameOver) {
        var key = e.keyCode;
        if (keysAllowed[key] === false) return;
        keysAllowed[key] = false;
        if (paused && !collisionsDetected() && key > 18) {
          paused = false;
          character.onUnpause();
          document.getElementById("variable-content").style.visibility =
            "hidden";
          document.getElementById("controls").style.display = "none";
        } else {
          if (key == p) {
            paused = true;
            character.onPause();
            document.getElementById("variable-content").style.visibility =
              "visible";
            document.getElementById("variable-content").innerHTML =
              "Game is paused. Wave to resume.";
          }
          if (key == up && !paused) {
            character.onUpKeyPressed();
          }
          if (key == left && !paused) {
            character.onLeftKeyPressed();
          }
          if (key == right && !paused) {
            character.onRightKeyPressed();
          }
        }
      }
    });
    document.addEventListener("keyup", function (e) {
      keysAllowed[e.keyCode] = true;
    });
    document.addEventListener("focus", function (e) {
      keysAllowed = {};
    });

    // Initialize the scores and difficulty.
    score = 0;
    difficulty = 0;
    document.getElementById("score").innerHTML = score;

    // Begin the rendering loop.
    loop();
  }

  /**
   * The main animation loop.
   */
  function loop() {
    // Update the game.
    if (!paused) {
      // Add more trees and increase the difficulty.
      if (objects[objects.length - 1].mesh.position.z % 3000 == 0) {
        difficulty += 1;
        var levelLength = 30;
        if (difficulty % levelLength == 0) {
          var level = difficulty / levelLength;
          switch (level) {
            case 1:
              treePresenceProb = 0.35;
              maxTreeSize = 0.5;
              break;
            case 2:
              treePresenceProb = 0.35;
              maxTreeSize = 0.85;
              break;
            case 3:
              treePresenceProb = 0.5;
              maxTreeSize = 0.85;
              break;
            case 4:
              treePresenceProb = 0.5;
              maxTreeSize = 1.1;
              break;
            case 5:
              treePresenceProb = 0.5;
              maxTreeSize = 1.1;
              break;
            case 6:
              treePresenceProb = 0.55;
              maxTreeSize = 1.1;
              break;
            default:
              treePresenceProb = 0.55;
              maxTreeSize = 1.25;
          }
        }
        if (difficulty >= 5 * levelLength && difficulty < 6 * levelLength) {
          fogDistance -= 25000 / levelLength;
        } else if (
          difficulty >= 8 * levelLength &&
          difficulty < 9 * levelLength
        ) {
          fogDistance -= 5000 / levelLength;
        }
        createRowOfTrees(-120000, treePresenceProb, 0.5, maxTreeSize);
        scene.fog.far = fogDistance;
      }

      // Move the trees closer to the character.
      objects.forEach(function (object) {
        object.mesh.position.z += 100;
      });

      // Remove trees that are outside of the world.
      objects = objects.filter(function (object) {
        return object.mesh.position.z < 0;
      });

      // Make the character move according to the controls.
      character.update();

      // Check for collisions between the character and objects.
      if (collisionsDetected()) {
        gameOver = true;
        paused = true;
        document.addEventListener("keydown", function (e) {
          if (e.keyCode == 40) {
 
            localStorage.setItem("turnScore", score);
            document.location='11-red-attack-results.html';
``
          };

        });
        var variableContent = document.getElementById("variable-content");
        variableContent.style.visibility = "visible";
        variableContent.innerHTML =
          "Game over! Raise your right hand to continue.";

      }

      // Update the scores.
      score += 1;
      document.getElementById("score").innerHTML = score;
    }

    // Render the page and repeat.
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  /**
   * A method called when window is resized.
   */
  function handleWindowResize() {
    renderer.setSize(element.clientWidth, element.clientHeight);
    camera.aspect = element.clientWidth / element.clientHeight;
    camera.updateProjectionMatrix();
  }

  /**
   * Creates and returns a row of trees according to the specifications.
   *
   * @param {number} POSITION The z-position of the row of trees.
   * @param {number} PROBABILITY The probability that a given lane in the row
   *                             has a tree.
   * @param {number} MINSCALE The minimum size of the trees. The trees have a
   *							uniformly distributed size from minScale to maxScale.
   * @param {number} MAXSCALE The maximum size of the trees.
   *
   */
  function createRowOfTrees(position, probability, minScale, maxScale) {
    for (var lane = -1; lane < 2; lane++) {
      var randomNumber = Math.random();
      if (randomNumber < probability) {
        var scale = minScale + (maxScale - minScale) * Math.random();
        var tree = new Tree(lane * 800, -400, position, scale);
        objects.push(tree);
        scene.add(tree.mesh);
      }
    }
  }

  /**
   * Returns true if and only if the character is currently colliding with
   * an object on the map.
   */
  function collisionsDetected() {
    var charMinX = character.element.position.x - 115;
    var charMaxX = character.element.position.x + 115;
    var charMinY = character.element.position.y - 310;
    var charMaxY = character.element.position.y + 320;
    var charMinZ = character.element.position.z - 40;
    var charMaxZ = character.element.position.z + 40;
    for (var i = 0; i < objects.length; i++) {
      if (
        objects[i].collides(
          charMinX,
          charMaxX,
          charMinY,
          charMaxY,
          charMinZ,
          charMaxZ
        )
      ) {
        return true;
      }
    }
    return false;
  }
}

/**
 *
 * IMPORTANT OBJECTS
 *
 * The character and environmental objects in the game.
 *
 */

/**
 * The player's character in the game.
 */
function Character() {
  // Explicit binding of this even in changing contexts.
  var self = this;

  // Character defaults that don't change throughout the game.
  this.skinColor = Colors.brown;
  this.hairColor = Colors.black;
  this.shirtColor = Colors.yellow;
  this.shortsColor = Colors.olive;
  this.raftColor = Colors.raft;

  // Initialize the character.
  init();

  /**
   * Builds the character in depth-first order. The parts of are
   * modelled by the following object hierarchy:
   
   *
   * Also set up the starting values for evolving parameters throughout
   * the game.
   *
   */
  function init() {
    // Build the character.
    self.face = createBox(100, 100, 20, self.skinColor, 0, 0, 0);
    self.hair = createBox(105, 20, 25, self.hairColor, 0, 50, 0);
    self.head = createGroup(0, 220, -25);
    self.head.add(self.face);
    self.head.add(self.hair);

    self.torso = createBox(150, 190, -10, self.shirtColor, 0, 100, 0);

    self.leftLowerArm = createLimb(20, 120, -20, self.skinColor, 0, -170, 0);
    self.leftArm = createLimb(30, 140, -10, self.skinColor, -100, 190, -10);
    self.leftArm.add(self.leftLowerArm);

    self.rightLowerArm = createLimb(20, 120, -20, self.skinColor, 0, -170, 0);
    self.rightArm = createLimb(30, 140, -10, self.skinColor, 100, 190, -10);
    self.rightArm.add(self.rightLowerArm);

    self.raft = createLimb(300, 100, 350, self.raftColor, 0, 200, 0);

    self.element = createGroup(0, 0, -4000);
    self.element.add(self.head);
    self.element.add(self.torso);
    self.element.add(self.leftArm);
    self.element.add(self.rightArm);
    self.element.add(self.raft);

    // Initialize the player's changing parameters.
    self.isSwitchingLeft = false;
    self.isSwitchingRight = false;
    self.currentLane = 0;
    self.runningStartTime = new Date() / 1000;
    self.pauseStartTime = new Date() / 1000;
    self.stepFreq = 2;
    self.queuedActions = [];
  }

  /**
   * Creates and returns a limb with an axis of rotation at the top.
   *
   * @param {number} DX The width of the limb.
   * @param {number} DY The length of the limb.
   * @param {number} DZ The depth of the limb.
   * @param {color} COLOR The color of the limb.
   * @param {number} X The x-coordinate of the rotation center.
   * @param {number} Y The y-coordinate of the rotation center.
   * @param {number} Z The z-coordinate of the rotation center.
   * @return {THREE.GROUP} A group that includes a box representing
   *                       the limb, with the specified properties.
   *
   */
  function createLimb(dx, dy, dz, color, x, y, z) {
    var limb = createGroup(x, y, z);
    var offset = -1 * (Math.max(dx, dz) / 2 + dy / 2);
    var limbBox = createBox(dx, dy, dz, color, 0, offset, 0);
    limb.add(limbBox);
    return limb;
  }

  /**
   * A method called on the character when time moves forward.
   */
  this.update = function () {
    // Obtain the curren time for future calculations.
    var currentTime = new Date() / 1000;

    // Apply actions to the character if none are currently being
    // carried out.
    if (
      !self.isSwitchingLeft &&
      !self.isSwitchingRight &&
      self.queuedActions.length > 0
    ) {
      switch (self.queuedActions.shift()) {
        case "left":
          if (self.currentLane != -1) {
            self.isSwitchingLeft = true;
          }
          break;
        case "right":
          if (self.currentLane != 1) {
            self.isSwitchingRight = true;
          }
          break;
      }
    }

    // code for connecting the game to the sensor
    var frames = {
      socket: null,
    
      start: function() {
        var url = "ws://" + host + "/frames";
        // var url = "ws://" + host + "/depth";      
        // var url = "ws://" + host + "/twod";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
          var command = frames.get_right_hand_tip_coordinates(JSON.parse(event.data));
          if (command !== null) {
            collision_detector(command);
          }
        }
      },
      
      get_left_hand_tip_coordinates: function (frame) {
        var command = null;
        if (frame.people.length < 1) {
          return command;
        }
    
        var left_hand_tip_x = frame.people[0].joints[9].position.x - pelvis_x;
        var left_hand_tip_y = frame.people[0].joints[9].position.y - pelvis_y;
        var left_hand_tip_z = frame.people[0].joints[9].position.z - pelvis_z;
    
        command = [left_hand_tip_x, left_hand_tip_y]
    
        cursor_x = command[0] * (1920/1280)
        cursor_y = command[1] * (1080/720)
    
        return command
      },
    
      get_right_hand_tip_coordinates: function (frame) {
        var command = null;
        if (frame.people.length < 1) {
          return command;
        }
    
        var right_hand_tip_x = frame.people[0].joints[9].position.x;
        var right_hand_tip_y = frame.people[0].joints[9].position.y;
        var right_hand_tip_z = frame.people[0].joints[9].position.z;
    
        command = [right_hand_tip_x, right_hand_tip_y]
    
        cursor_x = command[0] * (1920/1280)
        cursor_y = command[1] * (1080/720)
    
        return command
      },
    
      left_hand_tip_relative: function (frame) {
        var command = null;
        if (frame.people.length < 1) {
          return command;
        }
    
        // Normalize by subtracting the root (pelvis) joint coordinates
        var pelvis_x = frame.people[0].joints[0].position.x;
        var pelvis_y = frame.people[0].joints[0].position.y;
        var pelvis_z = frame.people[0].joints[0].position.z;
        var left_hand_tip_x = (frame.people[0].joints[9].position.x - pelvis_x) * -1;
        var left_hand_tip_y = (frame.people[0].joints[9].position.y - pelvis_y) * -1;
        var left_hand_tip_z = (frame.people[0].joints[9].position.z - pelvis_z) * -1;
    
        if (left_hand_tip_z < 100) {
          return command;
        }
    
        if (left_hand_tip_x < 200 && left_hand_tip_x > -200) {
          if (left_hand_tip_y > 500) {
            command = 73; // UP
          } else if (left_hand_tip_y < 100) {
            command = 75; // DOWN
          }
        } else if (left_hand_tip_y < 500 && left_hand_tip_y > 100) {
          if (left_hand_tip_x > 200) {
            command = 76; // RIGHT
          } else if (left_hand_tip_x < -200) {
            command = 74; // LEFT
          }
        }
        return command;
      },
    
      right_hand_tip_relative: function (frame) {
        var command = null;
        if (frame.people.length < 1) {
          return command;
        }
    
        // Normalize by subtracting the root (pelvis) joint coordinates
        var pelvis_x = frame.people[0].joints[0].position.x;
        var pelvis_y = frame.people[0].joints[0].position.y;
        var pelvis_z = frame.people[0].joints[0].position.z;
        var right_hand_tip_x = (frame.people[0].joints[9].position.x - pelvis_x) * -1;
        var right_hand_tip_y = (frame.people[0].joints[9].position.y - pelvis_y) * -1;
        var right_hand_tip_z = (frame.people[0].joints[9].position.z - pelvis_z) * -1;
    
        if (right_hand_tip_z < 100) {
          return command;
        }
    
        if (right_hand_tip_x < 200 && right_hand_tip_x > -200) {
          if (right_hand_tip_y > 500) {
            command = 73; // UP
          } else if (right_hand_tip_y < 100) {
            command = 75; // DOWN
          }
        } else if (right_hand_tip_y < 500 && right_hand_tip_y > 100) {
          if (right_hand_tip_x > 200) {
            command = 76; // RIGHT
          } else if (right_hand_tip_x < -200) {
            command = 74; // LEFT
          }
        }
        return command;
      }
    };


    // If the character is jumping, update the height of the character.
    // Otherwise, the character continues running.
    var runningClock = currentTime - self.runningStartTime;
    self.element.position.y = sinusoid(
      2 * self.stepFreq,
      0,
      20,
      0,
      runningClock
    );
    self.head.rotation.x =
      sinusoid(2 * self.stepFreq, -10, -5, 0, runningClock) * deg2Rad;
    self.torso.rotation.x =
      sinusoid(2 * self.stepFreq, -10, -5, 180, runningClock) * deg2Rad;
    self.leftArm.rotation.x =
      sinusoid(self.stepFreq, -70, 50, 180, runningClock) * deg2Rad;
    self.rightArm.rotation.x =
      sinusoid(self.stepFreq, -70, 50, 0, runningClock) * deg2Rad;
    self.leftLowerArm.rotation.x =
      sinusoid(self.stepFreq, 70, 140, 180, runningClock) * deg2Rad;
    self.rightLowerArm.rotation.x =
      sinusoid(self.stepFreq, 70, 140, 0, runningClock) * deg2Rad;

    // If the character is not jumping, it may be switching lanes.
    if (self.isSwitchingLeft) {
      self.element.position.x -= 200;
      var offset = self.currentLane * 800 - self.element.position.x;
      if (offset > 800) {
        self.currentLane -= 1;
        self.element.position.x = self.currentLane * 800;
        self.isSwitchingLeft = false;
      }
    }
    if (self.isSwitchingRight) {
      self.element.position.x += 200;
      var offset = self.element.position.x - self.currentLane * 800;
      if (offset > 800) {
        self.currentLane += 1;
        self.element.position.x = self.currentLane * 800;
        self.isSwitchingRight = false;
      }
    }
  };

  /**
   * Handles character activity when the left key is pressed.
   */
  this.onLeftKeyPressed = function () {
    self.queuedActions.push("left");
  };

  /**
   * Handles character activity when the right key is pressed.
   */
  this.onRightKeyPressed = function () {
    self.queuedActions.push("right");
  };

  /**
   * Handles character activity when the game is paused.
   */
  this.onPause = function () {
    self.pauseStartTime = new Date() / 1000;
  };

  /**
   * Handles character activity when the game is unpaused.
   */
  this.onUnpause = function () {
    var currentTime = new Date() / 1000;
    var pauseDuration = currentTime - self.pauseStartTime;
    self.runningStartTime += pauseDuration;
    if (self.isJumping) {
      self.jumpStartTime += pauseDuration;
    }
  };
}

/**
 * A collidable tree (log in my case) in the game positioned at X, Y, Z in the scene and with
 * scale S.
 */
function Tree(x, y, z, s) {
  // Explicit binding.
  var self = this;

  // The object portrayed in the scene.
  this.mesh = new THREE.Object3D();
  var trunk = createCylinder(300, 300, 1250, 32, Colors.log, 0, 125, 0);
  this.mesh.add(trunk);
  this.mesh.position.set(x, y, z);
  this.mesh.scale.set(s, s, s);
  this.scale = s;

  /**
   * A method that detects whether this tree is colliding with the character,
   * which is modelled as a box bounded by the given coordinate space.
   */
  this.collides = function (minX, maxX, minY, maxY, minZ, maxZ) {
    var treeMinX = self.mesh.position.x - this.scale * 250;
    var treeMaxX = self.mesh.position.x + this.scale * 250;
    var treeMinY = self.mesh.position.y;
    var treeMaxY = self.mesh.position.y + this.scale * 1150;
    var treeMinZ = self.mesh.position.z - this.scale * 250;
    var treeMaxZ = self.mesh.position.z + this.scale * 250;
    return (
      treeMinX <= maxX &&
      treeMaxX >= minX &&
      treeMinY <= maxY &&
      treeMaxY >= minY &&
      treeMinZ <= maxZ &&
      treeMaxZ >= minZ
    );
  };
}

/**
 *
 * UTILITY FUNCTIONS
 *
 * Functions that simplify and minimize repeated code.
 *
 */

/**
 * Utility function for generating current values of sinusoidally
 * varying variables.
 *
 * @param {number} FREQUENCY The number of oscillations per second.
 * @param {number} MINIMUM The minimum value of the sinusoid.
 * @param {number} MAXIMUM The maximum value of the sinusoid.
 * @param {number} PHASE The phase offset in degrees.
 * @param {number} TIME The time, in seconds, in the sinusoid's scope.
 * @return {number} The value of the sinusoid.
 *
 */
function sinusoid(frequency, minimum, maximum, phase, time) {
  var amplitude = 0.5 * (maximum - minimum);
  var angularFrequency = 2 * Math.PI * frequency;
  var phaseRadians = (phase * Math.PI) / 180;
  var offset = amplitude * Math.sin(angularFrequency * time + phaseRadians);
  var average = (minimum + maximum) / 2;
  return average + offset;
}

/**
 * Creates an empty group of objects at a specified location.
 *
 * @param {number} X The x-coordinate of the group.
 * @param {number} Y The y-coordinate of the group.
 * @param {number} Z The z-coordinate of the group.
 * @return {Three.Group} An empty group at the specified coordinates.
 *
 */
function createGroup(x, y, z) {
  var group = new THREE.Group();
  group.position.set(x, y, z);
  return group;
}

/**
 * Creates and returns a simple box with the specified properties.
 *
 * @param {number} DX The width of the box.
 * @param {number} DY The height of the box.
 * @param {number} DZ The depth of the box.
 * @param {color} COLOR The color of the box.
 * @param {number} X The x-coordinate of the center of the box.
 * @param {number} Y The y-coordinate of the center of the box.
 * @param {number} Z The z-coordinate of the center of the box.
 * @param {boolean} NOTFLATSHADING True iff the flatShading is false.
 * @return {THREE.Mesh} A box with the specified properties.
 *
 */
function createBox(dx, dy, dz, color, x, y, z, notFlatShading) {
  var geom = new THREE.BoxGeometry(dx, dy, dz);
  var mat = new THREE.MeshPhongMaterial({
    color: color,
    flatShading: notFlatShading != true,
  });
  var box = new THREE.Mesh(geom, mat);
  box.castShadow = true;
  box.receiveShadow = true;
  box.position.set(x, y, z);
  return box;
}

/**
 * Creates and returns a (possibly asymmetrical) cyinder with the
 * specified properties.
 *
 * @param {number} RADIUSTOP The radius of the cylinder at the top.
 * @param {number} RADIUSBOTTOM The radius of the cylinder at the bottom.
 * @param {number} HEIGHT The height of the cylinder.
 * @param {number} RADIALSEGMENTS The number of segmented faces around
 *                                the circumference of the cylinder.
 * @param {color} COLOR The color of the cylinder.
 * @param {number} X The x-coordinate of the center of the cylinder.
 * @param {number} Y The y-coordinate of the center of the cylinder.
 * @param {number} Z The z-coordinate of the center of the cylinder.
 * @return {THREE.Mesh} A box with the specified properties.
 */
function createCylinder(
  radiusTop,
  radiusBottom,
  height,
  radialSegments,
  color,
  x,
  y,
  z
) {
  var geom = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments
  );
  var mat = new THREE.MeshPhongMaterial({
    color: color,
    flatShading: true,
  });
  var cylinder = new THREE.Mesh(geom, mat);
  cylinder.castShadow = true;
  cylinder.receiveShadow = true;
  cylinder.position.set(x, y, z);
  return cylinder;
}
