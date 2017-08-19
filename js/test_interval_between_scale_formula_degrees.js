"use strict";

function newQuestionSeries() {
    var chordFormula = _MAJOR_TRIAD_FORMULA;

    degreePair(chordFormula.degree(1), chordFormula.degree(2));
    degreePair(chordFormula.degree(1), chordFormula.degree(3));
    degreePair(chordFormula.degree(2), chordFormula.degree(3));
}

function degreePair(degreeA, degreeB) {
    var degreeAName = lookUpFormulaDegreeForInterval(degreeA);
    var degreeBName = lookUpFormulaDegreeForInterval(degreeB);

    var interval = degreeB.minusInterval(degreeA);
    questionSeries.push(new Question("what interval is", degreeAName + " up to " + degreeBName + "?", interval.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
    questionSeries.push(new Question("what interval is", degreeBName + " down to " + degreeAName + "?", interval.name, PICKER_KIND_INTERVAL, Math.random() * 1000));

    interval = degreeA.minusInterval(degreeB);
    questionSeries.push(new Question("what interval is", degreeAName + " down to " + degreeBName + "?", interval.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
    questionSeries.push(new Question("what interval is", degreeBName + " up to " + degreeAName + "?", interval.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
}

//questionSeries.push(new Question("what interval is", noteAName + " up to " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
//questionSeries.push(new Question("what interval", "above " + noteAName + " is " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
//questionSeries.push(new Question("what interval", "subtracted from " + noteBName + " is " + noteAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));

//var interval = noteB.intervalUpToNote(noteA);
//var intervalName = interval.name;

//questionSeries.push(new Question("what interval is", noteAName + " down to " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
//questionSeries.push(new Question("what interval", "below " + noteAName + " is " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
//questionSeries.push(new Question("what interval", "added to " + noteBName + " is " + noteAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));

function constructPickerForCurrentQuestion() {
    if (answerKind === PICKER_KIND_FORMULA_DEGREE_SHORT) {
        pickerThis = new PickerFormulaDegree();
    }
    else if (answerKind === PICKER_KIND_INTERVAL) {
        pickerThis = new PickerTwelveClock();
    }
    pickerOnLayoutChangedBase();
}