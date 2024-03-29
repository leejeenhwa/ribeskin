/*
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    "use strict";
    if (this == null) throw new TypeError("can't convert " + this + " to object");

    var str = "" + this;
    // To convert string to integer.
    count = +count;
    // Check NaN
    if (count != count) count = 0;

    if (count < 0) throw new RangeError("repeat count must be non-negative");

    if (count == Infinity) throw new RangeError("repeat count must be less than infinity");

    count = Math.floor(count);
    if (str.length == 0 || count == 0) return "";

    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) throw new RangeError("repeat count must not overflow maximum string size");

    var maxCount = str.length * count;
    count = Math.floor(Math.log(count) / Math.log(2));
    while (count) {
      str += str;
      count--;
    }
    str += str.substring(0, maxCount - str.length);
    return str;
  };
}
*/
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
/*
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String(typeof padString !== "undefined" ? padString : " ");
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
*/

var device = window.matchMedia('(orientation: portrait)').matches;
var scrollHeight =8440;

const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");


const bgCanvas = document.getElementById("bg");
const bgContext = bgCanvas.getContext("2d");


const frameCount = 588;

var currentFrame = function currentFrame(index) {
  if(!device){
    return "./images/trigger_images_v2/v3_" + index.toString().padStart(5, "0") + ".jpg";
  }else{
    return "./images/mobile/mobile_" + index.toString().padStart(5, "0") + ".jpg";
  }
};


var bgFrame = function bgFrame(index) {
  return "./images/colorchip/colorchip_" + index.toString().padStart(5, "0") + ".jpg";
};


const preloadImages = function () {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    bg.src = bgFrame(i);
  }
};


const img = new Image();
img.src = currentFrame(1);

const bg = new Image();
bg.src = bgFrame(1);



window.addEventListener("resize", resizeCanvas, true);
function resizeCanvas() {
  device = window.matchMedia('(orientation: portrait)').matches;

  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  bgContext.drawImage(bg, 0, 0, window.innerWidth, window.innerHeight);

  // canvas size
  if(!device){
/*
    canvas.width = window.window.innerHeight*1.77777777778;
    canvas.height = window.innerHeight;
    context.drawImage(img, 0, 0, window.window.innerHeight*1.77777777778,window.innerHeight);
*/

    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth*0.5625;
    context.drawImage(img, 0, 0, window.innerWidth,window.innerWidth*0.5625);

  }else{
    canvas.width = window.innerHeight*0.5625;
    canvas.height = window.innerHeight;
    context.drawImage(img, 0, 0, window.innerHeight*0.5625,window.innerHeight);
  }





  const scrollTop = html.scrollTop;
  // const maxScrollTop = html.scrollHeight - window.innerHeight;
  const maxScrollTop = scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
  requestAnimationFrame(function () {
    updateImage(frameIndex + 1);
  });



}
resizeCanvas();


img.onload = function () {
  if(!device){
    // context.drawImage(img, 0, 0, window.window.innerHeight*1.77777777778,window.innerHeight);
    context.drawImage(img, 0, 0, window.innerWidth,window.innerWidth*0.5625);
  }else{
    context.drawImage(img, 0, 0, window.innerHeight*0.5625,window.innerHeight);
  }

};
bg.onload = function () {
  bgContext.drawImage(bg, 0, 0, window.innerWidth,window.innerHeight);
};

const updateImage = function (index) {

  img.src = currentFrame(index);
  if(!device){
    // context.drawImage(img, 0, 0, window.window.innerHeight*1.77777777778,window.innerHeight);
    context.drawImage(img, 0, 0, window.innerWidth,window.innerWidth*0.5625);
  }else {
    context.drawImage(img, 0, 0, window.innerHeight*0.5625,window.innerHeight);
  }


  bg.src = bgFrame(index);
  bgContext.drawImage(bg, 0, 0, window.innerWidth,window.innerHeight);


};

window.addEventListener("scroll", function () {
  const scrollTop = html.scrollTop;
  // const maxScrollTop = html.scrollHeight - window.innerHeight;
  const maxScrollTop = scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(frameCount - 1, Math.ceil(scrollFraction * frameCount));
  requestAnimationFrame(function () {
    updateImage(frameIndex + 1);
  });
});

preloadImages();



var scrollPos = [0,755,3710,7800]
// 2560 x 1440 = 7465, 1920 x 1080 = 7800
var menu = document.querySelector('.menu').children;
var menu_mobile = document.querySelector('.menu_mobile').children;
var dot = document.querySelector('.dot').children[0].children;

for(var i=0; i<menu.length; i++){
  (function(i){

    menu[i].addEventListener("click", function (){
      dotRemove()
      window.scrollTo({top: scrollPos[+i], behavior: 'smooth'});
      menu[+i].classList.add('active')
      dot[+i].classList.add('active')
    })
    dot[i].addEventListener("click", function (){
      dotRemove()
      window.scrollTo({top: scrollPos[+i], behavior: 'smooth'});
      menu[+i].classList.add('active')
      dot[+i].classList.add('active')
    })
    menu_mobile[i].addEventListener("click", function (){
        dotRemove()
        window.scrollTo({top: scrollPos[+i], behavior: 'smooth'});
        menu[+i].classList.add('active')
        dot[+i].classList.add('active')
    })
  })(i);
}

