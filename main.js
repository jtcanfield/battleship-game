$("#computer_player_avatar").hide(0);
$("#bullet_animation").hide(0);
let boatsDown = 0;
let playerShotsPerTurn = 1;
let computerShotsPerTurn = 1;
let computerFoundPlayerShip = false;
let enemyShipsDestroyed = 0;
let playerShipsDestroyed = 0;
let turns = 0;
let detectDirection = "";
let timesHitInDirection = 0;
let timesAttemptInDirection = 0;
function main() {
}
$(document).ready(main);
$(document).ready(function() {
//START GAME BUTTON FUNCTIONS
  animateAvatarStart("#computer_player_avatar");
  $("#start_game_oneshotperturn").click(function() {
    if (boatsDown !== 5){
      // if (boatsDown > 6){
      start_game_announcements.innerHTML = "Please Place all boats before starting!"
    } else {
      playerShotsPerTurn = 1;
      computerShotsPerTurn = 1;
      $("#pregame_box").hide(1000);
      computerPlaceShips();
    }
  });
  $("#start_game_fiveshots").click(function() {
    if (boatsDown !== 5){
      start_game_announcements.innerHTML = "Please Place all boats before starting!"
    } else {
      start_game_announcements.innerHTML = "This Option is not avaiable yet. Please start a One Shot Game!"
      playerShotsPerTurn = 5;
      computerShotsPerTurn = 5;
      $("#pregame_box").hide(1000);
      computerPlaceShips();
    }
  });
});
//END START GAME FUNCTIONS
//PLAYER ROTATE SHIP SCRIPTS
let direction = 0;
$('html').on('keydown',function(e){
  if(e.which==82){
    if(direction === 0){
    direction = 1;
    let rotateShipsClass = document.querySelectorAll("#player_boatholder > div");
    for (let i = 0; i < 5; i++){
      let rotateShips = $(rotateShipsClass[i]).attr("class");
      let newHeight = $("."+rotateShips).css("width");
      let newWidth = $("."+rotateShips).css("height");
      $("."+rotateShips).css("height", newHeight);
      $("."+rotateShips).css("width", newWidth);
      $("."+rotateShips).css("background", "linear-gradient(to bottom, red 30px, red 30px, black 30px, black 50%,  black 100%)");
    }
    } else {
    direction = 0;
    let rotateShipsClass = document.querySelectorAll("#player_boatholder > div");
    for (let i = 0; i < 5; i++){
      let rotateShips = $(rotateShipsClass[i]).attr("class");
      let newHeight = $("."+rotateShips).css("width");
      let newWidth = $("."+rotateShips).css("height");
      $("."+rotateShips).css("height", newHeight);
      $("."+rotateShips).css("width", newWidth);
      $("."+rotateShips).css("background", "linear-gradient(to right, red 30px, red 30px, black 30px, black 50%,  black 100%)");
    }
    }
  }
});
//END ROTATE SHIP SCRIPTS
//PLAYER DRAG AND DROP SCRIPT
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
  announcements.innerHTML = "Place your Ships!";
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if ($(ev.target).hasClass("label") || $(ev.target).hasClass("player_pieces")){
      announcements.innerHTML = "Invalid spot!";
    } else if (data === "player_aircraft_carrier"){
      moveItems(5, direction);
      boatsDown += 1;
      $("#player_aircraft_carrier").toggle();
    } else if (data === "player_battleship"){
      moveItems(4, direction);
      boatsDown += 1;
      $("#player_battleship").toggle();
    } else if (data === "player_destroyer"){
      moveItems(3, direction);
      boatsDown += 1;
      $("#player_destroyer").toggle();
    } else if (data === "player_submarine"){
      moveItems(3, direction);
      boatsDown += 1;
      $("#player_submarine").toggle();
    } else if (data === "player_ptboat"){
      moveItems(2, direction);
      boatsDown += 1;
      $("#player_ptboat").toggle();
    }
  function moveItems(repeat, vertical){
    //VERTICAL PLAYER
    if (vertical === 1){
      let isActionLegal = 1;
      let theTarget = ev.target;
      //VERTICAL PLAYER UNDEFINED DETECTION
        if (isActionLegal === 1){
          for (let i = 0; i < repeat-1; i++){
            let rowIndexing = $(theTarget).prevUntil(".label").length;
            let findNextRow = $(theTarget).parent().next();
            if (findNextRow[0] === undefined){
                announcements.innerHTML = "Your ship would be off the board!";
                $("#"+data).toggle();
                isActionLegal = 0;
                boatsDown -= 1;
                break;
            }
            theTarget = $(findNextRow[0].childNodes[rowIndexing+1])[0];
          }
        }
        //VERTICAL PLAYER OTEHR PIECE DETECTION
        if (isActionLegal === 1){
          let theTarget = ev.target;
          for (let i = 0; i < repeat-1; i++){
            let rowIndexing = $(theTarget).prevUntil(".label").length;
            let findNextRow = $(theTarget).parent().next();
            theTarget = $(findNextRow[0].childNodes[rowIndexing+1])[0];
            if ($(theTarget).hasClass("player_pieces")){
                announcements.innerHTML = "Your ship would collide with other ships!";
                isActionLegal = 0;
                $("#"+data).toggle();
                boatsDown -= 1;
                break;
            }
          }
        }
        //VERTICAL PLAYER PLACING
        if (isActionLegal === 1){
          let theTarget = ev.target;
          for (let i = 0; i < repeat; i++){
            let rowIndexing = $(theTarget).prevUntil(".label").length;
            let findNextRow = $(theTarget).parent().next();
            $(theTarget).toggleClass("player_pieces");
            $(theTarget).attr("id", data + "_piece"+(i+1));
            if (findNextRow[0] === undefined){
                break;
            }
            theTarget = $(findNextRow[0].childNodes[rowIndexing+1])[0];
          }
        }
      } else {
        //HORIZONTAL PLAYER
      if ($(ev.target).nextUntil(".player_pieces").length+1 < repeat){
        announcements.innerHTML = "Your ship would collide with other ships!";
        boatsDown -= 1;
        $("#"+data).toggle();
      } else {
        for (let i = 0; i < repeat; i++){
          if (i === 0){
          $(ev.target).toggleClass("player_pieces");
          $(ev.target).attr("id", data + "_piece1");
          } else if (i > 0){
            let toTheRight = $(ev.target).nextUntil();
          $(toTheRight[i-1]).addClass("player_pieces");
          $(toTheRight[i-1]).attr("id", data + "_piece"+(i+1));
          }
        }
      }
    }
  }
}
$("#reset_player_boats").click(function () {
  $("#player_battleship_board >table> tbody>tr>td").removeClass("player_pieces");
  $("#player_battleship_board >table> tbody>tr>td").removeAttr("id");
  $("#player_aircraft_carrier").show();
  $("#player_battleship").show();
  $("#player_destroyer").show();
  $("#player_submarine").show();
  $("#player_ptboat").show();
  announcements.innerHTML = "Place your Ships!";
  boatsDown += 0;
});
//END DRAG AND DROP SCRIPTS
//START COMPUTER PLACING
function computerPlaceShips(){
  let computerShips = ["computer_aircraft_carrier", "computer_battleship", "computer_destroyer", "computer_submarine", "computer_ptboat"];
  let computerShipsSize = [5, 4, 3, 3, 2];
  for (let i = 0; i < 5; i++){
    let setDirectionofRandom = Math.random();
    if (setDirectionofRandom <=0.5) {
      placeBoat(0, computerShips[i], computerShipsSize[i]);
    } else {
      placeBoat(1, computerShips[i], computerShipsSize[i]);
    }
    function placeBoat(v, typeOfShip, lengthOfShips){
      let maxHorizPosition = 11-lengthOfShips;
      let maxVertPosition = 10-lengthOfShips;
      if (v === 0){
        //HORIZONTAL
        let verticalPosition = Math.floor(Math.random()*(10-1+1)+1);
        let horizontalPosition = Math.floor(Math.random()*(maxHorizPosition-2+1)+2);
        let selectedPiece = $("#computer_battleship_board tr:nth-child("+verticalPosition+") td:nth-child("+horizontalPosition+")");
        let selectedPieceForDetection = $("#computer_battleship_board tr:nth-child("+verticalPosition+") td:nth-child("+horizontalPosition+")");
        let actionLegal = 1;
        //HORIZONTAL DETECTION
        if ($(selectedPieceForDetection).hasClass("computer_pieces")){
          actionLegal = 0;
        }
        for (let d = 0; d < lengthOfShips; d++){
          if ($(selectedPieceForDetection).nextUntil(".computer_pieces").length+1 < lengthOfShips){
            actionLegal = 0;
          } else {
            selectedPieceForDetection = $(selectedPieceForDetection).nextUntil()[0];
          }
        }
        //HORIZONTAL PLACING
        if (actionLegal === 1){
          for (let r = 0; r < lengthOfShips; r++){
            $(selectedPiece).addClass("computer_pieces");
            $(selectedPiece).attr("id", typeOfShip + "_piece"+(r+1));
            selectedPiece = $(selectedPiece).nextUntil()[0];
          }
        } else if (actionLegal === 0){
          i -= 1;
        }
      } else {
        //VERTICAL
        let actionLegal = 1;
        let verticalPosition = Math.floor(Math.random()*(maxVertPosition-1+1)+1);
        let horizontalPosition = Math.floor(Math.random()*(11-2+1)+2);
        let selectedPiece = $("#computer_battleship_board tr:nth-child("+verticalPosition+") td:nth-child("+horizontalPosition+")");
        let selectedPieceForDetection = $("#computer_battleship_board tr:nth-child("+verticalPosition+") td:nth-child("+horizontalPosition+")");
        //VERTICAL DETECTION
        for (let z = 0; z < lengthOfShips; z++){
          if ($(selectedPieceForDetection).hasClass("computer_pieces")){
              actionLegal = 0;
          } else {
          let rowIndexing = $(selectedPieceForDetection).prevUntil(".label").length;
          let findNextRow = $(selectedPieceForDetection).parent().next();
          selectedPieceForDetection = $(findNextRow[0].childNodes[rowIndexing+1])[0];
          }
        }
        //VERTICAL PLACING
        if (actionLegal === 1){
          for (let r = 0; r < lengthOfShips; r++){
            $(selectedPiece).addClass("computer_pieces");
            $(selectedPiece).attr("id", typeOfShip + "_piece"+(r+1));
            let rowIndexing = $(selectedPiece).prevUntil(".label").length;
            let findNextRow = $(selectedPiece).parent().next();
            if (findNextRow[0] === undefined){
                break;
            }
            selectedPiece = $(findNextRow[0].childNodes[rowIndexing+1])[0];
          }
        } else if (actionLegal === 0){
          i -= 1;
        }
      }
    }
  }
  beginGame(1);
}
//END COMPUTER PLACING
//BEGIN TURN DETECTION
function beginGame(whosTurnIsIt){
  //BEGIN DESTRUCTION DETECTION
  let computerShipsOnBoard = ["computer_aircraft_carrier_piece", "computer_battleship_piece", "computer_destroyer_piece", "computer_submarine_piece", "computer_ptboat_piece",];
  let computerShipsOnBoardLengths = [5, 4, 3, 3, 2,];
  for (let i = 0; i < 5; i++){
    let currentShipCheck = computerShipsOnBoard[i];
    let shipCheckLength = computerShipsOnBoardLengths[i];
    let l = 1
    let totalHitsOnShip = 0;
    while (l < shipCheckLength+1){
      if ($("#"+currentShipCheck+l).hasClass("hit_on_computer")){
        totalHitsOnShip = totalHitsOnShip + 1;
        if (totalHitsOnShip === computerShipsOnBoardLengths[i]){
          $("#computer_player_avatar").removeClass();
          $("#computer_player_avatar").addClass("avatar_omg");
          enemyShipsDestroyed = enemyShipsDestroyed + 1;
          for (let b = 0; b < 6; b++){
          $("#"+currentShipCheck+b).addClass("player_ship_destroyed");
          $("#"+currentShipCheck+b).removeClass("hit_on_computer");
          }
        }
      }
      l++
    }
  }
  if ($("#player_aircraft_carrier_piece1").hasClass("hit_on_player") && $("#player_aircraft_carrier_piece2").hasClass("hit_on_player") && $("#player_aircraft_carrier_piece3").hasClass("hit_on_player") && $("#player_aircraft_carrier_piece4").hasClass("hit_on_player") && $("#player_aircraft_carrier_piece5").hasClass("hit_on_player")){
    computerFoundPlayerShip = false;
    playerShipsDestroyed = playerShipsDestroyed + 1;
    for (let i = 0; i < 6; i++){
      $("#player_aircraft_carrier_piece"+i).removeClass("hit_on_player");
      $("#player_aircraft_carrier_piece"+i).addClass("player_ship_destroyed");
      $("#computer_player_avatar").removeClass();
      $("#computer_player_avatar").addClass("avatar_devil");
      detectDirection = "";
      timesHitInDirection = 0;
      player_ship_announcements.innerHTML = "Your Aircraft Carrier has been destroyed!";
    }
  }
  if ($("#player_battleship_piece1").hasClass("hit_on_player") && $("#player_battleship_piece2").hasClass("hit_on_player") && $("#player_battleship_piece3").hasClass("hit_on_player") && $("#player_battleship_piece4").hasClass("hit_on_player")){
    computerFoundPlayerShip = false;
    playerShipsDestroyed = playerShipsDestroyed + 1;
    for (let i = 0; i < 5; i++){
      $("#player_battleship_piece"+i).removeClass("hit_on_player");
      $("#player_battleship_piece"+i).addClass("player_ship_destroyed");
      $("#computer_player_avatar").removeClass();
      $("#computer_player_avatar").addClass("avatar_devil");
      detectDirection = "";
      timesHitInDirection = 0;
      player_ship_announcements.innerHTML = "Your Battleship has been destroyed!";
    }
  }
  if ($("#player_destroyer_piece1").hasClass("hit_on_player") && $("#player_destroyer_piece2").hasClass("hit_on_player") && $("#player_destroyer_piece3").hasClass("hit_on_player")){
    computerFoundPlayerShip = false;
    playerShipsDestroyed = playerShipsDestroyed + 1;
    for (let i = 0; i < 4; i++){
      $("#player_destroyer_piece"+i).removeClass("hit_on_player");
      $("#player_destroyer_piece"+i).addClass("player_ship_destroyed");
      $("#computer_player_avatar").removeClass();
      $("#computer_player_avatar").addClass("avatar_devil");
      detectDirection = "";
      timesHitInDirection = 0;
      player_ship_announcements.innerHTML = "Your Destroyer has been destroyed!";
    }
  }
  if ($("#player_submarine_piece1").hasClass("hit_on_player") && $("#player_submarine_piece2").hasClass("hit_on_player") && $("#player_submarine_piece3").hasClass("hit_on_player")){
    computerFoundPlayerShip = false;
    playerShipsDestroyed = playerShipsDestroyed + 1;
    for (let i = 0; i < 4; i++){
      $("#player_submarine_piece"+i).removeClass("hit_on_player");
      $("#player_submarine_piece"+i).addClass("player_ship_destroyed");
      $("#computer_player_avatar").removeClass();
      $("#computer_player_avatar").addClass("avatar_devil");
      detectDirection = "";
      timesHitInDirection = 0;
      player_ship_announcements.innerHTML = "Your Submarine has been destroyed!";
    }
  }
  if ($("#player_ptboat_piece1").hasClass("hit_on_player") && $("#player_ptboat_piece2").hasClass("hit_on_player")){
    computerFoundPlayerShip = false;
    playerShipsDestroyed = playerShipsDestroyed + 1;
    for (let i = 0; i < 3; i++){
      $("#player_ptboat_piece"+i).removeClass("hit_on_player");
      $("#player_ptboat_piece"+i).addClass("player_ship_destroyed");
      $("#computer_player_avatar").removeClass();
      $("#computer_player_avatar").addClass("avatar_devil");
      detectDirection = "";
      timesHitInDirection = 0;
      player_ship_announcements.innerHTML = "Your PT Boat has been destroyed!";
    }
  }
  if ($("#player_aircraft_carrier_piece1").hasClass("hit_on_player") || $("#player_aircraft_carrier_piece2").hasClass("hit_on_player") || $("#player_aircraft_carrier_piece3").hasClass("hit_on_player") || $("#player_aircraft_carrier_piece4").hasClass("hit_on_player") || $("#player_aircraft_carrier_piece5").hasClass("hit_on_player")){
    computerFoundPlayerShip = true;
    player_ship_announcements.innerHTML = "Your Aircraft Carrier is under attack!";
  }
  if ($("#player_battleship_piece1").hasClass("hit_on_player") || $("#player_battleship_piece2").hasClass("hit_on_player") || $("#player_battleship_piece3").hasClass("hit_on_player") || $("#player_battleship_piece4").hasClass("hit_on_player")){
    computerFoundPlayerShip = true;
    player_ship_announcements.innerHTML = "Your Battleship is under attack!";
  }
  if ($("#player_destroyer_piece1").hasClass("hit_on_player") || $("#player_destroyer_piece2").hasClass("hit_on_player") || $("#player_destroyer_piece3").hasClass("hit_on_player")){
    computerFoundPlayerShip = true;
    player_ship_announcements.innerHTML = "Your destroyer is under attack!";
  }
  if ($("#player_submarine_piece1").hasClass("hit_on_player") || $("#player_submarine_piece2").hasClass("hit_on_player") || $("#player_submarine_piece3").hasClass("hit_on_player")){
    computerFoundPlayerShip = true;
    player_ship_announcements.innerHTML = "Your Submarine is under attack!";
  }
  if ($("#player_ptboat_piece1").hasClass("hit_on_player") || $("#player_ptboat_piece2").hasClass("hit_on_player")){
    computerFoundPlayerShip = true;
    player_ship_announcements.innerHTML = "Your PT Boat is under attack!";
  }
  //END DESTRUCTION DETECTION
  //BEGIN VICTORY CONDITION DETECTION
  computer_ship_announcements.innerHTML = "Enemy Ships Destroyed: " + enemyShipsDestroyed + "<br>Turns Taken: " + turns;
  if (enemyShipsDestroyed >= 5){
    computer_ship_announcements.innerHTML = "YOU WON! <br>Turns Taken: " + turns;
    announcements.innerHTML = "YOU WON!";
    player_ship_announcements.innerHTML = "Turns Taken: " + turns;
    alert("YOU WIN THE GAME!");
    alert("You won the game in " + turns + " turns!");
    alert("Refresh to play again!");
    $("#computer_player_avatar").removeClass();
    $("#computer_player_avatar").addClass("avatar_cry");
    console.log(theGameBreakingVariableThatShallNeverBeDefined);
  }
  if (playerShipsDestroyed >= 5){
    computer_ship_announcements.innerHTML = "You lost.... <br>Turns Taken: " + turns;
    announcements.innerHTML = "You lost....";
    player_ship_announcements.innerHTML = "Turns Taken: " + turns;
    alert("You lost the game....");
    alert("You lost the game in " + turns + " turns....");
    alert("Refresh to play again!");
    $("#computer_player_avatar").removeClass();
    $("#computer_player_avatar").addClass("avatar_devil");
    console.log(theGameBreakingVariableThatShallNeverBeDefined);
  }
  //END VICTORY CONDITION DETECTION
  if (whosTurnIsIt === 1){
    announcements.innerHTML = "Your Turn! Click on the enemy's board";
    turns = turns + 1;
    playerTurnBegin();
    setTimeout(window.scrollTo(0, 0), 2000);
  } else {
  announcements.innerHTML = "Computer Is Thinking...";
  computerTurnBegin();
  }
}
//END TURN DETECTION
//BEGIN COMPUTER TURN HANDLER
function computerTurnBegin(){
  window.scrollTo(0, 500);
  //SPECIFIC COMPUTER RANDOMIZER
  //What if i turned this into a switch statement?
    if (computerFoundPlayerShip === true){
        let lastHitsMade = document.querySelectorAll(".hit_on_player");
        let lastHitArray = $(lastHitsMade).not(document.getElementsByClassName("player_ship_destroyed"));
        let lastHitLength = lastHitArray.length
        let lastHitSelector = Math.floor(Math.random()*(lastHitLength-0+1)+0);
        let lastHit = lastHitArray[lastHitSelector];
        let computerSpecificSelection = 0;
        if (detectDirection === "horizontal"){
          computerSpecificSelection = Math.floor(Math.random()*(2-1+1)+1);
          timesAttemptInDirection += 1;
          if (timesAttemptInDirection >= 50){
            detectDirection = "";
            beginGame();
            return
          }
        }
        if (detectDirection === "vertical"){
          computerSpecificSelection = Math.floor(Math.random()*(4-3+1)+3);
          timesAttemptInDirection += 1;
          if (timesAttemptInDirection >= 50){
            detectDirection = "";
            beginGame();
            return
          }
        } if (detectDirection === "") {
         computerSpecificSelection = Math.floor(Math.random()*(4-1+1)+1);
       } else {
         console.log("detectDirection STRING HAS RETURNED ELSE, PLEASE CHECK");
       }
      if (computerSpecificSelection === 1){
        let toTheRight = $(lastHit).next()[0]
        if (toTheRight === undefined){
          beginGame();
          return
        }
        if ($(toTheRight).hasClass("dont_touch_this")){
          beginGame();
          return
        } else if ($(toTheRight).hasClass("player_pieces")){
          // animateBullet($(toTheRight), false);
          $(toTheRight).addClass("dont_touch_this");
          $(toTheRight).addClass("hit_on_player");
          $("#computer_player_avatar").removeClass();
          $("#computer_player_avatar").addClass("avatar_normal");
          $(toTheRight).addClass("explosion_container").delay(1000).queue(function(next){
            $(toTheRight).removeClass("explosion_container");
            next();
          });
          timesHitInDirection += 1;
          if (timesHitInDirection >= 1){
            detectDirection = "horizontal";
          }
            beginGame(1);
        } else {
          // animateBullet($(toTheRight), false);
          $(toTheRight).addClass("dont_touch_this");
          $(toTheRight).addClass("miss_on_player");
            beginGame(1);
        }
      } else if (computerSpecificSelection === 2){
        let toTheLeft = $(lastHit).prev()[0]
        if (toTheLeft === undefined){
          beginGame();
          return
        } else if ($(toTheLeft).hasClass("dont_touch_this")){
          beginGame();
          return
        } else if ($(toTheLeft).hasClass("player_pieces")){
          // animateBullet($(toTheLeft), false);
          $(toTheLeft).addClass("dont_touch_this");
          $(toTheLeft).addClass("hit_on_player");
          $("#computer_player_avatar").removeClass();
          $("#computer_player_avatar").addClass("avatar_normal");
          $(toTheLeft).addClass("explosion_container").delay(1000).queue(function(next){
            $(toTheLeft).removeClass("explosion_container");
            next();
          });
          timesHitInDirection += 1;
          if (timesHitInDirection >= 1){
            detectDirection = "horizontal";
          }
          beginGame(1);
        } else {
          // animateBullet($(toTheLeft), false);
          $(toTheLeft).addClass("dont_touch_this");
          $(toTheLeft).addClass("miss_on_player");
          beginGame(1);
        }
      } else if (computerSpecificSelection === 3){
        let rowIndexing = $(lastHit).prevUntil(".label").length;
        let findNextRow = $(lastHit).parent().next();
        if (findNextRow[0] === undefined){
          beginGame();
          return
        }
        let toTheBottom = $(findNextRow[0].childNodes[rowIndexing+1])[0];
        if ($(toTheBottom).hasClass("dont_touch_this")){
          beginGame();
          return
        } else if ($(toTheBottom).hasClass("player_pieces")){
          // animateBullet($(toTheBottom), false);
          $(toTheBottom).addClass("dont_touch_this");
          $(toTheBottom).addClass("hit_on_player");
          $("#computer_player_avatar").removeClass();
          $("#computer_player_avatar").addClass("avatar_normal");
          $(toTheBottom).addClass("explosion_container").delay(1000).queue(function(next){
            $(toTheBottom).removeClass("explosion_container");
            next();
          });
          timesHitInDirection += 1;
          if (timesHitInDirection >= 1){
            detectDirection = "vertical";
          }
            beginGame(1);
        } else {
          // animateBullet($(toTheBottom), false);
          $(toTheBottom).addClass("dont_touch_this");
          $(toTheBottom).addClass("miss_on_player");
            beginGame(1);
        }
      } else if (computerSpecificSelection === 4){
        let rowIndexing = $(lastHit).prevUntil(".label").length;
        let findNextRow = $(lastHit).parent().prev();
        if (findNextRow[0] === undefined){
          beginGame();
          return
        }
        let toTheTop = $(findNextRow[0].childNodes[rowIndexing+1])[0];
        if ($(toTheTop).hasClass("dont_touch_this")){
          beginGame();
          return
        } else if ($(toTheTop).hasClass("player_pieces")){
          // animateBullet($(toTheTop), false);
          $("#computer_player_avatar").removeClass();
          $("#computer_player_avatar").addClass("avatar_normal");
          $(toTheTop).addClass("dont_touch_this");
          $(toTheTop).addClass("hit_on_player");
          $(toTheTop).addClass("explosion_container").delay(1000).queue(function(next){
            $(toTheTop).removeClass("explosion_container");
            next();
          });
          timesHitInDirection += 1;
          if (timesHitInDirection >= 1){
            detectDirection = "vertical";
          }
            beginGame(1);
        } else {
          // animateBullet($(toTheTop), false);
          $(toTheTop).addClass("miss_on_player");
          $(toTheTop).addClass("dont_touch_this");
            beginGame(1);
        }
      } else {
        beginGame();
        console.log("IF YOU SEE THIS, THERE WAS AN ISSUE WITH THE RANDOM NUMBER GENERATOR");
      }
    } else {
    //NORMAL COMPUTER RANDOMIZER
    let allClickablePlayerBoard = document.querySelectorAll("#player_battleship_board > table > tbody > tr > td");
    let clickablePlayerBoard = $(allClickablePlayerBoard).not(document.getElementsByClassName("dont_touch_this"));
    let playerSpotsLeft = $(clickablePlayerBoard).length
    let computerSelection = Math.floor(Math.random()*(playerSpotsLeft-0+1)+0);
    let computerTargetonPlayerBoard = clickablePlayerBoard[computerSelection];
    $(computerTargetonPlayerBoard).addClass("dont_touch_this");
    if ($(computerTargetonPlayerBoard).hasClass("player_pieces")){
      // animateBullet($(computerTargetonPlayerBoard), false);
      $(computerTargetonPlayerBoard).addClass("explosion_container").delay(1000).queue(function(next){
        $(computerTargetonPlayerBoard).removeClass("explosion_container");
        next();
      });
      $(computerTargetonPlayerBoard).addClass("hit_on_player");
      $("#computer_player_avatar").removeClass();
      $("#computer_player_avatar").addClass("avatar_normal");
      computerFoundPlayerShip = true;
    } else {
      $(computerTargetonPlayerBoard).addClass("miss_on_player");
      // animateBullet($(computerTargetonPlayerBoard), false);
    }
      beginGame(1);
  }
}
//END COMPUTER TURN HANDLER
//BEGIN PLAYER TURN HANDLER
function playerTurnBegin(){
  //LETS find every clickable object
  let allClickableEnemyBoard = document.querySelectorAll("#computer_battleship_board > table > tbody > tr > td");
  let clickableEnemyBoard = $(allClickableEnemyBoard).not(document.getElementsByClassName("dont_touch_this"));
  $(clickableEnemyBoard).addClass("clickable");
  //jQuery Function for Click
    if ($(clickableEnemyBoard).hasClass("clickable")){
    $(clickableEnemyBoard).on("click", function(){
      $(this).addClass("dont_touch_this");
      $(this).removeClass("clickable");
      $(clickableEnemyBoard).off("click");
      // animateBullet($(this), true);
      $(clickableEnemyBoard).removeClass("clickable");
      if ($(this).hasClass("computer_pieces")){
        $(this).addClass("explosion_container").delay(1000).queue(function(next){
          $(this).removeClass("explosion_container");
          next();
        });
        $(this).addClass("hit_on_computer");
        $("#computer_player_avatar").removeClass();
        $("#computer_player_avatar").addClass("avatar_angry");
        announcements.innerHTML = "Computer Is Thinking...";
        window.scrollTo(0, 99999);
        setTimeout(beginGame, 2000);
      } else {
        $(this).addClass("miss_on_computer");
        announcements.innerHTML = "Computer Is Thinking...";
        window.scrollTo(0, 99999);
        setTimeout(beginGame, 2000);
      }
    });
  }
}
//END PLAYER TURN HANDLER
//The below must be called on an ID
//BEGIN AVATAR RANDOMIZATION
function makeNewPosition(){
    let top = $(window).height();
    let left = $(window).width();
    let computer_player_box_top = (document.getElementById("computer_player_box").getBoundingClientRect()).top;
    let computer_player_box_left = (document.getElementById("computer_player_box").getBoundingClientRect()).left;

    let starttop = Math.floor(Math.random()*(top-0+1)+0);
    let startleft = Math.floor(Math.random()*((left+80)-left+20)+left);
    let finaltop = computer_player_box_top - 110;
    let finalleft = computer_player_box_left - 110;

    let time = Math.floor(Math.random()*(4000-1000+1)+1000);
    let scale = Math.floor(Math.random()*(10-5+1)+5);
    return [starttop,startleft,finaltop,finalleft,time,scale];
}
function animateAvatarStart(name){
    var newq = makeNewPosition();
    $(name).hide(0);
    $(name).animate({ top: newq[0], left: newq[1] },function(){
    });
    $(name).fadeIn(0);
    $(name).animate({ top: newq[2], left: newq[3] }, newq[4], function(){
});
};
//END AVATAR RANDOMIZATION
//BEGIN BULLET ANIMATION
function animateBullet(objectToShootAt, player){
  function getOffset(selectedThing) {
    if (selectedThing === undefined){
      return{
        left: 0,
        top: 0
      }
    } else {
      selectedThing = selectedThing.getBoundingClientRect();
      return {
        left: selectedThing.left + window.scrollX,
        top: selectedThing.top + window.scrollY
      }
    }
  }
  //TRANSFORM ANGLE FUNCTION
    function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
    }
    //PLAYER DETECTON AND START POS
  if (player === true){
    let pullBody = document.querySelector("body");
    let createDiv = document.createElement("div");
    $(createDiv).hide(0);
    createDiv.setAttribute("id", "bullet_animation");
    pullBody.appendChild(createDiv);
    let startItem = getStartSpot("player_battleship_board");
    leftPos = getOffset(startItem).left;
    topPos = getOffset(startItem).top;
    finalLeftPos = getOffset(objectToShootAt[0]).left;
    finalTopPos = getOffset(objectToShootAt[0]).top;
    let degree = Math.floor(angle(leftPos, topPos, finalLeftPos, finalTopPos));
    degree = degree + 90;
    $(createDiv).animate({ top: topPos, left: leftPos }, function(){
    });
    $(createDiv).hide(0);
    createDiv.setAttribute("style", "transform: rotate(" + degree + "deg)");
    $(createDiv).show(0);
    $(createDiv).animate({ top: finalTopPos, left: finalLeftPos }, 2000, function(){
      $(createDiv).hide(0);
      createDiv.remove();
    });
  }//COMPUTER DETECTON AND START POS
  if (player === false){
    let pullBody = document.querySelector("body");
    let createDiv = document.createElement("div");
    $(createDiv).hide(0);
    createDiv.setAttribute("id", "bullet_animation");
    pullBody.appendChild(createDiv);
    let startItem = getStartSpot("computer_battleship_board");
    leftPos = getOffset(startItem).left;
    topPos = getOffset(startItem).top;
    finalLeftPos = getOffset(objectToShootAt[0]).left;
    finalTopPos = getOffset(objectToShootAt[0]).top;
    let degree = Math.floor(angle(leftPos, topPos, finalLeftPos, finalTopPos));
    degree = degree + 90;
    $(createDiv).animate({ top: topPos, left: leftPos }, function(){
    });
    $(createDiv).hide(0);
    createDiv.setAttribute("style", "transform: rotate(" + degree + "deg)");
    $(createDiv).show(0);
    $(createDiv).animate({ top: finalTopPos, left: finalLeftPos }, 2000, function(){
      $(createDiv).hide(0);
      createDiv.remove();
    });
  }
  //RANDOM LOCATION FUNCTION
  function getStartSpot(add){
    let allClickablePlayerBoard = document.querySelectorAll("#"+add+" > table > tbody > tr > td");
    let clickablePlayerBoard = $(allClickablePlayerBoard).not(document.getElementsByClassName("dont_touch_this"));
    let playerSpotsLeft = $(clickablePlayerBoard).length
    let computerSelection = Math.floor(Math.random()*(playerSpotsLeft-0+1)+0);
    let computerTargetonPlayerBoard = clickablePlayerBoard[computerSelection];
    return computerTargetonPlayerBoard
  }
};
//END BULLET ANIMATION



