function main() {
}
$(document).ready(main);
$(document).ready(function() {
});






//The below must be called on an ID
function makeNewPosition(){
    var top = $(window).height();
    var left = $(window).width();

    var starttop = Math.floor(Math.random()*(top-0+1)+0);
    var startleft = Math.floor(Math.random()*((left+80)-left+20)+left);

    var finaltop = Math.floor(Math.random()*(top-0+1)+0);
    var finalleft = Math.floor(Math.random()*(-80-50+1)-50);
    var time = Math.floor(Math.random()*(4000-1000+1)+1000);
    return [starttop,startleft,finaltop,finalleft,time];
}
function animateComet(name){
    var newq = makeNewPosition();
    $(name).animate({ top: newq[0], left: newq[1] },function(){
    });
    $(name).fadeIn(0);
    $(name).animate({ top: newq[2], left: newq[3] }, newq[4], function(){
});
};