var dotRemove = function (){
  for(var j = 0 ; j < menu.length; j++){
    (function(j){
      menu[+j].classList.remove('active')
      dot[+j].classList.remove('active')
    })(j);
  }
}

window.addEventListener("scroll", function (e) {
  
  var top = document.documentElement.scrollTop;
  var arrow = document.querySelector('.scroll_down');
  var msg1 = document.querySelector('.message_box_1');
  var msg2 = document.querySelector('.message_box_2');
  var msg3 = document.querySelector('.message_box_3');
  var msg4 = document.querySelector('.message_box_4');
  var msg5 = document.querySelector('.message_box_5');
  var msg6 = document.querySelector('.message_box_6');
  var msg7 = document.querySelector('.message_box_7');
  var msg8 = document.querySelector('.message_box_8');


  if(scrollPos[0]-10 < top && scrollPos[1] > top){
    dotRemove()
    menu[0].classList.add('active')
    dot[0].classList.add('active')
  }
  if(scrollPos[1]-10 < top && scrollPos[2] > top){
    dotRemove()
    menu[1].classList.add('active')
    dot[1].classList.add('active')
  }
  if(scrollPos[2]-10 < top && scrollPos[3] > top){
    dotRemove()
    menu[2].classList.add('active')
    dot[2].classList.add('active')
  }
  if(scrollPos[3]-10 < top){
    dotRemove()
    menu[3].classList.add('active')
    dot[3].classList.add('active')
  }

  /*message_box_1*/

  var msg1_Point1 = parseInt(scrollHeight * 6.57142857 / 100 );
  if(!device) {
    var mag1_Point2 = parseInt(scrollHeight * 14.3333333 / 100);
  } else {
    var mag1_Point2 = parseInt(scrollHeight * 19.3333333 / 100);
  }

  if(top <  msg1_Point1){
    msg1.classList.remove('active')
    msg1.style.top = '100%'
  }
  if(top > msg1_Point1){
    msg1.classList.add('active')
  }
  if(top > msg1_Point1 && top < mag1_Point2){
    if(!device) {
      msg1.style.top =  (100 -  Math.abs((top-msg1_Point1) / (mag1_Point2 - msg1_Point1)) * 100) + '%';
    } else {
      msg1.style.top =  (100 -  Math.abs((top-msg1_Point1) / (mag1_Point2 - msg1_Point1)) * 80) + '%';
    }
    msg1.style.scrollBehavior = 'smooth';
  }
  if(top > mag1_Point2) {
    msg1.classList.remove('active')
    msg1.style.top = '-100%'
  }


  /*message_box_2*/
  var msg2_Point1 = parseInt(scrollHeight * 9.5067393174 / 100 );
  var mag2_Point2 = parseInt(scrollHeight * 19.974189848 / 100);
  if(top > msg2_Point1) {
    msg2.classList.add('active')
  }
  if(top < msg2_Point1 || top > mag2_Point2) {
    msg2.classList.remove('active')
  }

  /*message_box_3*/
  if(!device) {
    // PC(원본)
    var msg3_Point1 = parseInt(scrollHeight * 24.54832234 / 100 );
    var mag3_Point2 = parseInt(scrollHeight * 30.513335245 / 100);
  } else {
    var msg3_Point1 = parseInt(scrollHeight * 20.54832234 / 100 );
    var mag3_Point2 = parseInt(scrollHeight * 29.513335245 / 100);
  }
  if(top < msg3_Point1){
    msg3.classList.remove('active')
    msg3.style.top = '-100%'
  }
  if(top > msg3_Point1) {
    msg3.classList.add('active')
  }
  if(top > msg3_Point1 && top < mag3_Point2){
    if(!device) {
      msg3.style.top =  (Math.abs((top-msg3_Point1) / (mag3_Point2 - msg3_Point1)) * 100) + '%';
    } else {
      msg3.style.top =  (Math.abs((top-msg3_Point1) / (mag3_Point2 - msg3_Point1)) * 80) + '%';
    }
  }
  if(top > mag3_Point2) {
    msg3.classList.remove('active')
    msg3.style.top = '100%'
  }

  /*message_box_4*/
  var msg4_Point1 = parseInt(scrollHeight * 30.793232 / 100 );
  if(!device) {
    var mag4_Point2 = parseInt(scrollHeight * 36.94092342 / 100);
  } else {
    var mag4_Point2 = parseInt(scrollHeight * 40.94092342 / 100);
  }
  if(top < msg4_Point1) {
    msg4.classList.remove('active')
    msg4.style.top = '100%'
  }
  if(top > msg4_Point1) {
    msg4.classList.add('active')
    // msg4.style.top = '100%'
  }
  if(top > msg4_Point1 && top < mag4_Point2){
    if(!device) {
      msg4.style.top =  (100 -  Math.abs((top-msg4_Point1) / (mag4_Point2 - msg4_Point1)) * 100) + '%';
    } else {
      msg4.style.top =  (100 -  Math.abs((top-msg4_Point1) / (mag4_Point2 - msg4_Point1)) * 80) + '%';
    }
  }
  if(top > mag4_Point2) {
    msg4.classList.remove('active')
    msg4.style.top = '-100%'
  }


  /*message_box_5*/
  if(!device) {
    var msg5_Point1 = parseInt(scrollHeight * 37.94092342 / 100 );
    var mag5_Point2 = parseInt(scrollHeight * 45.36851161 / 100);
    var mag5_Point3 = parseInt(scrollHeight * 48.3547462 / 100);
  } else {
    var msg5_Point1 = parseInt(scrollHeight * 41.94092342 / 100 );
    var mag5_Point2 = parseInt(scrollHeight * 47.36851161 / 100);
    var mag5_Point3 = parseInt(scrollHeight * 52.3547462 / 100);
  }
  if(top < msg5_Point1) {
    msg5.classList.remove('active')
    msg5.style.top = '60%'
    msg5.style.left = '-100%'
  }
  if(top > msg5_Point1) {
    msg5.classList.add('active')
  }
  if(top > msg5_Point1 && top < mag5_Point2) {
    msg5.style.left = '4%'
  }
  if(top > mag5_Point2 && top < mag5_Point3) {
    if(!device) {
      var aa = 100 - Math.abs((top-msg5_Point1) / (mag5_Point3 - msg5_Point1)) * 80 ;
      if(aa < 60) msg5.style.top =  aa + '%';
    } else {
      var aa = 100 - Math.abs((top-msg5_Point1) / (mag5_Point3 - msg5_Point1)) * 100 ;
      if(aa < 60) msg5.style.top =  aa + '%';
    }
  }
  if(top > mag5_Point3) {
    msg5.classList.remove('active')
    msg5.style.top = '-100%'
  }

  /*message_box_6*/
  if(!device) {
    var msg6_Point1 = parseInt(scrollHeight * 48.996271 / 100 );
    var mag6_Point2 = parseInt(scrollHeight * 52.738743 / 100);
    var mag6_Point3 = parseInt(scrollHeight * 56.610266 / 100);
  } else {
    var msg6_Point1 = parseInt(scrollHeight * 52.996271 / 100 );
    var mag6_Point2 = parseInt(scrollHeight * 56.738743 / 100);
    var mag6_Point3 = parseInt(scrollHeight * 61.610266 / 100);
  }
  if(top < msg6_Point1) {
    msg6.classList.remove('active')
    msg6.style.top = '100%'
    msg6.style.left = '4%'
  }
  if(top > msg6_Point1) {
    msg6.classList.add('active')
  }
  if(top > msg6_Point1 && mag6_Point2) {
    var bb = 100 - Math.abs((top-msg6_Point1) / (mag6_Point2 - msg6_Point1)) * 100 ;
    if(bb > 40) {
      msg6.style.top =  bb + '%';
    }
  }
  if(top > mag6_Point2 && mag6_Point3) {
    msg6.style.top =  '40%';
    var cc = Math.abs((top-mag6_Point2) / (mag6_Point3 - mag6_Point2)) * 100 ;
    if(cc < 40){
      msg6.style.left = cc + '%'
    }
  }
  if(top > mag6_Point3) {
    msg6.classList.remove('active')
    msg6.style.left = '40%'
  }


  /*message_box_7*/
  var msg7_Point1 = parseInt(scrollHeight * 67.3931746 / 100 );
  if(!device) {
    var mag7_Point2 = parseInt(scrollHeight * 73.86 / 100);
  } else {
    var mag7_Point2 = parseInt(scrollHeight * 78.86 / 100);
  }
  if(top < msg7_Point1){
    msg7.classList.remove('active')
    msg7.style.top = '100%'
  }
  if(top > msg7_Point1) {
    msg7.classList.add('active')
  }
  if(top > msg7_Point1 && top < mag7_Point2){
    msg7.style.top =  (100 - Math.abs((top-msg7_Point1) / (mag7_Point2 - msg7_Point1)) * 100) + '%';
  }
  if(top > mag7_Point2) {
    msg7.classList.remove('active')
    msg7.style.top = '-100%'
  }

  /*message_box_8*/
  var msg8_Point1 = parseInt(scrollHeight * 79.123222 / 100 );
  var mag8_Point2 = parseInt(scrollHeight * 88.862559 / 100);
  if(top < msg8_Point1){
    msg8.classList.remove('active')
    msg8.style.top = '-100%'
  }
  if(top > msg8_Point1) {
    msg8.classList.add('active')
  }
  if(top > msg8_Point1 && top < mag8_Point2){
    msg8.style.top =  (Math.abs((top-msg8_Point1) / (mag8_Point2 - msg8_Point1)) * 100) + '%';
  }
  if(top > mag8_Point2) {
    msg8.classList.remove('active')
    msg8.style.top = '100%'
  }

})
