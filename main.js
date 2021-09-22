Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById(camera);

Webcam.attach("#camera");

function takesnapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    })
}

console.log("ml5.version",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/2dlc4vN9I/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is loaded")
}

function check(){
    captured_img = document.getElementById("captured_image");
    classifier.classify(captured_img , gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(4);
    }    
}