"use strict";

var numredraws = 0;

var pickerSelectionString = ''; // all pickers record their selection in the form of this string.
var pickerNullSelectionStringConstantNothingSelected = "Nothing selected";
var pickerNullSelectionStringConstantNone = "None";
var pickerNullSelectionString = pickerNullSelectionStringConstantNothingSelected;

// The string literals contain encoded instructions to the picker. These values mean that the particular picker should be used to select and submit...
var PICKER_KIND_NOTE = "NOTE"; // ...a note.
var PICKER_KIND_CHORD = "NOTE_SEQUENCE"; // ...a sequence of notes forming a chord.
var PICKER_KIND_INTERVAL = "INTERVAL"; // ...an interval.
var PICKER_KIND_FORMULA_DEGREE = "FORMULA_DEGREE"; // ...a formula degree.
var PICKER_KIND_FORMULA_DEGREE_SHORT = "FORMULA_DEGREE_SHORT"; // ...a formula degree (from a bank of buttons that lacks "1'").
var PICKER_KIND_FORMULA_DEGREE_SEQUENCE = "FORMULA_DEGREE_SEQUENCE"; // ...an arbitrary sequence of formula degrees.
var PICKER_KIND_FORMULA_DEGREE_SEQUENCE_SHORT = "FORMULA_DEGREE_SEQUENCE_SHORT"; // ...an arbitrary sequence of formula degrees (from a bank of buttons that lacks "1'").
var PICKER_KIND_SCALE_FORMULA = "SCALE_FORMULA_DEGREE_SEQUENCE"; // ...a sequence of formula degrees forming a scale formula.
var PICKER_KIND_TONIC_CHORD_FORMULA = "TONIC_CHORD_FORMULA_DEGREE_SEQUENCE"; // ...a sequence of formula degrees, assumed to begin on 1, forming a chord formula.
var PICKER_KIND_CHORD_FORMULA = "CHORD_FORMULA_DEGREE_SEQUENCE"; // ...a sequence of formula degrees, beginning on any scale formula degree, forming a chord formula.
var PICKER_KIND_SCALE_DEGREE_ORDINAL_NUMBER = "SCALE_DEGREE_ORDINAL_NUMBER"; // ...a cardinal number (usually in the range 1-7) used as if it's an ordinal representing a degree of a (usually heptatonic) scale.
var PICKER_KIND_CHORD_TYPE = "CHORD_TYPE"; // ...a chord type (e.g. major triad, dominant seventh, etc.).

var thePickerCanvas = undefined;
var thePickerCanvasContext = undefined;
var selectionMessage = undefined;

var shouldPickerAutoSubmit = undefined;

var highlightColor = pointerHighlightColor;
var pointerHighlightColor = "rgba(100, 100, 200, 0.4)";
var touchHighlightColor = "rgba(200, 100, 100, 0.4)";
var mouseHighlightColor = "rgba(100, 200, 100, 0.4)";

// vars for button pickers
var selectionIndicatorTimeoutToken = -1;
var fontSize = undefined;

// vars for clock pickers
var toneRadius = 0;
var toneCenters = [];
var hitToneIndex = -1;
var hoveredToneIndex = -1;
var hoveringWithMouse = undefined;
var selectedToneIndex = -1;

var pickerThis = null;

function hookUpPickerToUIBase() {
    thePickerCanvas = document.getElementById("thePickerCanvas");
    selectionMessage = document.getElementById("selectionMessage");

    if (thePickerCanvas.getContext) {
        thePickerCanvasContext = thePickerCanvas.getContext('2d');
        if (window.PointerEvent) {
            thePickerCanvas.addEventListener("pointerdown", onPointerDown);
            thePickerCanvas.addEventListener("pointermove", onPointerMove);
            thePickerCanvas.addEventListener("pointerup", onPointerUp);
            thePickerCanvas.addEventListener("pointerleave", onPointerLeave);
        }
        else {
            //if (window.TouchEvent) {
            //    thePickerCanvas.addEventListener("touchstart", onTouchStart);
            //    thePickerCanvas.addEventListener("touchend", onTouchEnd);
            //    thePickerCanvas.addEventListener("touchcancel", onTouchCancel);
            //}
            thePickerCanvas.addEventListener("mousedown", onMouseDown);
            thePickerCanvas.addEventListener("mousemove", onMouseMove);
            thePickerCanvas.addEventListener("mouseup", onMouseUp);
            thePickerCanvas.addEventListener("mouseleave", onMouseLeave);
        }
    }
    hookUpPickerToUI();
}

function hookUpPickerToUI() {
    // override this to hook up to custom UI (settings, etc.).
}

window.addEventListener("resize", function () {
    pickerOnLayoutChangedBase();
});

function pickerOnLayoutChangedBase() {
    thePickerCanvas.width = Math.min(420, document.body.clientWidth);
    thePickerCanvas.height = thePickerCanvas.width;
    if (pickerThis !== null) {
        pickerThis.onLayoutChangedThis();
    }
    else {
        drawQuestionSeriesResults();
    }
}

function updateSelectionMessage() {
    if (selectionMessage !== null) {
        if (pickerSelectionString.length == 0) {
        	selectionMessage.innerText = pickerNullSelectionString;
		}
        else {
            selectionMessage.innerText = pickerSelectionString;
        }
    }
}

