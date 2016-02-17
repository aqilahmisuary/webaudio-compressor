var context = new AudioContext();
var url = "https://dl.dropboxusercontent.com/u/30075450/Ambient.mp3";
var source = null;
var myAudioBuffer = null;
var compressor = context.createDynamicsCompressor();

function loadSound(url) {
  
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            myAudioBuffer = buffer;
            
        });
    }
    request.send();
}
  
loadSound(url);

function playSound() {
    source = context.createBufferSource();
    source.buffer = myAudioBuffer;
    source.connect(context.destination);
    source.start();   
}

function stopSound() {
    if (source) {
        source.stop();
   }
}



function addCompressor() {
  
  compressor.threshold.value = -20;
  compressor.knee.value = 40;
  compressor.ratio.value = 12;
  compressor.reduction.value = -20;
  compressor.attack.value = 0;
  compressor.release.value = 0.25;
  
  source.connect(compressor);
  compressor.connect(context.destination);
}

function removeCompressor() {
  
  compressor.disconnect(context.destination);
  source.connect(context.destination);

}