// create a list so that the boxes may be referenced
var boxList = [];
// create a list so that the tracks may be referenced
var trackList = []
// add boxes and tracks to lists and create ability to click and change color of boxes
for(var i = 0; i<64; i++){
		boxList.push(document.getElementsByClassName('box')[i]);
		var boxes = document.getElementsByClassName('box')[i].addEventListener("click", function(){this.classList.toggle("selected")});
};

// setup sounds
var sound = new Howl({
  src: ['sounds/bubbles.mp3']
});
var strike = new Howl({
  src: ['sounds/strike.mp3']
});
 var clay = new Howl({
  src: ['sounds/clay.mp3']
});
 var piston1 = new Howl({
  src: ['sounds/piston-1.mp3']
});
 
// create a counter to keep track of which box will be highlighted with sequencer
var counter = 0;
// function should toggle the highlighted class to know which position the sequencer is in
function tracker(counter){
	boxList[counter].classList.toggle("highlighted");
	boxList[counter+16].classList.toggle("highlighted");
	boxList[counter+32].classList.toggle("highlighted");
	boxList[counter+48].classList.toggle("highlighted");
	if(boxList[counter].classList[1] !== "selected"){
		// make noise
		strike.play();
	}if(boxList[counter+16].classList[1] !== "selected"){
		// make noise
		sound.play();
	}if(boxList[counter+32].classList[1] !== "selected"){
		// make noise
		clay.play();
	}if(boxList[counter+48].classList[1] !== "selected"){
		// make noise
		piston1.play();
	}
};

// create a function that will allow the sequencer to be started and stopped through button pushes	

var startButton;

function start() {
    if (!startButton) {
        startButton = window.setInterval(function(){
		tracker(counter);
		counter += 1;
		if(counter===16){
			counter = 0;
		};
		}, 300)
    } else {
        window.clearInterval(startButton);
        startButton = null;
    }
}

