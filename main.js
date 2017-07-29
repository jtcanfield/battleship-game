$("#computer_player_avatar").hide(0);
$(".direction_detector").hide(0);
function main() {
}
$(document).ready(main);
$(document).ready(function() {
  animateAvatarStart("#computer_player_avatar");
  $("#start_game_button").click(function() {
  });
});


/*TODO
1. ADD BUTTON TO START GAME ONCE PLAYER PLACES PIECES
2. MAKE PIECES SNAP
3. MAKE COMPUTER SET PIECES
4. ADD CLICKER FOR PLAYER TO SELECT SPOTS ON BOARD, MAKE SURE PLAYER CANT ACTIVATE "FIRE" FUNCTION
UNTIL READY
5. SIMILAR WITH ABOVE FOR COMPUTER

*/

//DRAG AND DROP SCRIPT
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    // let data gets the ID and info of the object
    var data = ev.dataTransfer.getData("text");
    if ($(ev.target).hasClass("label") || $(ev.target).hasClass("player_pieces")){
      console.log("FUCKOFF");
      announcements.innerHTML = "Invalid spot!";
    } else if (data === "player_aircraft_carrier"){
      moveItems(5);
      $("#player_aircraft_carrier").toggle();
    } else if (data === "player_battleship"){
      moveItems(4);
      $("#player_battleship").toggle();
    } else if (data === "player_destoryer"){
      moveItems(3);
      $("#player_destoryer").toggle();
    } else if (data === "player_submarine"){
      moveItems(3);
      $("#player_submarine").toggle();
    } else if (data === "player_ptboat"){
      moveItems(2);
      $("#player_ptboat").toggle();
    }
    function moveItems(repeat){
    for (let i = 0; i < repeat; i++){
      if (i === 0){
        $(ev.target).toggleClass("player_pieces");
        $(ev.target).attr("id", data + "_piece1");
      } else if (i > 0){
      let toTheRight = $(ev.target).nextUntil();
      $(toTheRight[i-1]).addClass("player_pieces");
      $(toTheRight[i-1]).attr("id", data + "_piece1");
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
});
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
      console.log("FUCKOFF");
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
      console.log($(toTheRight[i]));
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
