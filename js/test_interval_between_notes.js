"use strict";

var scale = _C_MAJOR_SCALE;

function newQuestionSeries() {
    for (var fromDegreeNumber = 1; fromDegreeNumber < 8; ++fromDegreeNumber) {
        var noteA = scale.degree(fromDegreeNumber);
        var noteAName = noteA.name;

        for (var delta = 1; delta < 7; ++delta) {
            var targetDegreeNumber = fromDegreeNumber + delta;
            if (targetDegreeNumber > 7) targetDegreeNumber -= 7;
            var noteB = scale.degree(targetDegreeNumber);
            var noteBName = noteB.name;
            var interval = noteA.intervalUpToNote(noteB);
            var intervalName = interval.name;

            questionSeries.push(new Question("what note is " + articleForName(intervalName), intervalName + " above " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what note is", noteAName + " " + articleForName(intervalName) + intervalName + " below?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what note is", noteAName + " plus " + articleForName(intervalName) + intervalName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what note", "minus " + articleForName(intervalName) + intervalName + " is " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));

            questionSeries.push(new Question("what interval is", noteAName + " up to " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "above " + noteAName + " is " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "subtracted from " + noteBName + " is " + noteAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));

            var interval = noteB.intervalUpToNote(noteA);
            var intervalName = interval.name;

            questionSeries.push(new Question("what note is " + articleForName(intervalName), intervalName + " below " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what note is", noteAName + " " + articleForName(intervalName) + intervalName + " above?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what note is", noteAName + " minus " + articleForName(intervalName) + intervalName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what note", "plus " + articleForName(intervalName) + intervalName + " is " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));

            questionSeries.push(new Question("what interval is", noteAName + " down to " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "below " + noteAName + " is " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "added to " + noteBName + " is " + noteAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
        }
    }
}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
        pickerThis = new PickerTwelveClock();
    }
    pickerOnLayoutChangedBase();
}