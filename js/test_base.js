"use strict";

var submitSelectionButton = null;
var backspaceSelectionButton = null;
var clearSelectionButton = null;
var newQuestionSeriesButton = null;

var questionSeries = [];
var questionSeriesIndex = 0;
var responses = 0;
var correctResponses = 0;

var answerKind = undefined;

window.addEventListener("load", function () {
    hookUpPickerToUIBase();
    hookUpTestToUI();
    submitSelectionButton = document.getElementById("submitSelectionButton");
    var settingAutoSubmit = document.getElementById("settingAutoSubmit");
    if (settingAutoSubmit !== null) {
        setShouldPickerAutoSubmitChanged(settingAutoSubmit.classList.contains("correct"));
        settingAutoSubmit.addEventListener("click", onAutoSubmitSettingClicked);
    }
    else {
        setShouldPickerAutoSubmitChanged(selectionMessage === null);
    }
    backspaceSelectionButton = document.getElementById("backspaceSelectionButton");
    clearSelectionButton = document.getElementById("clearSelectionButton");
    newQuestionSeriesButton = document.getElementById("newQuestionSeriesButton");

    document.body.addEventListener("transitionend", function () {
        if (document.body.classList.contains("reset_answer")) {
            clearAnswerTransitions();
        }
        else if (document.body.classList.contains("correct_answer")) {
            //clearAnswerTransitions();
            document.body.classList.add("reset_answer");
        }
        else if (document.body.classList.contains("incorrect_answer")) {
            //clearAnswerTransitions();
            document.body.classList.add("reset_answer");
        }
    });

    newQuestionSeriesBase();
});

function hookUpTestToUI() {
    // override this to hook up to custom UI (settings, etc.).
}

function onAutoSubmitSettingClicked() {
    if (pickerThis === null) newQuestionSeriesBase();

    if (this.classList.contains("correct")) {
        this.classList.remove("correct");
        this.classList.add("incorrect");
        setShouldPickerAutoSubmitChanged(false);
    }
    else {
        this.classList.remove("incorrect");
        this.classList.add("correct");
        setShouldPickerAutoSubmitChanged(true);
    }
    pickerClearSelectionBase();
}

function setShouldPickerAutoSubmitChanged(value) {
    shouldPickerAutoSubmit = value;
    if (submitSelectionButton !== null) submitSelectionButton.style.display = value ? "none" : "inline";
    if (selectionMessage !== null) selectionMessage.style.display = value ? "none" : "block";
}

function newQuestionSeriesBase() {
    if (pickerThis === null) { // if we were just showing the question series results page.
        newQuestionSeriesButton.style.display = "none";
        setShouldPickerAutoSubmitChanged(shouldPickerAutoSubmit);
    }
    questionSeries = [];
    questionSeriesIndex = 0;
    responses = 0;
    correctResponses = 0;
    newQuestionSeries();
    questionSeries.sort(function (a, b) {
        return a.sortIndex - b.sortIndex;
    });
    attachPickerForCurrentQuestionBase();
    updateQuestionTextAndStats();
}

function attachPickerForCurrentQuestionBase() {
    answerKind = questionSeries[questionSeriesIndex].answerKind;
    constructPickerForCurrentQuestion();
}

function Question(questionLineOne, questionLineTwo, answerString, answerKind, sortIndex, isNothingSelectedAValidAnswer) {
    this.questionLineOne = questionLineOne;
    this.questionLineTwo = questionLineTwo;
    this.answerString = answerString;
    this.answerKind = answerKind;
    this.sortIndex = sortIndex;
    this.isNothingSelectedAValidAnswer = false;
    if (isNothingSelectedAValidAnswer !== undefined) this.isNothingSelectedAValidAnswer = isNothingSelectedAValidAnswer;
}

function updateQuestionTextAndStats() {
    document.getElementById("questionLineOne").innerHTML = questionSeries[questionSeriesIndex].questionLineOne;
    document.getElementById("questionLineTwo").innerHTML = questionSeries[questionSeriesIndex].questionLineTwo;
    document.getElementById("questionStats").innerHTML = "Question " + (questionSeriesIndex + 1) + " of " + questionSeries.length + " in this series. ";
    document.getElementById("responseStats").innerHTML = correctResponses + " of " + responses + " responses correct.";
}

function testSubmitSelection() {
    var isQuestionSeriesOver = false;
    if (!pickerThis.isThereASelection && !questionSeries[questionSeriesIndex].isNothingSelectedAValidAnswer) return;
    ++responses;
    if (isAnswerCorrect()) {
        playCorrectAnswerAnimation();
        ++correctResponses;
        if (questionSeriesIndex === (questionSeries.length - 1)) {
            isQuestionSeriesOver = true;
        }
        else {
            ++questionSeriesIndex;
            attachPickerForCurrentQuestionBase();
        }
    }
    else {
        playIncorrectAnswerAnimation();
    }
    pickerClearSelectionBase();
    updateQuestionTextAndStats();
    if (isQuestionSeriesOver) {
        newQuestionSeriesButton.style.display = "inline";
        if (submitSelectionButton !== null) submitSelectionButton.style.display = "none";
        if (backspaceSelectionButton !== null) backspaceSelectionButton.style.display = "none";
        if (clearSelectionButton !== null) clearSelectionButton.style.display = "none";
        drawQuestionSeriesResults();
        pickerThis.clearHover();
        pickerThis = null;
    }
}

function isAnswerCorrect() {
    // override this for different logic.
    return (pickerSelectionString === questionSeries[questionSeriesIndex].answerString);
}

function clearAnswerTransitions() {
    if (document.body.classList.contains("reset_answer")) {
        document.body.classList.remove("reset_answer");
    }
    if (document.body.classList.contains("correct_answer")) {
        document.body.classList.remove("correct_answer");
    }
    if (document.body.classList.contains("incorrect_answer")) {
        document.body.classList.remove("incorrect_answer");
    }
}

function playCorrectAnswerAnimation() {
    clearAnswerTransitions();
    document.body.classList.add("correct_answer");
}

function playIncorrectAnswerAnimation() {
    clearAnswerTransitions();
    document.body.classList.add("incorrect_answer");
}

function articleForName(name) {
    if (name.substring(0, 1) === 'a') return "an ";
    return "a ";
}