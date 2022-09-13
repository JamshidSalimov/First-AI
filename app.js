// Classifier Variable
 let classifier;
 // Model URL
 let imageModelURL = 'https://teachablemachine.withgoogle.com/models/Tc7lpLVX3/';
 // Video
 let video;
 let flippedVideo;
 // To store the classification
 let label = "";
let img;
 // Load the model first
 function preload() {
     classifier = ml5.imageClassifier(imageModelURL + 'model.json');
     img = loadImage('data/logo.png');
 }

function setup() {
     createCanvas(600, 950);
     // Create the video
    //  video = createCapture(VIDEO);
     

     var constraints = {
         audio: false,
         video: {
             facingMode: "environment"
         }
     };
     video = createCapture(constraints);
     video.size(300, 400);
     video.hide();

     flippedVideo = ml5.flipImage(video)
     // Start classifying
     classifyVideo();
 }

 function draw() {
     background(0);
     // Draw the video
     image(video, 140, 40);

     // Draw the label
     fill(255);
     textSize(45);
     textAlign(CENTER);
     text(label, width / 2, height - 400);
     image(img, 250, height-150, 100, 100);
 }

 // Get a prediction for the current video frame
 function classifyVideo() {
     flippedVideo = ml5.flipImage(video)
     classifier.classify(flippedVideo, gotResult);
 }

 // When we get a result
 function gotResult(error, results) {
     // If there is an error
     if (error) {
         console.error(error);
         return;
     }
     // The results are in an array ordered by confidence.
     // console.log(results[0]);
     if(results[0].confidence>0.85){
     label = results[0].label;
     }
     else{
     label = "...";
     }
     flippedVideo.remove();
     // Classifiy again!
     classifyVideo();
 }