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
        sendWristCommand(command);
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

    command = [left_hand_tip_x, left_hand_tip_y]
    return command
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

    command = [right_hand_tip_x, right_hand_tip_y]
    return command
  }
};

//##########################################################################################################//
//                                               REDIRECTS                                                  //
//##########################################################################################################//

timeout_var

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
  clearTimeout(timeout_var)
}

