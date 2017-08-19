"use strict";

var setting45 = undefined;
var setting36 = undefined;
var setting27 = undefined;

var isMegaTest = false;

function hookUpTestToUI() {
    setting45 = document.getElementById("setting45");
    setting36 = document.getElementById("setting36");
    setting27 = document.getElementById("setting27");

    // The mega test doesn't have any settings. Just testing for one will do.
    if (setting45 !== null) {
        setting45.addEventListener("click", onSettingClicked);
        setting36.addEventListener("click", onSettingClicked);
        setting27.addEventListener("click", onSettingClicked);
    }
    else {
        isMegaTest = true;
    }
}

function onSettingClicked() {
    if (!this.classList.contains("correct")) {
        this.classList.remove("incorrect");
        this.classList.add("correct");
        newQuestionSeriesBase();
        pickerThis.redrawThis();
    }
    else if (countSelectedSettings() !== 1) {
        this.classList.remove("correct");
        this.classList.add("incorrect");
        newQuestionSeriesBase();
        pickerThis.redrawThis();
    }
}

function countSelectedSettings() {
    var count = 0;
    if (setting45.classList.contains("correct"))++count;
    if (setting36.classList.contains("correct"))++count;
    if (setting27.classList.contains("correct"))++count;
    return count;
}

function newQuestionSeries() {
    for (var naturalNoteLetterIndexIndex = 0; naturalNoteLetterIndexIndex < 7; ++naturalNoteLetterIndexIndex) {
        var noteA = new Note(_NOTE_CLOCK[_NATURAL_TONE_INDEX[naturalNoteLetterIndexIndex]], 0, 4, true);
        for (var quantity = 2; quantity <= 7; ++quantity) {

            if (!isMegaTest) {
                if ((quantity === 4 || quantity === 5) && !setting45.classList.contains("correct")) continue;
                if ((quantity === 3 || quantity === 6) && !setting36.classList.contains("correct")) continue;
                if ((quantity === 2 || quantity === 7) && !setting27.classList.contains("correct")) continue;
            }

            var interval = new Interval(quantity, undefined, true);

            var intervalName = interval.name;
            var noteAName = noteA.name;

            var noteB = noteA.plusInterval(interval);
            var noteBName = noteB.name;
            questionSeries.push(new Question("what note is a", intervalName + " above " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what interval is", noteAName + " up to " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));

            if (isMegaTest) {
                questionSeries.push(new Question("what note is", noteAName + " a " + intervalName + " below?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
                questionSeries.push(new Question("what note is", noteAName + " plus a " + intervalName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
                questionSeries.push(new Question("what note", "minus a " + intervalName + " is " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
                questionSeries.push(new Question("what interval", "above " + noteAName + " is " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
                questionSeries.push(new Question("what interval", "subtracted from " + noteBName + " is " + noteAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            }

            noteB = noteA.minusInterval(interval);
            noteBName = noteB.name;
            questionSeries.push(new Question("what note is a", intervalName + " below " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
            questionSeries.push(new Question("what interval is", noteAName + " down to " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));

            if (isMegaTest) {
                questionSeries.push(new Question("what note is", noteAName + " a " + intervalName + " above?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
                questionSeries.push(new Question("what note is", noteAName + " minus a " + intervalName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
                questionSeries.push(new Question("what note", "plus a " + intervalName + " is " + noteAName + "?", noteBName, PICKER_KIND_NOTE, Math.random() * 1000));
                questionSeries.push(new Question("what interval", "below " + noteAName + " is " + noteBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
                questionSeries.push(new Question("what interval", "added to " + noteBName + " is " + noteAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            }
        }
    }
}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
        pickerThis = new PickerSevenClock();
        pickerOnLayoutChangedBase();
    }
}