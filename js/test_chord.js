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
    var chord = undefined;
    for (var noteIndex = 0; noteIndex < _NOTES.length; ++noteIndex) {
        addQuestion(new Notes(_NOTES[noteIndex], _DIMINISHED_TRIAD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _MINOR_TRIAD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _MAJOR_TRIAD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _AUGMENTED_TRIAD_FORMULA));

        if (!settingSeventhChords.classList.contains("correct")) continue;

        addQuestion(new Notes(_NOTES[noteIndex], _DIMINISHED_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _MINOR_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _MINOR_MAJOR_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _DOMINANT_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _MAJOR_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _AUGMENTED_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA));
        addQuestion(new Notes(_NOTES[noteIndex], _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA));
    }
}

function addQuestion(chord) {
    questionSeries.push(new Question("what are the notes in", chord.minimalName + "?", chord.degreesAsString, PICKER_KIND_CHORD, Math.random() * 1000));
}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
        pickerThis = new PickerTwelveClock();
        pickerOnLayoutChangedBase();
    }
    var rootString = questionSeries[questionSeriesIndex].answerString;
    rootString = rootString.substring(0, rootString.indexOf(' '));
    pickerThis.minimumSelection = rootString;

    // Show these again in case they were hidden at the end of a question series.
    backspaceSelectionButton.style.display = "inline";
    clearSelectionButton.style.display = "inline";
}