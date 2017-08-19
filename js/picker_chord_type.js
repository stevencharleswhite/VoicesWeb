"use strict";

var hoveredChordRow = -1;
var hoveredChordColumn = -1;
var selectedChordRow = -1;
var selectedChordColumn = -1;

function PickerChordType() {
	this.buttonTops = [];
	this.buttonWidths = [];
	this.buttonTuples = [
        [[0, _DIMINISHED_TRIAD_FORMULA], [0, _MINOR_TRIAD_FORMULA], [0, _MAJOR_TRIAD_FORMULA], [0, _AUGMENTED_TRIAD_FORMULA]],
        [[0, _DIMINISHED_SEVENTH_CHORD_FORMULA], [0, _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA]],
        [[0, _MINOR_SEVENTH_CHORD_FORMULA], [0, _MINOR_MAJOR_SEVENTH_CHORD_FORMULA]],
        [[0, _DOMINANT_SEVENTH_CHORD_FORMULA], [0, _MAJOR_SEVENTH_CHORD_FORMULA]],
        [[0, _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA]],
        [[0, _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA], [0, _AUGMENTED_SEVENTH_CHORD_FORMULA]]
	];
	this.buttonHeight = undefined;
	this.buttonMargin = undefined;
	thePickerCanvas.classList.remove("touchActionNone");
	thePickerCanvas.classList.add("touchActionPanY");
	thePickerCanvasContext.lineWidth = 1;
	pickerNullSelectionString = pickerNullSelectionStringConstantNothingSelected;

	Object.defineProperty(this, "type",
    {
    	get: function () {
    		return "PickerChordType";
    	}
    });

	Object.defineProperty(this, "isThereASelection",
    {
    	get: function () {
    		return (pickerSelectionString !== '');
    	}
    });
}
PickerChordType.prototype.onLayoutChangedThis = function () {
	fontSize = thePickerCanvas.height * 0.1;
	this.buttonHeight = Math.floor(thePickerCanvas.height / (this.buttonTuples.length + 1));
	this.buttonMargin = Math.round(this.buttonHeight / 10);
	this.buttonHeight -= this.buttonMargin * 2;
	var topmostMargin = Math.round((thePickerCanvas.height - (this.buttonHeight * this.buttonTuples.length + this.buttonMargin * (this.buttonTuples.length - 1) * 2)) / 2);

	thePickerCanvasContext.font = fontSize + "px Verdana, Arial, Helvetica, sans-serif";

	for (var row = 0; row < this.buttonTuples.length; ++row) {
		this.buttonTops[row] = row * (this.buttonHeight + this.buttonMargin * 2) + topmostMargin + 0.5;
		var numCols = this.buttonTuples[row].length;
		this.buttonWidths[row] = Math.floor(thePickerCanvas.width / numCols);
		this.buttonWidths[row] -= this.buttonMargin * 2;
		var leftmostMargin = Math.round((thePickerCanvas.width - (this.buttonWidths[row] * numCols + this.buttonMargin * (numCols - 1) * 2)) / 2);
		for (var col = 0; col < numCols; ++col) {
			var left = col * (this.buttonWidths[row] + this.buttonMargin * 2) + leftmostMargin + 0.5;
			this.buttonTuples[row][col][0] = left;
		}
	}
	this.redrawThis();
};
PickerChordType.prototype.redrawThis = function () {
	if (pickerThis === null || pickerThis.type !== "PickerChordType") return;

	thePickerCanvasContext.clearRect(0, 0, thePickerCanvas.width, thePickerCanvas.height);

	//thePickerCanvasContext.rect(0, 0, thePickerCanvas.width, thePickerCanvas.height);
	//thePickerCanvasContext.fillStyle = "rgba(100, 100, 200, 0.4)";
	//thePickerCanvasContext.fill();

	if (selectedChordRow !== -1 && selectedChordColumn !== -1) {
		this.indicateSelectionThis();
	}

	thePickerCanvasContext.textBaseline = "middle";
	thePickerCanvasContext.textAlign = "center";
	thePickerCanvasContext.fillStyle = "#666666";

	for (var row = 0; row < this.buttonTuples.length; ++row) {
		var top = this.buttonTops[row];
		var numCols = this.buttonTuples[row].length;
		for (var col = 0; col < numCols; ++col) {
			var left = this.buttonTuples[row][col][0];
			thePickerCanvasContext.fillText(this.buttonTuples[row][col][1].shortName, left + this.buttonWidths[row] / 2, top + this.buttonHeight / 2);
		}
	}

	if (hoveredChordRow !== -1 && hoveredChordColumn !== -1) {
		this.indicateHoverThis();
	}
	//thePickerCanvasContext.fillText(++numredraws, 30, 30);
};
PickerChordType.prototype.onPointerDownThis = function (evt) {
	highlightColor = pointerHighlightColor;
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
	selectedChordRow = hoveredChordRow;
	selectedChordColumn = hoveredChordColumn;
	this.redrawThis();
	evt.preventDefault();
}
PickerChordType.prototype.onPointerMoveThis = function (evt) {
	highlightColor = pointerHighlightColor;
	if (evt.pointerType == "mouse") {
		var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
		var pointerY = evt.pageY - thePickerCanvas.offsetTop;
		this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
		this.redrawThis();
	}
	evt.preventDefault();
}
PickerChordType.prototype.onPointerUpThis = function (evt) {
	onUpOrEnd();
	evt.preventDefault();
}
PickerChordType.prototype.onPointerLeaveThis = function (evt) {
	if (evt.pointerType == "mouse") {
		onLeaveOrCancel();
	}
	evt.preventDefault();
}
PickerChordType.prototype.onTouchStartThis = function (evt) {
	highlightColor = touchHighlightColor;
	if (touchId !== -1) return;
	var touches = evt.changedTouches;
	touchId = touches[0].identifier;
	var touchX = touches[0].pageX - thePickerCanvas.offsetLeft;
	var touchY = touches[0].pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, false);
	selectedChordRow = hoveredChordRow;
	selectedChordColumn = hoveredChordColumn;
	this.redrawThis();
	evt.preventDefault();
}
PickerChordType.prototype.onTouchEndThis = function (evt) {
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
PickerChordType.prototype.onTouchCancelThis = function (evt) {
	onLeaveOrCancel();
	evt.preventDefault();
}
PickerChordType.prototype.onMouseDownThis = function (evt) {
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, true);
	selectedChordRow = hoveredChordRow;
	selectedChordColumn = hoveredChordColumn;
	this.redrawThis();
	evt.preventDefault();
}
PickerChordType.prototype.onMouseMoveThis = function (evt) {
	highlightColor = mouseHighlightColor;
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, true);
	this.redrawThis();
	evt.preventDefault();
}
PickerChordType.prototype.onMouseUpThis = function (evt) {
	onUpOrEnd();
	evt.preventDefault();
}
PickerChordType.prototype.onMouseLeaveThis = function (evt) {
	onLeaveOrCancel();
	evt.preventDefault();
}
PickerChordType.prototype.hitTestThis = function (pointerX, pointerY, usingMouse) {
	hoveredChordRow = -1;
	hoveredChordColumn = -1;
	for (var row = 0; row < this.buttonTuples.length; ++row) {
		var top = this.buttonTops[row];
		if (pointerY >= top && pointerY <= top + this.buttonHeight) {
			var numCols = this.buttonTuples[row].length;
			for (var col = 0; col < numCols; ++col) {
				var left = this.buttonTuples[row][col][0];
				if (pointerX >= left && pointerX <= left + this.buttonWidths[row]) {
					hoveredChordRow = row;
					hoveredChordColumn = col;
					hoveringWithMouse = usingMouse;
					return;
				}
			}
		}
	}
}
PickerChordType.prototype.clearSelectionAfterSubmitThis = function (evt) {
	selectedChordRow = selectedChordColumn = -1;
	pickerThis.redrawThis();
}
PickerChordType.prototype.selectionChangedThis = function () {
	if (selectedChordRow !== -1 && selectedChordColumn !== -1) {
		pickerSelectionString = this.buttonTuples[selectedChordRow][selectedChordColumn][1].degreesAsString;
		testSubmitSelection();
	}
	if (!hoveringWithMouse) hoveredChordRow = hoveredChordColumn = -1;
	if (pickerThis !== null) this.redrawThis();
}
PickerChordType.prototype.indicateSelectionThis = function () {
	var top = this.buttonTops[selectedChordRow];
	var left = this.buttonTuples[selectedChordRow][selectedChordColumn][0];
	thePickerCanvasContext.beginPath();
	thePickerCanvasContext.rect(left, top, this.buttonWidths[selectedChordRow], this.buttonHeight);
	thePickerCanvasContext.closePath();
	thePickerCanvasContext.fillStyle = highlightColor;
	thePickerCanvasContext.fill();
}
PickerChordType.prototype.indicateHoverThis = function () {
	var top = this.buttonTops[hoveredChordRow];
	var left = this.buttonTuples[hoveredChordRow][hoveredChordColumn][0];
	thePickerCanvasContext.beginPath();
	thePickerCanvasContext.rect(left, top, this.buttonWidths[hoveredChordRow], this.buttonHeight);
	thePickerCanvasContext.closePath();
	thePickerCanvasContext.strokeStyle = "#666666";
	thePickerCanvasContext.stroke();
}
PickerChordType.prototype.clearHover = function () {
	hoveredChordRow = hoveredChordColumn = -1;
}

function onUpOrEnd() {
	if (selectedChordRow !== hoveredChordRow || selectedChordColumn !== hoveredChordColumn) selectedChordRow = selectedChordColumn = -1;
	pickerThis.selectionChangedThis();
}

function onLeaveOrCancel(evt) {
	selectedChordRow = selectedChordColumn = -1;
	hoveredChordRow = hoveredChordColumn = -1;
	pickerThis.redrawThis();
}