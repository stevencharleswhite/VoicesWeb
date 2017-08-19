"use strict";

function newQuestionSeries() {
    questionSeries.push(new Question("what are the degrees of the", _MAJOR_SCALE_FORMULA.nameAsFormula + "?", _MAJOR_SCALE_FORMULA.degreesAsString, PICKER_KIND_SCALE_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _NATURAL_MINOR_SCALE_FORMULA.nameAsFormula + "?", _NATURAL_MINOR_SCALE_FORMULA.degreesAsString, PICKER_KIND_SCALE_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _HARMONIC_MINOR_SCALE_FORMULA.nameAsFormula + "?", _HARMONIC_MINOR_SCALE_FORMULA.degreesAsString, PICKER_KIND_SCALE_FORMULA, Math.random() * 1000));
    questionSeries.push(new Question("what are the degrees of the", _MELODIC_MINOR_SCALE_FORMULA.nameAsFormula + "?", _MELODIC_MINOR_SCALE_FORMULA.degreesAsString, PICKER_KIND_SCALE_FORMULA, Math.random() * 1000));
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

function isAnswerCorrect() {
    return (questionSeries[questionSeriesIndex].answerString === pickerSelectionString
        || questionSeries[questionSeriesIndex].answerString + " 1'" === pickerSelectionString
        || questionSeries[questionSeriesIndex].answerString === pickerSelectionString + " 1");
}