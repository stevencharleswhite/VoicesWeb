"use strict";

var hitDegreeQuantityIndex = -1;
var hitDegreeAlterationIndex = -1;
var hoveredDegreeQuantityIndex = -1;
var hoveredDegreeAlterationIndex = -1;
var selectedDegreeQuantityIndex = -1;
var selectedDegreeAlterationIndex = -1;

function PickerFormulaDegree(pickerNullSelectionStringConstant) {
    this._minimumSelection = '';
    this.buttonTops = [];
    this.buttonWidths = [];
    this.buttonTuples = [[], [], [], [], [], [], []]; // each sub-array contains 1-4 of [left edge of the button bounds, degreeName, interval].
    this.buttonHeight = undefined;
    this.buttonMargin = undefined;
    this.numButtonRows = this.buttonTuples.length;
    this.lowestQuantity = 2;
    pickerNullSelectionString = pickerNullSelectionStringConstantNothingSelected;
    if (pickerNullSelectionStringConstant !== undefined) pickerNullSelectionString = pickerNullSelectionStringConstant;

    updateSelectionMessage();
    thePickerCanvas.classList.remove("touchActionNone");
    thePickerCanvas.classList.add("touchActionPanY");

    if (answerKind === PICKER_KIND_TONIC_CHORD_FORMULA) --this.numButtonRows;
    if (answerKind === PICKER_KIND_FORMULA_DEGREE_SHORT || answerKind === PICKER_KIND_FORMULA_DEGREE_SEQUENCE_SHORT || answerKind === PICKER_KIND_CHORD_FORMULA) --this.lowestQuantity;

    thePickerCanvasContext.lineWidth = 1;

    for (var quantity = this.lowestQuantity; quantity < this.lowestQuantity + this.numButtonRows; ++quantity) {
        for (var alteration = 0; alteration < _DEGREE_DICTIONARY[quantity - 1].length; ++alteration) {
            var degreeAsString = quantity;
            if (quantity === 8) degreeAsString = "1'";
            this.buttonTuples[quantity - this.lowestQuantity][alteration] = [0, lookUpDegree(quantity, alteration), lookUpInterval(quantity, alteration)];
        }
    }

    Object.defineProperty(this, "type",
    {
        get: function () {
            return "PickerFormulaDegree";
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
            return (selectedDegreeQuantityIndex !== -1 && selectedDegreeAlterationIndex !== -1);
        }
    });

    Object.defineProperty(this, "isThereASelection",
    {
        get: function () {
            return (pickerSelectionString !== this._minimumSelection);
        }
    });
}
PickerFormulaDegree.prototype.onLayoutChangedThis = function () {
    fontSize = thePickerCanvas.height * 0.1;
    this.buttonHeight = Math.floor(thePickerCanvas.height / this.numButtonRows);
    this.buttonMargin = Math.round(this.buttonHeight / 10);
    this.buttonHeight -= this.buttonMargin * 2;
    var topmostMargin = Math.round((thePickerCanvas.height - (this.buttonHeight * this.numButtonRows + this.buttonMargin * (this.numButtonRows - 1) * 2)) / 2);

    thePickerCanvasContext.font = fontSize + "px Verdana, Arial, Helvetica, sans-serif";
    selectionMessage.style.fontSize = fontSize + "px";

    for (var quantity = this.lowestQuantity; quantity < this.lowestQuantity + this.numButtonRows; ++quantity) {
    	this.buttonTops[quantity - this.lowestQuantity] = (quantity - this.lowestQuantity) * (this.buttonHeight + this.buttonMargin * 2) + topmostMargin + 0.5;
        var numButtons = _DEGREE_DICTIONARY[quantity - 1].length;
        this.buttonWidths[quantity - this.lowestQuantity] = Math.floor(thePickerCanvas.width / numButtons);
        this.buttonWidths[quantity - this.lowestQuantity] -= this.buttonMargin * 2;
        var leftmostMargin = Math.round((thePickerCanvas.width - (this.buttonWidths[quantity - this.lowestQuantity] * numButtons + this.buttonMargin * (numButtons - 1) * 2)) / 2);
        for (var alteration = 0; alteration < numButtons; ++alteration) {
        	var left = alteration * (this.buttonWidths[quantity - this.lowestQuantity] + this.buttonMargin * 2) + leftmostMargin + 0.5;
        	this.buttonTuples[quantity - this.lowestQuantity][alteration][0] = left;
        }
    }
    this.redrawThis();
};
PickerFormulaDegree.prototype.redrawThis = function () {
    if (pickerThis === null || pickerThis.type !== "PickerFormulaDegree") return;

    thePickerCanvasContext.clearRect(0, 0, thePickerCanvas.width, thePickerCanvas.height);

    //thePickerCanvasContext.rect(0, 0, thePickerCanvas.width, thePickerCanvas.height);
    //thePickerCanvasContext.fillStyle = "rgba(100, 100, 200, 0.4)";
    //thePickerCanvasContext.fill();

    if (selectedDegreeQuantityIndex !== -1 && selectedDegreeAlterationIndex !== -1) {
        this.indicateSelectionThis();
    }

    thePickerCanvasContext.textBaseline = "middle";
    thePickerCanvasContext.textAlign = "center";
    //thePickerCanvasContext.strokeStyle = highlightColor;
    thePickerCanvasContext.fillStyle = "#666666";

    for (var quantity = this.lowestQuantity; quantity < this.lowestQuantity + this.numButtonRows; ++quantity) {
    	var top = this.buttonTops[quantity - this.lowestQuantity];
        for (var alteration = 0; alteration < _DEGREE_DICTIONARY[quantity - 1].length; ++alteration) {
        	var left = this.buttonTuples[quantity - this.lowestQuantity][alteration][0];
            //thePickerCanvasContext.beginPath();
        	//thePickerCanvasContext.rect(left, top, this.buttonWidths[quantity - this.lowestQuantity], this.buttonHeight);
            //thePickerCanvasContext.closePath();
            //thePickerCanvasContext.stroke();
        	thePickerCanvasContext.fillText(this.buttonTuples[quantity - this.lowestQuantity][alteration][1], left + this.buttonWidths[quantity - this.lowestQuantity] / 2, top + this.buttonHeight / 2);
        }
    }

    if (hoveredDegreeQuantityIndex !== -1 && hoveredDegreeAlterationIndex !== -1) {
        this.indicateHoverThis();
    }
    //thePickerCanvasContext.fillText(++numredraws, 30, 30);
};
PickerFormulaDegree.prototype.onPointerDownThis = function (evt) {
	highlightColor = pointerHighlightColor;
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
    var pointerY = evt.pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
    selectedDegreeQuantityIndex = hoveredDegreeQuantityIndex;
    selectedDegreeAlterationIndex = hoveredDegreeAlterationIndex;
    this.redrawThis();
    evt.preventDefault();
}
PickerFormulaDegree.prototype.onPointerMoveThis = function (evt) {
    highlightColor = pointerHighlightColor;
    if (evt.pointerType == "mouse") {
        var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
        var pointerY = evt.pageY - thePickerCanvas.offsetTop;
        this.hitTestThis(pointerX, pointerY, evt.pointerType == "mouse");
        this.redrawThis();
    }
    evt.preventDefault();
}
PickerFormulaDegree.prototype.onPointerUpThis = function (evt) {
	onUpOrEnd();
	evt.preventDefault();
}
PickerFormulaDegree.prototype.onPointerLeaveThis = function (evt) {
	if (evt.pointerType == "mouse") {
		onLeaveOrCancel();
	}
	evt.preventDefault();
}
PickerFormulaDegree.prototype.onTouchStartThis = function (evt) {
    highlightColor = touchHighlightColor;
    if (touchId !== -1) return;
    var touches = evt.changedTouches;
    touchId = touches[0].identifier;
    var touchX = touches[0].pageX - thePickerCanvas.offsetLeft;
    var touchY = touches[0].pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(pointerX, pointerY, false);
    selectedDegreeQuantityIndex = hoveredDegreeQuantityIndex;
    selectedDegreeAlterationIndex = hoveredDegreeAlterationIndex;
    this.redrawThis();
    evt.preventDefault();
}
PickerFormulaDegree.prototype.onTouchEndThis = function (evt) {
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
PickerFormulaDegree.prototype.onTouchCancelThis = function (evt) {
    selectedDegreeQuantityIndex = selectedDegreeAlterationIndex = hoveredDegreeQuantityIndex = hoveredDegreeAlterationIndex = -1;
    this.redrawThis();

    evt.preventDefault();
}
PickerFormulaDegree.prototype.onMouseDownThis = function (evt) {
	var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
	var pointerY = evt.pageY - thePickerCanvas.offsetTop;
	this.hitTestThis(pointerX, pointerY, true);
	selectedDegreeQuantityIndex = hoveredDegreeQuantityIndex;
	selectedDegreeAlterationIndex = hoveredDegreeAlterationIndex;
	this.redrawThis();
	evt.preventDefault();
}
PickerFormulaDegree.prototype.onMouseMoveThis = function (evt) {
    highlightColor = mouseHighlightColor;
    var pointerX = evt.pageX - thePickerCanvas.offsetLeft;
    var pointerY = evt.pageY - thePickerCanvas.offsetTop;
    this.hitTestThis(pointerX, pointerY, true);
    this.redrawThis();
    evt.preventDefault();
}
PickerFormulaDegree.prototype.onMouseUpThis = function (evt) {
	onUpOrEnd();
	evt.preventDefault();
}
PickerFormulaDegree.prototype.onMouseLeaveThis = function (evt) {
	onLeaveOrCancel();
	evt.preventDefault();
}
PickerFormulaDegree.prototype.hitTestThis = function (pointerX, pointerY, usingMouse) {
    hoveredDegreeQuantityIndex = -1;
    hoveredDegreeAlterationIndex = -1;
    for (var quantity = this.lowestQuantity; quantity < this.lowestQuantity + this.numButtonRows; ++quantity) {
    	var top = this.buttonTops[quantity - this.lowestQuantity];
        if (pointerY >= top && pointerY <= top + this.buttonHeight) {
            for (var alteration = 0; alteration < _DEGREE_DICTIONARY[quantity - 1].length; ++alteration) {
            	var left = this.buttonTuples[quantity - this.lowestQuantity][alteration][0];
            	if (pointerX >= left && pointerX <= left + this.buttonWidths[quantity - this.lowestQuantity]) {
                	hoveredDegreeQuantityIndex = quantity - this.lowestQuantity;
                    hoveredDegreeAlterationIndex = alteration;
                    hoveringWithMouse = usingMouse;
                    return;
                }
            }
        }
    }
}
PickerFormulaDegree.prototype.clearSelectionAfterSubmitThis = function (evt) {
    selectedDegreeQuantityIndex = selectedDegreeAlterationIndex = -1;
    pickerSelectionString = this._minimumSelection;
    updateSelectionMessage();
    pickerThis.redrawThis();
}
PickerFormulaDegree.prototype.selectionChangedThis = function (evt) {
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
    if (!hoveringWithMouse) hoveredDegreeQuantityIndex = hoveredDegreeAlterationIndex = -1;
	this.redrawThis();
}
PickerFormulaDegree.prototype.backspaceSelectionThis = function () {
	if (pickerSelectionString.indexOf(' ') != -1) {
		pickerSelectionString = pickerSelectionString.substring(0, pickerSelectionString.lastIndexOf(' '));
		this.selectionChangedThis();
	}
	else this.clearSelectionAfterSubmitThis();
}
PickerFormulaDegree.prototype.indicateSelectionThis = function (pointerX, pointerY) {
    var top = this.buttonTops[selectedDegreeQuantityIndex];
    var left = this.buttonTuples[selectedDegreeQuantityIndex][selectedDegreeAlterationIndex][0];
    thePickerCanvasContext.beginPath();
    thePickerCanvasContext.rect(left, top, this.buttonWidths[selectedDegreeQuantityIndex], this.buttonHeight);
    thePickerCanvasContext.closePath();
    thePickerCanvasContext.fillStyle = highlightColor;
    thePickerCanvasContext.fill();
}
PickerFormulaDegree.prototype.indicateHoverThis = function () {
    var top = this.buttonTops[hoveredDegreeQuantityIndex];
    var left = this.buttonTuples[hoveredDegreeQuantityIndex][hoveredDegreeAlterationIndex][0];
    thePickerCanvasContext.beginPath();
    thePickerCanvasContext.rect(left, top, this.buttonWidths[hoveredDegreeQuantityIndex], this.buttonHeight);
    thePickerCanvasContext.closePath();
    thePickerCanvasContext.strokeStyle = "#666666";
    thePickerCanvasContext.stroke();
}
PickerFormulaDegree.prototype.makeCurrentSelectionIntoString = function () {
    if (this.isThereASelectionInternal) {
        return this.buttonTuples[selectedDegreeQuantityIndex][selectedDegreeAlterationIndex][1];
    }
    return '';
}
PickerFormulaDegree.prototype.clearHover = function () {
	hoveredDegreeQuantityIndex = hoveredDegreeAlterationIndex = -1;
}

function onUpOrEnd() {
    if (selectedDegreeQuantityIndex !== hoveredDegreeQuantityIndex || selectedDegreeAlterationIndex !== hoveredDegreeAlterationIndex) {
		selectedDegreeQuantityIndex = selectedDegreeAlterationIndex = -1;
	}
	else {
		++selectionIndicatorTimeoutToken;

		if (answerKind.indexOf("SEQUENCE") != -1) {
			window.setTimeout(function (thisPointer, selectionIndicatorTimeoutTokenAtTheTime) {
			    if (selectionIndicatorTimeoutToken === selectionIndicatorTimeoutTokenAtTheTime) {
			        selectedDegreeQuantityIndex = selectedDegreeAlterationIndex = -1;
			        thisPointer.redrawThis();
				}
			}, 750, pickerThis, selectionIndicatorTimeoutToken);
		}
	}
	pickerThis.selectionChangedThis();
}

function onLeaveOrCancel(evt) {
	selectedDegreeQuantityIndex = selectedDegreeAlterationIndex = -1;
	hoveredDegreeQuantityIndex = hoveredDegreeAlterationIndex = -1;
	pickerThis.redrawThis();
}