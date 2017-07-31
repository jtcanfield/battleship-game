$("#computer_player_avatar").hide(0);
$(".direction_detector").hide(0);
let boatsDown = 0;
let playerShotsPerTurn = 1;
let computerShotsPerTurn = 1;
let playerShipsOnBoard = [];
let computerShipsOnBoard = [];
function main() {
}
$(document).ready(main);
$(document).ready(function() {
//START GAME BUTTON FUNCTIONS
  animateAvatarStart("#computer_player_avatar");
  $("#start_game_oneshotperturn").click(function() {
    // if (boatsDown !== 5){
      if (boatsDown > 6){
      start_game_announcements.innerHTML = "Please Place all boats before starting!"
    } else {
      playerShotsPerTurn = 1;
      computerShotsPerTurn = 1;
      $("#pregame_box").hide(1000);
      computerPlaceShips();
    }
  });
  $("#start_game_fiveshots").click(function() {
    // if (boatsDown !== 5){
      if (boatsDown > 6){
      start_game_announcements.innerHTML = "Please Place all boats before starting!"
    } else {
      start_game_announcements.innerHTML = "This Option is not avaiable yet. Please start a One Shot Game!"
      // playerShotsPerTurn = 5;
      // computerShotsPerTurn = 5;
      // $("#pregame_box").hide(1000);
      // computerPlaceShips();
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
    } else if (data === "player_destoryer"){
      moveItems(3, direction);
      boatsDown += 1;
      $("#player_destoryer").toggle();
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
            theTarget = $(findNextRow[0].childNodes[rowIndexing+2])[0];
          }
        }
        //VERTICAL PLAYER OTEHR PIECE DETECTION
        if (isActionLegal === 1){
          let theTarget = ev.target;
          for (let i = 0; i < repeat-1; i++){
            let rowIndexing = $(theTarget).prevUntil(".label").length;
            let findNextRow = $(theTarget).parent().next();
            theTarget = $(findNextRow[0].childNodes[rowIndexing+2])[0];
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
            theTarget = $(findNextRow[0].childNodes[rowIndexing+2])[0];
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
  $("#player_destoryer").show();
  $("#player_submarine").show();
  $("#player_ptboat").show();
  announcements.innerHTML = "Place your Ships!";
  boatsDown += 0;
});
//END DRAG AND DROP SCRIPTS
//START COMPUTER PLACING
function computerPlaceShips(){
  let computerShips = ["computer_aircraft_carrier", "computer_battleship", "computer_destoryer", "computer_submarine", "computer_ptboat"];
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
        let verticalPosition = Math.floor(Math.random()*(maxVertPosition-1+1)+1);
        let horizontalPosition = Math.floor(Math.random()*(11-2+1)+2);
        let selectedPiece = $("#computer_battleship_board tr:nth-child("+verticalPosition+") td:nth-child("+horizontalPosition+")");
        let selectedPieceForDetection = $("#computer_battleship_board tr:nth-child("+verticalPosition+") td:nth-child("+horizontalPosition+")");
        let actionLegal = 1;
        //VERTICAL DETECTION
        for (let z = 0; z < lengthOfShips; z++){
          let rowIndexing = $(selectedPieceForDetection).prevUntil(".label").length;
          let findNextRow = $(selectedPieceForDetection).parent().next();
          if ($(selectedPieceForDetection).hasClass("computer_pieces")){
              actionLegal = 0;
          } else {
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
  beginGame(0);
}
//END COMPUTER PLACING
//BEGIN TURN DETECTION
function beginGame(whosTurnIsIt){
  if (whosTurnIsIt === 0){
    playerTurnBegin();
  }
  if (whosTurnIsIt === 1){
  computerTurnBegin();
  }
}
//BEGIN COMPUTER TURN HANDLER
let computerFoundPlayerShip = false;
function computerTurnBegin(){
  console.log(computerFoundPlayerShip);
  if (computerFoundPlayerShip === true){

  } else {
    //NORMAL COMPUTER RANDOMIZER
    let allClickablePlayerBoard = document.querySelectorAll("#player_battleship_board > table > tbody > tr > td");
    let clickablePlayerBoard = $(allClickablePlayerBoard).not(document.getElementsByClassName("dont_touch_this"));
    let playerSpotsLeft = $(clickablePlayerBoard).length
    let computerSelection = Math.floor(Math.random()*(playerSpotsLeft-0+1)+0);
    let computerTargetonPlayerBoard = clickablePlayerBoard[computerSelection];
    console.log(computerTargetonPlayerBoard);
    $(computerTargetonPlayerBoard).addClass("dont_touch_this");
    if ($(computerTargetonPlayerBoard).hasClass("player_pieces")){
      $(computerTargetonPlayerBoard).addClass("hit_on_player");
      computerFoundPlayerShip = true;
    } else {
      $(computerTargetonPlayerBoard).addClass("miss_on_player");
    }
  }
  beginGame(0);
}
//END COMPUTER TURN HANDLER
//BEGIN PLAYER TURN HANDLER
function playerTurnBegin(){
  //LETS find ever clickable object
  let allClickableEnemyBoard = document.querySelectorAll("#computer_battleship_board > table > tbody > tr > td");
  let clickableEnemyBoard = $(allClickableEnemyBoard).not(document.getElementsByClassName("dont_touch_this"));
  $(clickableEnemyBoard).addClass("clickable");
  //jQuery Function for Click
    // $(document.getElementsByClassName("clickable")).click(function(){
    if ($(clickableEnemyBoard).hasClass("clickable")){
    $(clickableEnemyBoard).on("click", function(){
      $(this).addClass("dont_touch_this");
      $(this).removeClass("clickable");
      $(clickableEnemyBoard).off("click");
      $(clickableEnemyBoard).removeClass("clickable");
      if ($(this).hasClass("computer_pieces")){
        $(this).addClass("hit_on_computer");
        beginGame(1);
      } else {
        $(this).addClass("miss_on_computer");
        beginGame(1);
      }
    });
  }
}
//END PLAYER TURN HANDLER




















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
    } else if (data === "player_destoryer" || data === "player_submarine"){
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
//The below must be called on an ID
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