function pickerClearSelectionBase() {
    pickerSelectionString = '';
    updateSelectionMessage();
    pickerThis.clearSelectionAfterSubmitThis();
}

function pickerBackspaceSelectionBase() {
    pickerThis.backspaceSelectionThis();
}

function onPointerDown(evt) { if (pickerThis !== null) pickerThis.onPointerDownThis(evt); }
function onPointerMove(evt) { if (pickerThis !== null) pickerThis.onPointerMoveThis(evt); }
function onPointerUp(evt) { if (pickerThis !== null) pickerThis.onPointerUpThis(evt); }
function onPointerLeave(evt) { if (pickerThis !== null) pickerThis.onPointerLeaveThis(evt); }

function onTouchStart(evt) { if (pickerThis !== null) pickerThis.onTouchStartThis(evt); }
function onTouchEnd(evt) { if (pickerThis !== null) pickerThis.onTouchEndThis(evt); }
function onTouchCancel(evt) { if (pickerThis !== null) pickerThis.onTouchCancelThis(evt); }

function onMouseDown(evt) { if (pickerThis !== null) pickerThis.onMouseDownThis(evt); }
function onMouseMove(evt) { if (pickerThis !== null) pickerThis.onMouseMoveThis(evt); }
function onMouseUp(evt) { if (pickerThis !== null) pickerThis.onMouseUpThis(evt); }
function onMouseLeave(evt) { if (pickerThis !== null) pickerThis.onMouseLeaveThis(evt); }

// indicateSelection and indicateHover are only used by clock pickers.
function indicateSelection(index) {
    thePickerCanvasContext.beginPath();
    thePickerCanvasContext.arc(toneCenters[index][0], toneCenters[index][1], toneRadius, 0, 2 * Math.PI);
    thePickerCanvasContext.closePath();
    thePickerCanvasContext.fillStyle = highlightColor;
    thePickerCanvasContext.fill();
}

function indicateHover() {
    thePickerCanvasContext.beginPath();
    thePickerCanvasContext.arc(toneCenters[hoveredToneIndex][0], toneCenters[hoveredToneIndex][1], toneRadius, 0, 2 * Math.PI);
    thePickerCanvasContext.closePath();
    thePickerCanvasContext.strokeStyle = "#666666";
    thePickerCanvasContext.stroke();
}

function drawQuestionSeriesResults() {
    thePickerCanvasContext.clearRect(0, 0, thePickerCanvas.width, thePickerCanvas.height);
    var halfWidth = thePickerCanvas.width / 2;
    var halfHeight = thePickerCanvas.height / 2;
    var quarterHeight = thePickerCanvas.height / 4;
    var fontSize = halfWidth / 7;
    var lineSpacing = fontSize * 1.5;
    thePickerCanvasContext.font = fontSize + "px Verdana, Arial, Helvetica, sans-serif";
    thePickerCanvasContext.textBaseline = "middle";
    thePickerCanvasContext.textAlign = "center";

    var accuracyString1 = "In that series, you got";
    var accuracyString2 = correctResponses + " of " + responses;
    var accuracyString3 = "responses correct";
    var accuracy =  correctResponses / responses;

    // draw the top half.
    thePickerCanvasContext.fillStyle = "#666666";
    thePickerCanvasContext.fillText(accuracyString1, thePickerCanvas.width / 2, quarterHeight - lineSpacing);
    thePickerCanvasContext.fillText(accuracyString2, thePickerCanvas.width / 2, quarterHeight);
    thePickerCanvasContext.fillText(accuracyString3, thePickerCanvas.width / 2, quarterHeight + lineSpacing);

    // draw the bottom half.
    thePickerCanvasContext.fillStyle = "#ED1C24";
    var assessmentString1 = "You should study the";
    var assessmentString2 = "elements before a re-take";

    if (accuracy === 1) {
        thePickerCanvasContext.fillStyle = "#006400";
        assessmentString1 = "Perfect score!";
        assessmentString2 = ":D";
    }
    else if (accuracy >= 0.9) {
        thePickerCanvasContext.fillStyle = "#006400";
        assessmentString1 = "Excellent score!";
        assessmentString2 = ":D";
    }
    else if (accuracy >= 0.75) {
        thePickerCanvasContext.fillStyle = "#107000";
        assessmentString1 = "Very good score";
        assessmentString2 = ":)";
    }
    else if (accuracy >= 0.6) {
        thePickerCanvasContext.fillStyle = "#208000";
        assessmentString1 = "Good score";
        assessmentString2 = ":)";
    }
    else if (accuracy >= 0.5) {
        thePickerCanvasContext.fillStyle = "#B0B000";
        assessmentString1 = "Ok score";
        assessmentString2 = ":/";
    }
    else if (accuracy >= 0.25) {
        thePickerCanvasContext.fillStyle = "#FF5000";
        assessmentString1 = "Probably good to study";
        assessmentString2 = "the elements some more";
    }

    thePickerCanvasContext.fillRect(0, halfHeight, thePickerCanvas.width, thePickerCanvas.height);
    thePickerCanvasContext.fillStyle = "#FFFFFF";
    thePickerCanvasContext.fillText(assessmentString1, thePickerCanvas.width / 2, halfHeight + quarterHeight - (lineSpacing / 2));
    thePickerCanvasContext.fillText(assessmentString2, thePickerCanvas.width / 2, halfHeight + quarterHeight + (lineSpacing / 2));
};
