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
    document.getElementById("formulaNameHeader").innerHTML += scaleFormula.nameAsFormula;
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
    for (var rootFormulaDegreeOrdinalNumberA = 1; rootFormulaDegreeOrdinalNumberA < 8; ++rootFormulaDegreeOrdinalNumberA) {
        var chordFormulaDegreesA = scaleFormula.diatonicChordRootN(rootFormulaDegreeOrdinalNumberA, 3);
        findCommonDegreesForRootFormulaDegreeOrdinalNumberA(chordFormulaDegreesA, rootFormulaDegreeOrdinalNumberA);

        if (!settingSeventhChords.classList.contains("correct")) continue;

        var chordFormulaDegreesB = scaleFormula.diatonicChordRootN(rootFormulaDegreeOrdinalNumberA, 4);
        commonDegrees(chordFormulaDegreesA, chordFormulaDegreesB);
    }
}

function findCommonDegreesForRootFormulaDegreeOrdinalNumberA(chordFormulaDegreesA, rootFormulaDegreeOrdinalNumberA) {
    for (var rootFormulaDegreeOrdinalNumberB = rootFormulaDegreeOrdinalNumberA; rootFormulaDegreeOrdinalNumberB < 8; ++rootFormulaDegreeOrdinalNumberB) {
        var chordFormulaDegreesB = scaleFormula.diatonicChordRootN(rootFormulaDegreeOrdinalNumberB, 3);
        if (chordFormulaDegreesA.degreesAsString !== chordFormulaDegreesB.degreesAsString) {
            questionSeries.push(new Question("what degrees are common to", chordFormulaDegreesA.nameOfChordFormulaInRomanNumeralNotation + " and " + chordFormulaDegreesB.nameOfChordFormulaInRomanNumeralNotation, commonDegreesSort(chordFormulaDegreesA, chordFormulaDegreesB), PICKER_KIND_FORMULA_DEGREE_SEQUENCE_SHORT, Math.random() * 1000, true));
        }

        if (!settingSeventhChords.classList.contains("correct")) continue;

        chordFormulaDegreesB = scaleFormula.diatonicChordRootN(rootFormulaDegreeOrdinalNumberB, 4);
        if (chordFormulaDegreesA.degreesAsString !== chordFormulaDegreesB.degreesAsString) {
            questionSeries.push(new Question("what degrees are common to", chordFormulaDegreesA.nameOfChordFormulaInRomanNumeralNotation + " and " + chordFormulaDegreesB.nameOfChordFormulaInRomanNumeralNotation, commonDegreesSort(chordFormulaDegreesA, chordFormulaDegreesB), PICKER_KIND_FORMULA_DEGREE_SEQUENCE_SHORT, Math.random() * 1000, true));
        }
    }
}

function commonDegreesSort(chordFormulaDegreesA, chordFormulaDegreesB) {
    var quantityA = chordFormulaDegreesA.degree(1).quantityAsNumber;
    var quantityB = chordFormulaDegreesB.degree(1).quantityAsNumber;
    if (chordFormulaDegreesA.degree(1).quantityAsNumber <= chordFormulaDegreesB.degree(1).quantityAsNumber)
        return commonDegrees(chordFormulaDegreesA, chordFormulaDegreesB);
    else
        return commonDegrees(chordFormulaDegreesB, chordFormulaDegreesA);
}

function commonDegrees(chordFormulaDegreesA, chordFormulaDegreesB) {
    var commonDegreesString = "";
    var chordFormulaDegreesAsStringsA = chordFormulaDegreesA.degreesAsString.split(" ");
    var chordFormulaDegreesAsStringsB = chordFormulaDegreesB.degreesAsString.split(" ");

    for (var iA = 0; iA < chordFormulaDegreesAsStringsA.length; ++iA)
    {
        if (chordFormulaDegreesAsStringsB.indexOf(chordFormulaDegreesAsStringsA[iA]) !== -1)
        {
            if (commonDegreesString.length > 0) commonDegreesString += " ";
            commonDegreesString += chordFormulaDegreesAsStringsA[iA];
        }
    }

    return commonDegreesString;
}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
    	pickerThis = new PickerFormulaDegree(pickerNullSelectionStringConstantNone);
        pickerOnLayoutChangedBase();
    }

    // Show these again in case they were hidden at the end of a question series.
    backspaceSelectionButton.style.display = "inline";
    clearSelectionButton.style.display = "inline";
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