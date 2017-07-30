$("#computer_player_avatar").hide(0);
$(".direction_detector").hide(0);
let boatsDown = 0;
let playerShotsPerTurn = 1;
let computerShotsPerTurn = 1;
function main() {
}
$(document).ready(main);
$(document).ready(function() {
//START GAME BUTTON FUNCTIONS
  animateAvatarStart("#computer_player_avatar");
  $("#start_game_oneshotperturn").click(function() {
    if (boatsDown !== 5){
      start_game_announcements.innerHTML = "Please Place all boats before starting!"
    } else {
      playerShotsPerTurn = 1;
      computerShotsPerTurn = 1;
      
    }
  });
  $("#start_game_fiveshots").click(function() {
    if (boatsDown !== 5){
      start_game_announcements.innerHTML = "Please Place all boats before starting!"
    } else {
      playerShotsPerTurn = 5;
      computerShotsPerTurn = 5;
      console.log(playerShotsPerTurn);
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
    if (vertical === 1){
      let isActionLegal = 1;
      let theTarget = ev.target;
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
