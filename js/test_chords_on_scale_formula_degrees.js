"use strict";

var settingSeventhChords = undefined;

function hookUpTestToUI() {
    settingSeventhChords = document.getElementById("settingSeventhChords");
    settingSeventhChords.addEventListener("click", onSettingClicked);
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
    var scaleFormula = _MAJOR_SCALE_FORMULA;
    var chordFormula = undefined;
    for (var rootFormulaDegreeOrdinalNumber = 1; rootFormulaDegreeOrdinalNumber < 8; ++rootFormulaDegreeOrdinalNumber) {
        //chordFormula = scaleFormula.diatonicChordRootN(rootFormulaDegreeOrdinalNumber, 3);
        //addQuestion(chordFormula);

        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _DIMINISHED_TRIAD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _MINOR_TRIAD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _MAJOR_TRIAD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _AUGMENTED_TRIAD_FORMULA));

        if (!settingSeventhChords.classList.contains("correct")) continue;

        //chordFormula = scaleFormula.diatonicChordRootN(rootFormulaDegreeOrdinalNumber, 4);
        //addQuestion(chordFormula);

        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _DIMINISHED_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _MINOR_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _MINOR_MAJOR_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _DOMINANT_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _MAJOR_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _AUGMENTED_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA));
        addQuestion(scaleFormula.chromaticChordRootN(rootFormulaDegreeOrdinalNumber.toString(), _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA));
    }

    chordFormula = scaleFormula.chromaticChordRootN("b3", _AUGMENTED_TRIAD_FORMULA);
    addQuestion(chordFormula);
    chordFormula = scaleFormula.chromaticChordRootN("b3", _MAJOR_TRIAD_FORMULA);
    addQuestion(chordFormula);
}

function addQuestion(chordFormula) {
    questionSeries.push(new Question("what are the degrees of", chordFormula.nameOfChordFormulaInRomanNumeralNotation, chordFormula.degreesAsString, PICKER_KIND_CHORD_FORMULA, Math.random() * 1000));
}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
        pickerThis = new PickerFormulaDegree();
        pickerOnLayoutChangedBase();
    }

    // Show these again in case they were hidden at the end of a question series.
    backspaceSelectionButton.style.display = "inline";
    clearSelectionButton.style.display = "inline";
}