var host = "localhost:4444";
$(document).ready(function() {
  frames.start();
  twod.start();
});

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
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

  get_right_hand_tip_coordinates: function (frame) {
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

