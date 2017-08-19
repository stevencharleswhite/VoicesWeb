"use strict";

var scale = undefined;

function hookUpTestToUI() {
    var scaleQueryString = window.location.search.substring(1);
    scaleQueryString = scaleQueryString.substring(scaleQueryString.indexOf('=') + 1);

    var indexOfFirstUnderscore = scaleQueryString.indexOf('_');
    if (indexOfFirstUnderscore === -1) {
        scale = _MAJOR_SCALES[scaleQueryString];
    }
    else {
        var tonic = scaleQueryString.substring(0, indexOfFirstUnderscore);
        var scaleFormula = scaleQueryString.substring(indexOfFirstUnderscore + 1, scaleQueryString.length);
        scaleFormula = scaleFormula.replace(/_/g, ' ');

        if (scaleFormula === _NATURAL_MINOR_SCALE_FORMULA.shortName) {
            scale = _NATURAL_MINOR_SCALES[tonic];
        }
        else if (scaleFormula === _HARMONIC_MINOR_SCALE_FORMULA.shortName) {
            scale = _HARMONIC_MINOR_SCALES[tonic];
        }
    }
    document.getElementById("scaleNameHeader").innerHTML = scale.name;
}

function newQuestionSeries() {
    for (var degreeNumber = 1; degreeNumber < 8; ++degreeNumber) {
        var noteA = scale.degree(degreeNumber);
        var noteAName = noteA.name;

        var scaleDegreeNumber = new ScaleDegreeNumber(degreeNumber);
        questionSeries.push(new Question("what note is the", scaleDegreeNumber.name + " degree?", noteA.name, PICKER_KIND_NOTE, Math.random() * 1000));
        questionSeries.push(new Question("what ordinal", "degree is " + noteAName + "?", new Interval(degreeNumber, undefined, true).name, PICKER_KIND_SCALE_DEGREE_ORDINAL_NUMBER, Math.random() * 1000));
    }
}

function constructPickerForCurrentQuestion() {
	if (answerKind === PICKER_KIND_NOTE) pickerThis = new PickerTwelveClock();
    else if (answerKind === PICKER_KIND_SCALE_DEGREE_ORDINAL_NUMBER) pickerThis = new PickerSevenClock();
    pickerOnLayoutChangedBase();
}