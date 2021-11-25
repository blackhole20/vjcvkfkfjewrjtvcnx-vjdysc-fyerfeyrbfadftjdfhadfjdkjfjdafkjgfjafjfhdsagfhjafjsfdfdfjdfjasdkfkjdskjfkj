quick_draw_data_set=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant"];
var timer_counter=0;
var timer_check="";
var drawn_sketch="";
var answer_holder="";
var score=0;

function setup() {
    canvas=createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifycanvas);
    synth=window.speechSynthesis;
}

function clearcanvas(){
    background("white");
}

function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
    check_sketch();
    if (drawn_sketch==sketch) {
        answer_holder="set";
score++;
document.getElementById("score").innerHTML="score : "+score;
    }
}

function classifycanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,result){
    if (error) {
        console.error(error);
    }
    console.log(result);
    document.getElementById("label").innerHTML="label : "+result[0].label;
    document.getElementById("confidence").innerHTML="Confidence : "+Math.round(result[0].confidence*100)+"%";
    utterthis=new SpeechSynthesisUtterance(result[0].label);
    synth.speak(utterthis);
}

function check_sketch() {
    timer_counter++;
    document.getElementById("timer").innerHTML="timer : "+timer_counter;
    if(timer_counter>400) {
        timer_counter=0;
        timer_check="completed";
    }
    if (timer_check=="completed" || answer_holder=="set") {
        timer_check="";
        answer_holder="";
        updatecanvas();
    }
}

function updatecanvas() {
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;
}