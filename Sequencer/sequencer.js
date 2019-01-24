
// create a list so that the tracks may be referenced
var trackList = []

// setup sounds
var wipe = new Howl({
  src: ['sounds/wipe.mp3']
});
var glimmer = new Howl({
  src: ['sounds/glimmer.mp3']
});
 var veil = new Howl({
  src: ['sounds/veil.mp3']
});
 var prism1 = new Howl({
  src: ['sounds/prism-1.mp3']
});

// create list to store sounds and setup default sound
var sounds = [wipe, glimmer, veil, prism1];
var trackOneSound = sounds[0];
var trackSounds = [trackOneSound, trackOneSound, trackOneSound, trackOneSound];

// setup onchange function that runs onchange of select html element
function soundChange(selection, track){
	trackSounds[track] = sounds[selection.selectedIndex];
}

function getTracks () {
	return document.getElementsByClassName('track')
}

function playBoxesForCounter (counter) {
	var tracks = getTracks()
	for (var i = 0; i<tracks.length; i++) {
		var soundIndex = tracks[i].children[0].selectedIndex
		var box = tracks[i].children[counter]
		var shouldPlay = !box.classList.contains('selected')
		box.classList.toggle("highlighted");
		if (shouldPlay) {
			sounds[soundIndex].play();
			console.log(box);
		}
	}
}

// create a counter to keep track of which box will be highlighted with sequencer
var counter = 0;
// function should toggle the highlighted class to know which position the sequencer is in
function tracker(counter){
	var boxes = playBoxesForCounter(counter + 1)
};

// create a variable to pass in to start function to change tempo
var tempo = document.getElementById('myRange');

// create a function that will allow the sequencer to be started and stopped through button pushes	
var startButton;

function start() {
    if (!startButton) {
        startButton = window.setInterval(function(){
			tracker(counter);
			counter += 1;
			if (counter===16) {
				counter = 0;
			};
		}, tempo.value)
    } else {
        window.clearInterval(startButton);
        startButton = null;
    }
}

function math(val) {
	answer = Math.round(15000/val);
	return answer
}


// add event listeners to boxes on page 
var boxEls = document.getElementsByClassName('box')
for(var i = 0; i<boxEls.length; i++){
	var boxEl = boxEls[i]
	boxEl.addEventListener('click', function () {
		this.classList.toggle('selected')
	})
};


// clone track to add another
function addTrack() {
	var trackClone = document.getElementById('track1').cloneNode(true)
	var boxes = trackClone.children
	for (var i=0; i<boxes.length; i++) {
		var boxEl = boxes[i];
		if (!boxEl.classList.contains('selected')) {
			boxEl.classList.toggle('selected')
		}
		boxEl.addEventListener('click', function () {
			this.classList.toggle('selected')
		})
	}
	var tracksList = document.getElementById('tracks-list')
	tracksList.appendChild(trackClone)
}



