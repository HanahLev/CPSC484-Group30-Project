//##########################################################################################################//
//                                                KINTECT                                                   //
//##########################################################################################################//

var host = "cpsc484-03.yale.internal:8888";
$(document).ready(function() {
  frames.start();
  // twod.start();
});

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    // var url = "ws://" + host + "/depth";      
    // var url = "ws://" + host + "/twod";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      var command = frames.get_left_hand_tip_coordinates(JSON.parse(event.data));
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

//##########################################################################################################//
//                                               CURSOR EVENTS                                              //
//##########################################################################################################//

function collision_detector(command) {
  var collision = false;

  const nodeList = document.querySelectorAll("button");

  for (let i = 0; i < nodeList.length; i++){
    var top_left = $(nodeList[i]).position();
    var width = $(nodeList[i]).width();
    var height = $(nodeList[i]).height();

    var bottom = top_left.top + height;
    var right = top_left.left + width;

    var cursor_x = command[0] * (1920/1280)
    var cursor_y = command[1] * (1080/720)

    if ((cursor_y > top_left.top) && (cursor_y < bottom) && (cursor_x > top_left.left) && (cursor_x < right)){
      collision = true;
      break;
    }
  }

  if (collision){
    var myurl = b.dataset.url;

    redirect(myurl);
  }
  else{
    cancel_redirect();
  }
}

//##########################################################################################################//
//                                               REDIRECTS                                                  //
//##########################################################################################################//

var timeout_var;

// REDIRECTS
function redirect(myurl) {
  timeout_var = setTimeout(function (){myURL(myurl)}, 3000);
}

function redirect_load(myurl) {
  setTimeout(function (){myURL(myurl)}, 300000);
}

// URLs
function myURL(myurl) {
  document.location.href = myurl;
}

// CANCEL REDIRECT
function cancel_redirect() {
  clearTimeout(timeout_var);
}

