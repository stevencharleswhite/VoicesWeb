"use strict";

var TWO_OVER_SIN_PI_OVER_7_PLUS_2 = 6.609529741924973;

function PickerSevenClock() {
    thePickerCanvas.classList.remove("touchActionNone");
    thePickerCanvas.classList.add("touchActionPanY");
    pickerNullSelectionString = pickerNullSelectionStringConstantNothingSelected;

    Object.defineProperty(this, "type",
    {
        get: function () {
            return "PickerSevenClock";
        }
    });

    Object.defineProperty(this, "isThereASelection",
    {
    	get: function () {
    		return (pickerSelectionString !== '');
    	}
    });
}
PickerSevenClock.prototype.onLayoutChangedThis = function () {
    toneRadius = (thePickerCanvas.width) / TWO_OVER_SIN_PI_OVER_7_PLUS_2;
    var theCanvasCenter = thePickerCanvas.width / 2.0;
    for (var index = 0; index < 7; ++index) {
        var theta = index / 3.5 * Math.PI;
        var toneCenterX = theCanvasCenter + Math.sin(theta) * (theCanvasCenter - toneRadius);
        var toneCenterY = theCanvasCenter - Math.cos(theta) * (theCanvasCenter - toneRadius);
        toneCenters[index] = [toneCenterX, toneCenterY];
    }
    if (selectionMessage !== null) selectionMessage.style.fontSize = toneRadius + "px";
    --toneRadius; // shrink a little so the stroke fits inside the bounds of the canvas.
    this.redrawThis();
};
PickerSevenClock.prototype.redrawThis = function () {
    if (pickerThis === null || pickerThis.type !== "PickerSevenClock") return;

    thePickerCanvasContext.clearRect(0, 0, thePickerCanvas.width, thePickerCanvas.height);

    if (selectedToneIndex !== -1) {
        indicateSelection(selectedToneIndex);
    }

    thePickerCanvasContext.fillStyle = "#666666";
    thePickerCanvasContext.font = toneRadius + "px Verdana, Arial, Helvetica, sans-serif";
    thePickerCanvasContext.textBaseline = "middle";
    thePickerCanvasContext.textAlign = "center";

    var toneCenterIndex = 0;
    for (var index = 0; index < 12; ++index) {
        var toneCenterX = toneCenters[toneCenterIndex][0];
        var toneCenterY = toneCenters[toneCenterIndex][1];

        if (_NOTE_CLOCK[index] !== '') { // Checking _NOTE_CLOCK works for interval picker, too.
            thePickerCanvasContext.fillText((answerKind.indexOf("NOTE") != -1) ? _NOTE_CLOCK[index] : _INTERVAL_CLOCK[index], toneCenterX, toneCenterY);
            ++toneCenterIndex;
        }
    }

    if (hoveredToneIndex !== -1) {
        indicateHover();
    }
    //thePickerCanvasContext.fillText(++numredraws, 30, 30);
};
PickerSevenClock.prototype.onPointerDownThis = function (evt) {
    highlightColor = pointerHighlightColor;
    var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
    var pointerY = evt.pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
    selectedToneIndex = hoveredToneIndex;
    this.redrawThis();
    evt.preventDefault();
}
PickerSevenClock.prototype.onPointerMoveThis = function (evt) {
    highlightColor = pointerHighlightColor;
    if (evt.pointerType == "mouse") {
        var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
        var pointerY = evt.pageY - thePickerCanvas.offsetTop;
        this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
        this.redrawThis();
    }
    evt.preventDefault();
}
PickerSevenClock.prototype.onPointerUpThis = function (evt) {
    onUpOrEnd();
    evt.preventDefault();
}
PickerSevenClock.prototype.onPointerLeaveThis = function (evt) {
    if (evt.pointerType == "mouse") {
        onLeaveOrCancel();
    }
    evt.preventDefault();
}
PickerSevenClock.prototype.onTouchStartThis = function (evt) {
    highlightColor = touchHighlightColor;
    if (touchId !== -1) return;
    var touches = evt.changedTouches;
    touchId = touches[0].identifier;
    var touchX = touches[0].pageX - thePickerCanvas.offsetLeft;
    var touchY = touches[0].pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(touchX, touchY, false);
    selectedToneIndex = hoveredToneIndex;
    this.redrawThis();
    evt.preventDefault();
}
PickerSevenClock.prototype.onTouchEndThis = function (evt) {
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
PickerSevenClock.prototype.onTouchCancelThis = function (evt) {
    onLeaveOrCancel();
    evt.preventDefault();
}
PickerSevenClock.prototype.onMouseDownThis = function (evt) {
    var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
    var pointerY = evt.pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(pointerX, pointerY, true);
    selectedToneIndex = hoveredToneIndex;
    this.redrawThis();
    evt.preventDefault();
}
PickerSevenClock.prototype.onMouseMoveThis = function (evt) {
    highlightColor = mouseHighlightColor;
    var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
    var pointerY = evt.pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(pointerX, pointerY, true);
    this.redrawThis();
    evt.preventDefault();
}
PickerSevenClock.prototype.onMouseUpThis = function (evt) {
    onUpOrEnd();
    evt.preventDefault();
}
PickerSevenClock.prototype.onMouseLeaveThis = function (evt) {
    onLeaveOrCancel();
    evt.preventDefault();
}
PickerSevenClock.prototype.hitTestThis = function (pointerX, pointerY, usingMouse) {
    hoveredToneIndex = -1;
    for (var index = 0; index < 7; ++index) {
        if (Math.sqrt((toneCenters[index][0] - pointerX) * (toneCenters[index][0] - pointerX) + (toneCenters[index][1] - pointerY) * (toneCenters[index][1] - pointerY)) <= toneRadius) {
            hoveredToneIndex = index;
            hoveringWithMouse = usingMouse;
            return;
        }
    }
}
PickerSevenClock.prototype.clearSelectionAfterSubmitThis = function (evt) {
    selectedToneIndex = -1;
    pickerThis.redrawThis();
}
PickerSevenClock.prototype.selectionChangedThis = function () {
    if (selectedToneIndex !== -1) {
        if (answerKind.indexOf("NOTE") != -1) {
            pickerSelectionString = new Note(_NOTE_CLOCK[_NATURAL_TONE_INDEX[selectedToneIndex]], undefined, undefined, true).name;
        }
        else {
            pickerSelectionString = new Interval(selectedToneIndex + 1, undefined, true).name;
        }
        testSubmitSelection();
    }
    if (!hoveringWithMouse) hoveredToneIndex = -1;
    if (pickerThis !== null) this.redrawThis();
}
PickerSevenClock.prototype.clearHover = function () {
	hoveredToneIndex = -1;
}

function onUpOrEnd() {
    if (selectedToneIndex !== hoveredToneIndex) selectedToneIndex = -1;
    pickerThis.selectionChangedThis();
}

function onLeaveOrCancel(evt) {
    selectedToneIndex = hoveredToneIndex = -1;
    pickerThis.redrawThis();
}