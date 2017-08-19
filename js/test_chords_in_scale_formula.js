"use strict";

var settingSeventhChords = undefined;
var scaleFormula = _MAJOR_SCALE_FORMULA;

function hookUpTestToUI() {
    settingSeventhChords = document.getElementById("settingSeventhChords");
    settingSeventhChords.addEventListener("click", onSettingClicked);

    var formulaQueryString = window.location.search.substring(1);
    formulaQueryString = formulaQueryString.substring(formulaQueryString.indexOf('=') + 1);

    var scaleFormulaShortName = formulaQueryString.replace(/_/g, ' ');

    if (scaleFormulaShortName === _MAJOR_SCALE_FORMULA.shortName) {
        scaleFormula = _MAJOR_SCALE_FORMULA;
    }
    else if (scaleFormulaShortName === _NATURAL_MINOR_SCALE_FORMULA.shortName) {
        scaleFormula = _NATURAL_MINOR_SCALE_FORMULA;
    }
    else if (scaleFormulaShortName === _HARMONIC_MINOR_SCALE_FORMULA.shortName) {
        scaleFormula = _HARMONIC_MINOR_SCALE_FORMULA;
    }
    document.getElementById("formulaNameHeader").innerHTML += scaleFormula.nameAsSet;
}

function onSettingClicked() {
    if (!this.classList.contains("correct")) {
        this.classList.remove("incorrect");
        this.classList.add("correct");
        newQuestionSeriesBase();
        pickerThis.redrawThis();
    }
    else {
        this.classList.remove("correct");
        this.classList.add("incorrect");
        newQuestionSeriesBase();
        pickerThis.redrawThis();
    }
}

function newQuestionSeries() {
    for (var degreeNumber = 1; degreeNumber < 8; ++degreeNumber) {
        var triad = scaleFormula.diatonicChordRoot1(degreeNumber, 3);
        var seventhChord = scaleFormula.diatonicChordRoot1(degreeNumber, 4);

        questionSeries.push(new Question("what kind of", "triad is formed on " + scaleFormula.degreeAsANSIString(degreeNumber) + "?", triad.degreesAsString, PICKER_KIND_CHORD_TYPE, Math.random() * 1000));

        if (!settingSeventhChords.classList.contains("correct")) continue;

        questionSeries.push(new Question("what kind of", "seventh chord is formed on " + scaleFormula.degreeAsANSIString(degreeNumber) + "?", seventhChord.degreesAsString, PICKER_KIND_CHORD_TYPE, Math.random() * 1000));
    }

    questionSeriesForChordFormula(scaleFormula, _DIMINISHED_TRIAD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _MINOR_TRIAD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _MAJOR_TRIAD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _AUGMENTED_TRIAD_FORMULA);

    if (!settingSeventhChords.classList.contains("correct")) return;

    questionSeriesForChordFormula(scaleFormula, _MAJOR_SEVENTH_CHORD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _MINOR_SEVENTH_CHORD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _DOMINANT_SEVENTH_CHORD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _MINOR_MAJOR_SEVENTH_CHORD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _DIMINISHED_SEVENTH_CHORD_FORMULA);
    questionSeriesForChordFormula(scaleFormula, _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA);
}

function questionSeriesForChordFormula(scaleFormula, chordFormula) {
    var chordFormulaName = chordFormula.name;
    var answer = chordFormulasInScaleFormulas[scaleFormula.name][chordFormulaName];
    if (answer === undefined) answer = "";
    questionSeries.push(new Question("on what", "degree(s) can you root a " + chordFormula.shortName + " (" + chordFormulaName + ")?", answer, PICKER_KIND_FORMULA_DEGREE_SEQUENCE_SHORT, Math.random() * 1000, true));
}

function constructPickerForCurrentQuestion() {
	if (answerKind === PICKER_KIND_CHORD_TYPE) {
        selectionMessage.style.display = "none";
        submitSelectionButton.style.display = "none";
        backspaceSelectionButton.style.display = "none";
        clearSelectionButton.style.display = "none";
        pickerThis = new PickerChordType();
    }
	else if (answerKind === PICKER_KIND_FORMULA_DEGREE_SEQUENCE_SHORT) {
        selectionMessage.style.display = "block";
        submitSelectionButton.style.display = "inline";
        backspaceSelectionButton.style.display = "inline";
        clearSelectionButton.style.display = "inline";
        pickerThis = new PickerFormulaDegree(pickerNullSelectionStringConstantNone);
	    // Show these again in case they were hidden at the end of a question series.
        backspaceSelectionButton.style.display = "inline";
        clearSelectionButton.style.display = "inline";
    }
    pickerOnLayoutChangedBase();
}

function isAnswerCorrect() {
	var expected = questionSeries[questionSeriesIndex].answerString;

	if (pickerSelectionString === expected) return true;

	var chordFormulaDegreesAsStringsActual = pickerSelectionString.split(" ");
	var chordFormulaDegreesAsStringsExpected = questionSeries[questionSeriesIndex].answerString.split(" ");

	if (chordFormulaDegreesAsStringsActual.length !== chordFormulaDegreesAsStringsExpected.length) return false;

	for (var i = 0; i < chordFormulaDegreesAsStringsExpected.length; ++i) {
		if (chordFormulaDegreesAsStringsActual.indexOf(chordFormulaDegreesAsStringsExpected[i]) === -1) return false;
	}

	return true;
}