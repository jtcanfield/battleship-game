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
    let data = ev.dataTransfer.getData("text");
    let toTheRight = $(ev.target).next();
    // console.log(toTheRight);
    let toTheLeft = $(ev.target).prev();
    // console.log(toTheLeft);
    if (data === "player_aircraft_carrier"){
    }
    ev.target.appendChild(document.getElementById(data));
    console.log(ev.target);
    console.log(toTheRight[0]);
    toTheRight[0].appendChild(document.getElementById(data));

    toTheLeft[0].appendChild(document.getElementById(data));
}

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
