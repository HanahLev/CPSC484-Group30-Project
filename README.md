# CPSC484-Group30-Project
Semester-long project for HCI course - Group 30

## Group Members and NetIDs:
Hanah Leventhal – hal38

Harry Shindika – has58

Jacob Feit Mann – jjf77

## System & Tasks

#### A textual description of the system: 

The system is a video game consisting of two teams that allows Yale students to compete with each other. Each player will choose between the red or blue team, and a turn-based game begins, with each side playing offense and defense to try and win the game after several rounds. Each user will play an offensive and defensive move, scoring points for their team in the offensive game and protecting themselves in the defensive games. Each mini game should require the user to move around to accomplish the goals of the game.

#### The two tasks that the system addresses: 

- Interaction with Yale peers
    - The game allows Yale students to interact with other Yale students when they compete with each other on opposite teams or in the same team. Players can play with their friends, and even strangers if they run into each other
- Taking a break (without the pressure of planning one)
    - Players can take two minutes on their route, even on a whim to play. The interactive game also allows students to have fun and release stress
- Get up and move around
    - The main actions in the game require the players to complete “attacks” which require the player to move, jump, dodge, etc.

#### Key implementation components:

- Tracking hand movement
    - Involves user movement
- Calculating team scores across different users
    - Allows users to connect with one another and ‘compete’
- Mini Games for different user actions (attacking/defending)
    - More involved user movement
    - Gamification stimulates fun
- Fun UI to engage the user
    - Interesting UI makes user’s experience whimsical


## GitHub Repo Link
https://github.com/HanahLev/CPSC484-Group30-Project

## Dependancies
#### P5.js
- In the header under the stylesheet tag, add a script with the following source
    - https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js
#### jQuery
- Download the compressed jQuery file from code.jquery.com and save it in your local directory containing your HTML files
- In the header under the stylesheet tag, add a script with the following source
    - https://code.jquery.com/jquery-3.6.0.min.js
#### Three.js
- No installation required as long as three.min.js file is present


## Collaboration Record

#### Hanah Leventhal – hal38:
#### Contribution:
Non-technical contributions involve organizing and rallying the group. I assigned everyone tasks, set up all work sessions, and kept tabs on our to-do items to make sure they were getting done. When communication was low, I prompted responses from our group members to ensure we were all on the same page. Finally, I made sure everyone was aware of the Tuesday testing slot and assignment due date/time.

On the technical side of things, I focussed mainly on the CSS and JS of the overall application (minus the individual games). I revamped the CSS for all pages in order for it to look more like the Figma design, and added important instructional text. I then reworked the JS redirect functions to use hover with delayed mouse input, and eventually Kinect data. I finished writing and calibrating the Kinect data parsing functions, as well as the functions meant to use the connect data to detect button selection (overlap of coordinates). I was also responsible for creating and debugging the cursor functions. Finally, I created the google survey and updated the results pages with a QR code to allow for score submissions for our scoreboards.

#### Harry Shindika – has58:
#### Contribution: 
Raft Rush game

Figuring out how to connect to the server to get live data

Redirect score values from game to the results pages

#### Jacob Feit Mann – jjf77:
#### Contribution: 
Researched libraries and strategies for us to employ in the making of the prototype. I helped with my groupmates’ questions. I spent the vast majority of my time (roughly 17 hours) on implementing an asteroid-destroying game, which quite unfortunately was left on the cutting room floor.

