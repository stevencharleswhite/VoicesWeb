"use strict";

var allTestsSucceeded = undefined;
var resultsUl = undefined;
var atLeastOneTestFailed = false;

window.addEventListener("load", function () {
    allTestsSucceeded = document.getElementById("allTestsSucceeded");
    resultsUl = document.getElementById("resultsUl");
    performTests();
});

function addNewLi(testString, success) {
    var li = document.createElement("li");
    li.innerHTML = testString;
    if (success) {
        li.classList.add("correct");
    }
    else {
        li.classList.add("incorrect");
        atLeastOneTestFailed = true;
    }
    resultsUl.appendChild(li);
}

function performTests() {

    testCaseNoteOrIntervalPlusInterval(_C, _AUG1, _Cs);
    testCaseNoteOrIntervalPlusInterval(_C, _MIN3, _Eb);
    testCaseNoteOrIntervalPlusInterval(_C, _MAJ3, _E);
    testCaseNoteOrIntervalPlusInterval(_D, _MIN3, _F);
    testCaseNoteOrIntervalPlusInterval(_D, _MAJ3, _Fs);
    testCaseNoteOrIntervalPlusInterval(_B, _MIN3, _D);
    testCaseNoteOrIntervalPlusInterval(_B, _MAJ3, _Ds);

    testCaseNoteOrIntervalMinusInterval(_C, _AUG1, _Cb);
    testCaseNoteOrIntervalMinusInterval(_Cs, _MAJ3, _A);
    testCaseNoteOrIntervalMinusInterval(_C, _MIN3, _A);
    testCaseNoteOrIntervalMinusInterval(_C, _MAJ3, _Ab);
    testCaseNoteOrIntervalMinusInterval(_D, _MIN3, _B);
    testCaseNoteOrIntervalMinusInterval(_D, _MAJ3, _Bb);
    testCaseNoteOrIntervalMinusInterval(_B, _MIN3, _Gs);
    testCaseNoteOrIntervalMinusInterval(_B, _MAJ3, _G);

    testCaseNoteOrIntervalPlusInterval(_PER1, _PER1, _PER1);
    testCaseNoteOrIntervalPlusInterval(_PER1, _PER1, _PER1);
    testCaseNoteOrIntervalPlusInterval(_PER1, _AUG1, _AUG1);
    testCaseNoteOrIntervalPlusInterval(_AUG1, _PER1, _AUG1);
    testCaseNoteOrIntervalPlusInterval(_PER4, _PER4, _MIN7);

    testCaseNoteUpToNote(_Bb, _Eb, _PER4);

    testCaseIntervalFromOneScaleFormulaDegreeUpToAnother(_MAJOR_SCALE_FORMULA, 1, 2, _MAJ2);
    testCaseIntervalFromOneScaleFormulaDegreeUpToAnother(_MAJOR_SCALE_FORMULA, 1, 3, _MAJ3);
    testCaseIntervalFromOneScaleFormulaDegreeUpToAnother(_MAJOR_SCALE_FORMULA, 1, 5, _PER5);
    testCaseIntervalFromOneScaleFormulaDegreeUpToAnother(_MAJOR_SCALE_FORMULA, 4, 7, _AUG4);
    testCaseIntervalFromOneScaleFormulaDegreeUpToAnother(_MAJOR_SCALE_FORMULA, 7, 4, _DIM5);

    testCaseIntervalFromOneScaleDegreeUpToAnother(_MAJOR_SCALES.C, 1, 2, _MAJ2);
    testCaseIntervalFromOneScaleDegreeUpToAnother(_MAJOR_SCALES.C, 1, 3, _MAJ3);
    testCaseIntervalFromOneScaleDegreeUpToAnother(_MAJOR_SCALES.C, 1, 5, _PER5);
    testCaseIntervalFromOneScaleDegreeUpToAnother(_MAJOR_SCALES.C, 4, 7, _AUG4);
    testCaseIntervalFromOneScaleDegreeUpToAnother(_MAJOR_SCALES.C, 7, 4, _DIM5);

    testCaseScaleNote(_C_MAJOR_SCALE, 1, _C);
    testCaseScaleNote(_C_MAJOR_SCALE, 2, _D);
    testCaseScaleNote(_C_MAJOR_SCALE, 3, _E);
    testCaseScaleNote(_C_MAJOR_SCALE, 4, _F);
    testCaseScaleNote(_C_MAJOR_SCALE, 5, _G);
    testCaseScaleNote(_C_MAJOR_SCALE, 6, _A);
    testCaseScaleNote(_C_MAJOR_SCALE, 7, _B);

    testCaseScaleNote(_F_MAJOR_SCALE, 1, _F);
    testCaseScaleNote(_F_MAJOR_SCALE, 2, _G);
    testCaseScaleNote(_F_MAJOR_SCALE, 3, _A);
    testCaseScaleNote(_F_MAJOR_SCALE, 4, _Bb);
    testCaseScaleNote(_F_MAJOR_SCALE, 5, _C);
    testCaseScaleNote(_F_MAJOR_SCALE, 6, _D);
    testCaseScaleNote(_F_MAJOR_SCALE, 7, _E);

    testChordFormulasInScaleFormula(_MAJOR_SCALE_FORMULA);
    testChordFormulasInScaleFormula(_NATURAL_MINOR_SCALE_FORMULA);
    testChordFormulasInScaleFormula(_HARMONIC_MINOR_SCALE_FORMULA);

    if (!atLeastOneTestFailed) {
        allTestsSucceeded.innerHTML = "all tests succeeded";
        allTestsSucceeded.classList.add("correct");
    }
    else {
        allTestsSucceeded.classList.add("incorrect");
    }
}

