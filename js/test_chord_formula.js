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
	questionSeries.push(new Question("what are the degrees of the", _DIMINISHED_TRIAD_FORMULA.shortName + " (" + _DIMINISHED_TRIAD_FORMULA.name + ")?", _DIMINISHED_TRIAD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
	questionSeries.push(new Question("what are the degrees of the", _MINOR_TRIAD_FORMULA.shortName + " (" + _MINOR_TRIAD_FORMULA.name + ")?", _MINOR_TRIAD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
	questionSeries.push(new Question("what are the degrees of the", _MAJOR_TRIAD_FORMULA.shortName + " (" + _MAJOR_TRIAD_FORMULA.name + ")?", _MAJOR_TRIAD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _AUGMENTED_TRIAD_FORMULA.shortName + " (" + _AUGMENTED_TRIAD_FORMULA.name + ")?", _AUGMENTED_TRIAD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));

    if (!settingSeventhChords.classList.contains("correct")) return;

    questionSeries.push(new Question("what are the degrees of the", _DIMINISHED_SEVENTH_CHORD_FORMULA.shortName + " (" + _DIMINISHED_SEVENTH_CHORD_FORMULA.name + ")?", _DIMINISHED_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA.shortName + " (" + _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA.name + ")?", _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _MINOR_SEVENTH_CHORD_FORMULA.shortName + " (" + _MINOR_SEVENTH_CHORD_FORMULA.name + ")?", _MINOR_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _MINOR_MAJOR_SEVENTH_CHORD_FORMULA.shortName + " (" + _MINOR_MAJOR_SEVENTH_CHORD_FORMULA.name + ")?", _MINOR_MAJOR_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _DOMINANT_SEVENTH_CHORD_FORMULA.shortName + " (" + _DOMINANT_SEVENTH_CHORD_FORMULA.name + ")?", _DOMINANT_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _MAJOR_SEVENTH_CHORD_FORMULA.shortName + " (" + _MAJOR_SEVENTH_CHORD_FORMULA.name + ")?", _MAJOR_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _AUGMENTED_SEVENTH_CHORD_FORMULA.shortName + " (" + _AUGMENTED_SEVENTH_CHORD_FORMULA.name + ")?", _AUGMENTED_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA.shortName + " (" + _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA.name + ")?", _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA.shortName + " (" + _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA.name + ")?", _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA.degreesAsString, PICKER_KIND_TONIC_CHORD_FORMULA, Math.random() * 1000));
}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
        pickerThis = new PickerFormulaDegree();
        pickerOnLayoutChangedBase();
        pickerThis.minimumSelection = '1';
    }

    // Show these again in case they were hidden at the end of a question series.
    backspaceSelectionButton.style.display = "inline";
    clearSelectionButton.style.display = "inline";
}