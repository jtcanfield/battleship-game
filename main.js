$(name).hide(0);
function main() {
}
$(document).ready(main);
$(document).ready(function() {
  animateAvatarStart("#computer_player_avatar");
});








//The below must be called on an ID
function makeNewPosition(){
    var top = $(window).height();
    var left = $(window).width();
    let computer_player_box_top = (document.getElementById("computer_player_box").getBoundingClientRect()).top;
    let computer_player_box_left = (document.getElementById("computer_player_box").getBoundingClientRect()).left;

    var starttop = Math.floor(Math.random()*(top-0+1)+0);
    var startleft = Math.floor(Math.random()*((left+80)-left+20)+left);
    var finaltop = computer_player_box_top - 110;
    var finalleft = computer_player_box_left - 110;

    var time = Math.floor(Math.random()*(4000-1000+1)+1000);
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
