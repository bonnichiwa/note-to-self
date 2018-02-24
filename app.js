var App = function() {
	this.htmlElement = {
		coverNote: document.getElementById('cover-note'),
		note2: document.getElementById('note-2'),
		note3: document.getElementById('note-3'),
		note4: document.getElementById('note-4'),
		note5: document.getElementById('note-5'),
		note6: document.getElementById('note-6'),
		readOn2: document.getElementById('read-on-2'),
		readOn3: document.getElementById('read-on-3'),
		readOn4: document.getElementById('read-on-4'),
		flipContainer: document.getElementById('flip-container'),
		flipLeft: document.getElementById('flip-left'),
		flipRight: document.getElementById('flip-right'),
		images: document.getElementsByClassName('note-img'),
	}
}

let counter = 0;

App.prototype.showNote2 = function() {
	this.htmlElement.coverNote.style.display = "none";
	this.htmlElement.note2.style.display = "inline-flex";
}

App.prototype.showNote3 = function() {
	this.htmlElement.note2.style.display = "none";
	this.htmlElement.note3.style.display = "block";
}

App.prototype.showNote4 = function () {
	this.htmlElement.coverNote.style.display = "none";
	this.htmlElement.note4.style.display = "block";
}
App.prototype.showNote5 = function () {
	this.htmlElement.note4.style.display = "none";
	this.htmlElement.note5.style.display = "block";
	document.querySelector(`img[data-key="${counter}"]`).style.display = "block";
}

App.prototype.mouseEnterCoverNote = function() {
	this.htmlElement.coverNote.style.background = "black";
	this.htmlElement.coverNote.style.transition = "1s";
}

App.prototype.mouseLeaveCoverNote = function() {
	this.htmlElement.coverNote.style.background = "#ececec";
	this.htmlElement.coverNote.style.transition = "1s";
}

App.prototype.mouseEnterNote2 = function() {
	this.htmlElement.readOn2.style.color = "black";
	this.htmlElement.readOn2.style.transition = "1s";
}

App.prototype.mouseLeaveNote2 = function() {
	this.htmlElement.readOn2.style.color = "white";
	this.htmlElement.readOn2.style.transition = "1s";
}

App.prototype.mouseEnterNote3 = function() {
	this.htmlElement.readOn3.style.background = "black";
	this.htmlElement.readOn3.style.color = "white";
	this.htmlElement.readOn3.style.transition = "1s";
}

App.prototype.mouseEnterNote4 = function () {
	this.htmlElement.readOn4.style.background = "black";
	this.htmlElement.readOn4.style.color = "white";
	this.htmlElement.readOn4.style.transition = "1s";
}

App.prototype.mouseLeaveNote3 = function() {
	this.htmlElement.readOn3.style.color = "black";
	this.htmlElement.readOn3.style.background = "#ececec";
	this.htmlElement.readOn3.style.transition = "1s";
}

App.prototype.mouseLeaveNote4 = function () {
	this.htmlElement.readOn4.style.color = "black";
	this.htmlElement.readOn4.style.background = "#ececec";
	this.htmlElement.readOn4.style.transition = "1s";
}

App.prototype.onKeyDown = function(e) {	
	if (this.htmlElement.note5.style.display === 'block') {
		if (counter < 24) {
			Array.from(this.htmlElement.images).forEach((img) => img.style.display = "none");
			if (e.keyCode == 39) {
				if (counter >= 0) counter++;
				this.htmlElement.flipRight.classList.add('pressed');
			}
			if (e.keyCode == 37) {
				if (counter > 0) counter--;
				this.htmlElement.flipLeft.classList.add('pressed');
			}
			document.querySelector(`img[data-key="${counter}"]`).style.display = "block";
		} else if (counter === 24) {
			document.querySelector('div[data-key="25"]').style.display = "block";
			document.querySelector('img[data-key="24"]').addEventListener('mouseover', () => this.showFinalImg());
		}
	}
}

App.prototype.showFinalImg = function() {
	var el = document.querySelector('.js-fade');
	if (el.classList.contains('is-paused')) {
		el.classList.remove('is-paused');
	}
	this.htmlElement.note5.style.display = "none";
	this.htmlElement.note6.style.display = "block";
	document.querySelector('img[data-key="final"]').style.display = "block";
}

App.prototype.observers = function() {
	if (this.htmlElement.coverNote) {
		this.htmlElement.coverNote.addEventListener('mouseenter', () => this.mouseEnterCoverNote());	
		this.htmlElement.coverNote.addEventListener('mouseleave', () => this.mouseLeaveCoverNote());	
		this.htmlElement.coverNote.addEventListener('click', () => this.showNote4());		
	}

	if (this.htmlElement.note2) {
		this.htmlElement.readOn2.addEventListener('mouseenter', () => this.mouseEnterNote2());	
		this.htmlElement.readOn2.addEventListener('mouseleave', () => this.mouseLeaveNote2());	
		this.htmlElement.readOn2.addEventListener('click', () => this.showNote3());
	}

	if (this.htmlElement.note3) {
		this.htmlElement.readOn3.addEventListener('mouseenter', () => this.mouseEnterNote3());	
		this.htmlElement.readOn3.addEventListener('mouseleave', () => this.mouseLeaveNote3());
		this.htmlElement.readOn3.addEventListener('click', () => this.showNote4());	
	}

	if (this.htmlElement.note4) {
		this.htmlElement.readOn4.addEventListener('mouseenter', () => this.mouseEnterNote4());
		this.htmlElement.readOn4.addEventListener('mouseleave', () => this.mouseLeaveNote4());
		this.htmlElement.readOn4.addEventListener('click', () => this.showNote5());	
	}

	document.addEventListener('keydown', (e) => this.onKeyDown(e));
}	

note = new App();
note.observers();


