"use strict";

var TWO_OVER_SIN_PI_OVER_12_PLUS_2 = 9.727407956911971;

var errorMessage = undefined;
var negativeIntervalErrorMessage = undefined;
var touchId = -1;
var draggedToneIndex = -1;
var draggedToSelectedDelta = 0;
var showHitErrorForToneIndex = -1;

function hookUpPickerToUI() {
	errorMessage = document.getElementById("errorMessage");
	negativeIntervalErrorMessage = document.getElementById("negativeIntervalErrorMessage");

	//if (!window.PointerEvent) {
	//    if (window.TouchEvent) {
	//        thePickerCanvas.addEventListener("touchmove", onTouchMove);
	//    }
	//}
}

function PickerTwelveClock() {
    this._minimumSelection = '';
    thePickerCanvas.classList.remove("touchActionPanY");
    thePickerCanvas.classList.add("touchActionNone");
    pickerNullSelectionString = pickerNullSelectionStringConstantNothingSelected;

	Object.defineProperty(this, "type",
    {
    	get: function () {
    		return "PickerTwelveClock";
    	}
    });

	Object.defineProperty(this, "minimumSelection",
    {
    	set: function (value) {
    		this._minimumSelection = value;
    		pickerSelectionString = this._minimumSelection;
    		updateSelectionMessage();
    	}
    });

	Object.defineProperty(this, "isThereASelectionInternal",
    {
    	get: function () {
    		return (draggedToneIndex !== -1 && selectedToneIndex !== -1);
    	}
    });

	Object.defineProperty(this, "isThereASelection",
    {
    	get: function () {
    		return (pickerSelectionString !== this._minimumSelection);
    	}
    });
}
PickerTwelveClock.prototype.onLayoutChangedThis = function () {
	toneRadius = thePickerCanvas.width / TWO_OVER_SIN_PI_OVER_12_PLUS_2;
	var theCanvasCenter = thePickerCanvas.width / 2.0;
	for (var index = 0; index < 12; ++index) {
		var theta = index / 6.0 * Math.PI;
		var toneCenterX = theCanvasCenter + Math.sin(theta) * (theCanvasCenter - toneRadius);
		var toneCenterY = theCanvasCenter - Math.cos(theta) * (theCanvasCenter - toneRadius);
		toneCenters[index] = [toneCenterX, toneCenterY];
	}
	if (selectionMessage !== null) selectionMessage.style.fontSize = toneRadius + "px";
	--toneRadius; // shrink a little so the stroke fits inside the bounds of the canvas.
	this.redrawThis();
};
PickerTwelveClock.prototype.redrawThis = function () {
    if (pickerThis === null || pickerThis.type !== "PickerTwelveClock") return;

	thePickerCanvasContext.clearRect(0, 0, thePickerCanvas.width, thePickerCanvas.height);

	if (selectedToneIndex !== -1) {
		indicateSelection(selectedToneIndex);
	}

	thePickerCanvasContext.font = toneRadius + "px Verdana, Arial, Helvetica, sans-serif";
	thePickerCanvasContext.textBaseline = "middle";
	thePickerCanvasContext.textAlign = "center";
	for (var index = 0; index < 12; ++index) {
		var toneCenterX = toneCenters[index][0];
		var toneCenterY = toneCenters[index][1];

		thePickerCanvasContext.fillStyle = (draggedToneIndex === -1 || index === draggedToneIndex) ? "#666666" : "#999999";
		if (_NOTE_CLOCK[index] !== '') { // Checking _NOTE_CLOCK works for interval picker, too.
			thePickerCanvasContext.fillText(answerKind.indexOf("NOTE") != -1 ? _NOTE_CLOCK[index] : _INTERVAL_CLOCK[index], toneCenterX, toneCenterY);
		}
		else {
			thePickerCanvasContext.beginPath();
			thePickerCanvasContext.arc(toneCenterX, toneCenterY, toneRadius / 6.0, 0, 2 * Math.PI);
			thePickerCanvasContext.closePath();
			thePickerCanvasContext.fill();
		}
	}

	if (hoveredToneIndex !== -1) {
		indicateHover();
	}

	if (showHitErrorForToneIndex !== -1) {
		thePickerCanvasContext.beginPath();
		thePickerCanvasContext.arc(toneCenters[showHitErrorForToneIndex][0], toneCenters[showHitErrorForToneIndex][1], toneRadius * 1.5, 0, 2 * Math.PI);
		thePickerCanvasContext.closePath();
		thePickerCanvasContext.fillStyle = "rgba(255, 0, 0, 0.5)";
		thePickerCanvasContext.fill();
	}
	//thePickerCanvasContext.fillText(++numredraws, 30, 30);
};
PickerTwelveClock.prototype.onPointerDownThis = function (evt) {
	highlightColor = pointerHighlightColor;
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
	selectedToneIndex = -1;
	if (isValidDownOrStartTone()) {
		draggedToneIndex = selectedToneIndex = hitToneIndex;
	}
	this.redrawThis();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onPointerMoveThis = function (evt) {
	highlightColor = pointerHighlightColor;
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
	this.redrawThis();
	if (draggedToneIndex !== -1) indicateDrag(pointerX, pointerY);
	evt.preventDefault();
}
PickerTwelveClock.prototype.onPointerUpThis = function (evt) {
	onUpOrEnd();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onPointerLeaveThis = function (evt) {
	onLeaveOrCancel();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onTouchStartThis = function (evt) {
	highlightColor = touchHighlightColor;
	if (touchId !== -1) return;
	var touches = evt.changedTouches;
	touchId = touches[0].identifier;
	var touchX = touches[0].pageX - thePickerCanvas.offsetLeft;
	var touchY = touches[0].pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, false);
	selectedToneIndex = -1;
	if (isValidDownOrStartTone()) {
		draggedToneIndex = selectedToneIndex = hitToneIndex;
	}
	this.redrawThis();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onTouchEndThis = function (evt) {
	var touches = evt.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		if (touchId === touches[i].identifier) {
			onUpOrEnd();
			touchId = -1;
			break;
		}
	}
	evt.preventDefault();
}
PickerTwelveClock.prototype.onTouchCancelThis = function (evt) {
	onLeaveOrCancel();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onMouseDownThis = function (evt) {
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, true);
	selectedToneIndex = -1;
	if (isValidDownOrStartTone()) {
		draggedToneIndex = selectedToneIndex = hitToneIndex;
	}
	this.redrawThis();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onMouseMoveThis = function (evt) {
	highlightColor = mouseHighlightColor;
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, true);
	this.redrawThis();
	if (draggedToneIndex !== -1) indicateDrag(pointerX, pointerY);
	evt.preventDefault();
}
PickerTwelveClock.prototype.onMouseUpThis = function (evt) {
	onUpOrEnd();
	evt.preventDefault();
}
PickerTwelveClock.prototype.onMouseLeaveThis = function (evt) {
	onLeaveOrCancel();
	evt.preventDefault();
}
PickerTwelveClock.prototype.hitTestThis = function (pointerX, pointerY, usingMouse) {
	hitToneIndex = hoveredToneIndex = -1;
	for (var index = 0; index < 12; ++index) {
		if (Math.sqrt((toneCenters[index][0] - pointerX) * (toneCenters[index][0] - pointerX) + (toneCenters[index][1] - pointerY) * (toneCenters[index][1] - pointerY)) <= toneRadius) {
			if (draggedToneIndex !== -1 || _NOTE_CLOCK[index] !== '') { // Checking _NOTE_CLOCK works for interval picker, too.
				hoveredToneIndex = index;
				hoveringWithMouse = usingMouse;
			}
			hitToneIndex = index;
			return;
		}
	}
}
PickerTwelveClock.prototype.clearSelectionAfterSubmitThis = function (evt) {
	draggedToneIndex = -1;
	selectedToneIndex = -1;
	pickerSelectionString = this._minimumSelection;
	updateSelectionMessage();
	pickerThis.redrawThis();
}
PickerTwelveClock.prototype.selectionChangedThis = function () {
	if (negativeIntervalErrorMessage !== null) negativeIntervalErrorMessage.style.visibility = "hidden";

	if (this.isThereASelectionInternal) {
		updateDraggedToSelectedDelta();

		if (answerKind.indexOf("INTERVAL") != -1 && draggedToneIndex + draggedToSelectedDelta < 0) {
			negativeIntervalErrorMessage.style.visibility = "visible";
			showHitErrorForToneIndex = hitToneIndex;
			selectedToneIndex = -1;
			window.setTimeout(function (thisPointer) {
				showHitErrorForToneIndex = -1;
				thisPointer.redrawThis();
			}, 750, this);
		}
	}

	var currentSelectionAsString = this.makeCurrentSelectionIntoString();

	// Update the selection string from the current selection.
	if (answerKind.indexOf("SEQUENCE") != -1) {
		if (currentSelectionAsString.length != 0) {
			if (pickerSelectionString.length != 0) pickerSelectionString += ' ';
			pickerSelectionString += currentSelectionAsString;
		}
	}
	else {
		pickerSelectionString = currentSelectionAsString;
	}

	if (shouldPickerAutoSubmit) {
		if (this.isThereASelectionInternal) {
		    testSubmitSelection();
		}
	}
	else {
		updateSelectionMessage();
	}
	draggedToneIndex = -1;
	if (!hoveringWithMouse) hoveredToneIndex = -1;
	if (pickerThis !== null) this.redrawThis();
}
PickerTwelveClock.prototype.backspaceSelectionThis = function () {
	if (pickerSelectionString.indexOf(' ') != -1) {
		pickerSelectionString = pickerSelectionString.substring(0, pickerSelectionString.lastIndexOf(' '));
		this.selectionChangedThis();
	}
	else this.clearSelectionAfterSubmitThis();
}
PickerTwelveClock.prototype.makeCurrentSelectionIntoString = function () {
	if (this.isThereASelectionInternal) {
		if (answerKind.indexOf("NOTE") != -1) return new Note(_NOTE_CLOCK[draggedToneIndex], draggedToSelectedDelta, 4, false).name;
		if (answerKind.indexOf("INTERVAL") != -1) return new Interval(_NATURAL_TONE_INDEX.indexOf(draggedToneIndex) + 1, draggedToSelectedDelta, false).name;
	}
	return '';
}
PickerTwelveClock.prototype.clearHover = function () {
	hoveredToneIndex = -1;
}

function onUpOrEnd() {
	if (draggedToneIndex !== -1) {
		selectedToneIndex = hitToneIndex;
		++selectionIndicatorTimeoutToken;

		if (answerKind.indexOf("SEQUENCE") != -1) {
			window.setTimeout(function (thisPointer, selectionIndicatorTimeoutTokenAtTheTime) {
				if (selectionIndicatorTimeoutToken === selectionIndicatorTimeoutTokenAtTheTime) {
					selectedToneIndex = -1; thisPointer.redrawThis();
				}
			}, 750, pickerThis, selectionIndicatorTimeoutToken);
		}
	}
	pickerThis.selectionChangedThis();
}

function onLeaveOrCancel() {
	hoveredToneIndex = -1;
	if (draggedToneIndex !== -1) {
		selectedToneIndex = -1;
		pickerThis.selectionChangedThis();
	}
	pickerThis.redrawThis();
}

//function onTouchMove(evt) {
//    var touches = evt.changedTouches;
//    for (var i = 0; i < touches.length; i++) {
//        if (touchId === touches[i].identifier) {
//            var touchX = touches[i].pageX - thePickerCanvas.offsetLeft;
//            var touchY = touches[i].pageY - thePickerCanvas.offsetTop;
//            pickerThis.hitTestThis(pointerX, pointerY, false);
//            this.redrawThis();
//            if (draggedToneIndex !== -1) indicateDrag(touchX, touchY);
//            break;
//        }
//    }

//    evt.preventDefault();
//}

function updateDraggedToSelectedDelta() {
	draggedToSelectedDelta = selectedToneIndex - draggedToneIndex;

	// This logic effectively reverses the direction of the delta if it's greater than 6 up or less than 5 down.
	// This includes the case where the delta crosses the 11/1 discontinuity.
	if (draggedToSelectedDelta > 6) {
		draggedToSelectedDelta -= 12;
	}
	else if (draggedToSelectedDelta < -5) {
		draggedToSelectedDelta += 12;
	}
}

function isValidDownOrStartTone() {
	if (_NOTE_CLOCK[hitToneIndex] == '' && showHitErrorForToneIndex === -1) {
		showHitErrorForToneIndex = hitToneIndex;
		errorMessage.style.visibility = "visible";
		window.setTimeout(function () { showHitErrorForToneIndex = -1; pickerThis.redrawThis(); }, 500);
		return false;
	}
	else {
		errorMessage.style.visibility = "hidden";
		return true;
	}
}

function indicateDrag(centerX, centerY) {
	thePickerCanvasContext.beginPath();
	thePickerCanvasContext.arc(centerX, centerY, toneRadius * 1.5, 0, 2 * Math.PI);
	thePickerCanvasContext.closePath();
	thePickerCanvasContext.fillStyle = highlightColor;
	thePickerCanvasContext.fill();
}