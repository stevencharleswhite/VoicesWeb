"use strict";

var scaleFormula = _MAJOR_SCALE_FORMULA;

function hookUpTestToUI() {
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
    document.getElementById("formulaNameHeader").innerHTML = scaleFormula.name;
}

function newQuestionSeries() {
    for (var fromDegreeNumber = 1; fromDegreeNumber < 8; ++fromDegreeNumber) {
    	var degreeA = scaleFormula.degree(fromDegreeNumber);
        var degreeAName = lookUpFormulaDegreeForInterval(degreeA);

        for (var delta = 1; delta < 7; ++delta) {
            var targetDegreeNumber = fromDegreeNumber + delta;
            if (targetDegreeNumber > 7) targetDegreeNumber -= 7;
            var degreeB = scaleFormula.degree(targetDegreeNumber);
            var degreeBName = lookUpFormulaDegreeForInterval(degreeB);
            var interval = degreeB.minusInterval(degreeA);
            var intervalName = interval.name;

            questionSeries.push(new Question("what degree is " + articleForName(intervalName), intervalName + " above " + degreeAName + "?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));
            questionSeries.push(new Question("what degree is", degreeAName + " " + articleForName(intervalName) + intervalName + " below?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));
            questionSeries.push(new Question("what degree is", degreeAName + " plus " + articleForName(intervalName) + intervalName + "?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));
            questionSeries.push(new Question("what degree", "minus " + articleForName(intervalName) + intervalName + " is " + degreeAName + "?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));

            questionSeries.push(new Question("what interval is", degreeAName + " up to " + degreeBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "above " + degreeAName + " is " + degreeBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "subtracted from " + degreeBName + " is " + degreeAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));

            var interval = degreeA.minusInterval(degreeB);
            var intervalName = interval.name;

            questionSeries.push(new Question("what degree is " + articleForName(intervalName), intervalName + " below " + degreeAName + "?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));
            questionSeries.push(new Question("what degree is", degreeAName + " " + articleForName(intervalName) + intervalName + " above?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));
            questionSeries.push(new Question("what degree is", degreeAName + " minus " + articleForName(intervalName) + intervalName + "?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));
            questionSeries.push(new Question("what degree", "plus " + articleForName(intervalName) + intervalName + " is " + degreeAName + "?", degreeBName, PICKER_KIND_FORMULA_DEGREE_SHORT, Math.random() * 1000));

            questionSeries.push(new Question("what interval is", degreeAName + " down to " + degreeBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "below " + degreeAName + " is " + degreeBName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
            questionSeries.push(new Question("what interval", "added to " + degreeBName + " is " + degreeAName + "?", intervalName, PICKER_KIND_INTERVAL, Math.random() * 1000));
        }
    }
}

function constructPickerForCurrentQuestion() {
    if (answerKind === PICKER_KIND_FORMULA_DEGREE_SHORT) {
        pickerThis = new PickerFormulaDegree();
    }
    else if (answerKind === PICKER_KIND_INTERVAL) {
        pickerThis = new PickerTwelveClock();
    }
    pickerOnLayoutChangedBase();
}