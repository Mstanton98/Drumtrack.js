(function(){

$('select').material_select();
//https://api.myjson.com/bins/5b94e
var $xhr = $.getJSON(`https://api.myjson.com/bins/4zupe`);

$xhr.done(function(obj) {
  if ($xhr.status !== 200) {
    return;
  }

  var context = new (window.AudioContext || window.webkitAudioContext)();


  var circle = document.getElementById('indicator');
  var circle2 = document.getElementById('indicator2');
  var circle3 = document.getElementById('indicator3');
  var circle4 = document.getElementById('indicator4');
  var kick = obj.clave;
  var snare = obj.accent;
  var hat = obj.hat;
  var oHat = obj.oHat;
  var kickRequest = new XMLHttpRequest();
  var snareRequest = new XMLHttpRequest();
  var hatRequest = new XMLHttpRequest();
  var oHatRequest = new XMLHttpRequest();

    kickRequest.open('GET', kick, true);
    kickRequest.responseType = 'arraybuffer';
    kickRequest.onload = function() {
      context.decodeAudioData(kickRequest.response, function(buffer) {
        kick = buffer;
      }, function(err) {
        console.log(err);
      });
  }

  kickRequest.send();

  function playKick() {
    if (!kick) {
      console.log('Sound Buffer has not loaded');
      return;
    }

    var clave = context.createBufferSource();

    clave.buffer = kick;
    clave.connect(context.destination);
    clave.start(0);
  }

  snareRequest.open('GET', snare, true);
  snareRequest.responseType = 'arraybuffer';
  snareRequest.onload = function() {
    context.decodeAudioData(snareRequest.response, function(buffer) {
      snare = buffer;
    }, function(err) {
      console.log(err);
    });
  }
  snareRequest.send();

  function playSnare() {
    if (!snare) {
      console.log('Sound Buffer has not loaded');
      return;
    }

    var accent = context.createBufferSource();

    accent.buffer = snare;
    accent.connect(context.destination);
    accent.start(0);
  }

  hatRequest.open('GET', hat, true);
  hatRequest.responseType = 'arraybuffer';
  hatRequest.onload = function() {
    context.decodeAudioData(hatRequest.response, function(buffer) {
      hat = buffer;
    }, function(err) {
      console.log(err);
    });
}

hatRequest.send();

function playHat() {
  if (!kick) {
    console.log('Sound Buffer has not loaded');
    return;
  }

  var hiHat = context.createBufferSource();

  hiHat.buffer = hat;
  hiHat.connect(context.destination);
  hiHat.start(0);
}
oHatRequest.open('GET', oHat, true);
oHatRequest.responseType = 'arraybuffer';
oHatRequest.onload = function() {
  context.decodeAudioData(oHatRequest.response, function(buffer) {
    oHat = buffer;
  }, function(err) {
    console.log(err);
  });
}

oHatRequest.send();

function playOpenHat() {
if (!kick) {
  console.log('Sound Buffer has not loaded');
  return;
}

var oHiHat = context.createBufferSource();

oHiHat.buffer = oHat;
oHiHat.connect(context.destination);
oHiHat.start(0);
}

  circle4.addEventListener('click', playKick);
  circle3.addEventListener('click',playHat);
  circle2.addEventListener('click', playOpenHat);
  circle.addEventListener('click', playSnare);
  $(window).keydown(function(event){
    if(event.which === 75 || event.which === 76) {
    playKick();
  }else if(event.which === 74 || event.which === 68){
    playHat();
  }else if(event.which === 69 || event.which === 73) {
    playOpenHat();
  }else if(event.which === 72 || event.which === 83) {
    playSnare();
  }
    console.log(event.which);
  });
});
})();
