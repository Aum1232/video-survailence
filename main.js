status = "";
objects = [];
video = "";
function setup() {
    canvas = createCanvas(400,300);
    canvas.center();
}
function preload() {
    video = createVideo('video.mp4');
    video.hide();
}
function draw() {
    image(video,0,0,400,400);
    if(status != ""){
        objectdetector.detect(video, gotresults);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected"
            document.getElementById("number").innerHTML = "Number of objects detected: " + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start() {
    objectdetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelloaded() {
    console.log("Model Loaded");
    status = true;
    video.volume(0);
    video.speed(1);
    video.loop();
}
function gotresults(error, results) {
    if(error){
    console.error(error);
}
    console.log(results);
    objects = results;
}