/*HOW TO PUT OBJECTS THAT ARE DEFINED INTO AN ARRAY:
let portfolioData = [
    {
        img : "img/boat.jpg",
        h2 : "Boats"
    },
    {
        img : "img/hair.jpg",
        h2 : "Hair Styles"
    },
    {
        img : "img/shirts.jpg",
        h2 : "t Shirts"
    },
    {
        img : "img/dirt.jpg",
        h2 : "Dirt"
    }
];

SELECTING THEM:
(portfolioData[0].h2) //would output "Boats"
*/






/*Super Cool REPLICATION:
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let toTheRight = $(ev.target).next();
    let toTheLeft = $(ev.target).prev();
    var data2 = document.getElementById(data).cloneNode(true);
    data2.id = "player_aircraft_carrier";
    let repeat = 0;
    if (data === "player_aircraft_carrier"){
      let repeat = 1;
    }
    for (let i = 0; i < repeat; i++){
      var data2 = document.getElementById(data).cloneNode(true);
      data2.id = "player_aircraft_carrier" + [i];
  }
    ev.target.appendChild(document.getElementById(data));
    toTheRight[0].appendChild(data2);
    toTheLeft[0].appendChild(document.getElementById(data3));
}
*/
/* DROPS TD AS CHILD OF TD
function drop(ev) {
    ev.preventDefault();
    // let data gets the ID and info of the object
    let data = ev.dataTransfer.getData("text");
    let trObjects = [];
    let tdObjects = [];
    if ($(ev.target).hasClass("label")){
      announcements.innerHTML = "Invalid spot!";
    } else if (data === "player_aircraft_carrier"){
      moveItems(5);
    } else if (data === "player_battleship"){
      moveItems(4);
    } else if (data === "player_destroyer" || data === "player_submarine"){
      moveItems(3);
    } else if (data === "player_ptboat"){
      moveItems(2);
    }
    function moveItems(repeat){
    for (let i = 0; i < repeat; i++){
      let tdToAdd = $("#"+data+" td:nth-child(1)")[0];
      trObjects.push(tdToAdd);
      if (i === 0){
        $(ev.target).addClass("player_pieces");
        $(ev.target).attr("id", data + "_piece1")
      } else if (i > 0){
      let toTheRight = $(ev.target).nextUntil();
      tdObjects.push(toTheRight[i]);
      toTheRight[i-1].replaceWith(trObjects[i]);
      }
    }
    }
}*/
