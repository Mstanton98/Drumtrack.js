(function() {
  $('select').material_select();
  const $xhr = $.getJSON('https://api.myjson.com/bins/4zupe');

  $xhr.done(function(obj) {
    if ($xhr.status !== 200) {
      return;
    }
    const context = new (window.AudioContext || window.webkitAudioContext)();

    const circle = document.getElementById('indicator');
    const circle2 = document.getElementById('indicator2');
    const circle3 = document.getElementById('indicator3');
    const circle4 = document.getElementById('indicator4');
    let kick = obj.clave;
    let snare = obj.accent;
    let hat = obj.hat;
    let oHat = obj.oHat;
    const kickRequest = new XMLHttpRequest();
    const snareRequest = new XMLHttpRequest();
    const hatRequest = new XMLHttpRequest();
    const oHatRequest = new XMLHttpRequest();

    kickRequest.open('GET', kick, true);
    kickRequest.responseType = 'arraybuffer';
    kickRequest.onload = function() {
      context.decodeAudioData(kickRequest.response, function(buffer) {
        kick = buffer;
      }, function(err) {
        console.log(err);
      });
    };

    kickRequest.send();

    function playKick() {
      if (!kick) {
        console.log('Sound Buffer has not loaded');

        return;
      }

      const clave = context.createBufferSource();

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
    };
    snareRequest.send();

    function playSnare() {
      if (!snare) {
        console.log('Sound Buffer has not loaded');

        return;
      }

      const accent = context.createBufferSource();

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
    };

    hatRequest.send();

    function playHat() {
      if (!kick) {
        console.log('Sound Buffer has not loaded');

        return;
      }

      const hiHat = context.createBufferSource();

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
    };

    oHatRequest.send();

    function playOpenHat() {
      if (!kick) {
        console.log('Sound Buffer has not loaded');

        return;
      }

      const oHiHat = context.createBufferSource();

      oHiHat.buffer = oHat;
      oHiHat.connect(context.destination);
      oHiHat.start(0);
    }

    circle4.addEventListener('click', playKick);
    circle3.addEventListener('click', playHat);
    circle2.addEventListener('click', playOpenHat);
    circle.addEventListener('click', playSnare);
    $(window).keydown(function(event) {
      if (event.which === 75 || event.which === 76) {
        playKick();
      }
      else if (event.which === 74 || event.which === 68) {
        playHat();
      }
      else if (event.which === 69 || event.which === 73) {
        playOpenHat();
      }
      else if (event.which === 72 || event.which === 83) {
        playSnare();
      }
    });
  });
})();
