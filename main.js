function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(625,300);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet",modelLoaded);
}

function modelLoaded(){
  console.log("modelLoaded");
}


function draw(){
  image(video, 0,0,300,300);
  classifier.classify(video, gotresult);
}
 
 
 var previousresult = "" ;

function gotresult(error,results){
 if (error){
 console.error(error);
 }
 else {
   if((results[0].confidence > 0.5) && (previousresult != results[0].label)){
     console.log(results);
     previousresult = results[0].label;
     var synth = window.speechSynthesis;
     speakdata = "The object detected is" + results[0].label;
     var utterthis = new SpeechSynthesisUtterance(speakdata);
     synth.speak(utterthis);

     document.getElementById("result_object_name").innerHTML = results[0].label;
     document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);


   }
 }
 
}