function testCaseNoteOrIntervalPlusInterval(noteOrInterval, interval, expected) {
    var actual = noteOrInterval.plusInterval(interval);
    addNewLi(noteOrInterval.name + " plus " + interval.name + " = " + expected.name, actual.isEqual(expected));
}

function testCaseNoteOrIntervalMinusInterval(noteOrInterval, interval, expected) {
    var actual = noteOrInterval.minusInterval(interval);
    addNewLi(noteOrInterval.name + " minus " + interval.name + " = " + expected.name, actual.isEqual(expected));
}

function testCaseNoteUpToNote(noteA, noteB, expected) {
    var actual = noteA.intervalUpToNote(noteB);
    addNewLi(noteA.name + " up to " + noteB.name + " = " + expected.name, actual.isEqual(expected));
}

function testCaseIntervalFromOneScaleFormulaDegreeUpToAnother(scaleFormula, lowDegreeNumber, highDegreeNumber, expected) {
    var actual = scaleFormula.degree(highDegreeNumber).minusInterval(scaleFormula.degree(lowDegreeNumber));
    addNewLi(scaleFormula.name + ", degree " + lowDegreeNumber + " up to " + highDegreeNumber + " = " + expected.name, actual.isEqual(expected));
}

function testCaseIntervalFromOneScaleDegreeUpToAnother(scale, lowDegreeNumber, highDegreeNumber, expected) {
    var actual = scale.degree(lowDegreeNumber).intervalUpToNote(scale.degree(highDegreeNumber));
    addNewLi(scale.name + ", degree " + lowDegreeNumber + " up to " + highDegreeNumber + " = " + expected.name, actual.isEqual(expected));
}

function testCaseScaleNote(scale, degreeNumber, expected) {
    addNewLi(scale.name + ", degree " + degreeNumber + " = " + expected.name, (scale.degree(degreeNumber)).isEqual(expected));
}

function testChordFormulasInScaleFormula(scaleFormula) {
	testChordFormulaInScaleFormula(scaleFormula, _DIMINISHED_TRIAD_FORMULA);
	testChordFormulaInScaleFormula(scaleFormula, _MINOR_TRIAD_FORMULA);
	testChordFormulaInScaleFormula(scaleFormula, _MAJOR_TRIAD_FORMULA);
	testChordFormulaInScaleFormula(scaleFormula, _AUGMENTED_TRIAD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _DIMINISHED_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _MINOR_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _MINOR_MAJOR_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _DOMINANT_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _MAJOR_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _AUGMENTED_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA);
    testChordFormulaInScaleFormula(scaleFormula, _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA);
}

function testChordFormulaInScaleFormula(scaleFormula, chordFormula) {
    var actual = '';

    for (var degreeNumber = 1; degreeNumber < 8; ++degreeNumber) {
        var triad = scaleFormula.diatonicChordRoot1(degreeNumber, 3);
        var seventhChord = scaleFormula.diatonicChordRoot1(degreeNumber, 4);

        if (triad.isEqual(chordFormula) || seventhChord.isEqual(chordFormula)) {
            if (actual.length != 0) actual += ' ';
            actual += scaleFormula.degreeAsANSIString(degreeNumber);
        }
    }

    var expected = chordFormulasInScaleFormulas[scaleFormula.name][chordFormula.name];
    if (expected === undefined) {
        addNewLi(scaleFormula.nameAsSet + " have a(n) " + chordFormula.name + " rooted on no degree", actual === '');
    }
    else {
        addNewLi(scaleFormula.nameAsSet + " have a(n) " + chordFormula.name + " rooted on degree(s) " + expected, actual === expected);
    }
}