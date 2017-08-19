"use strict";

// A "formula degrees" is a sequence of intervals, where the first interval is assumed to be a perfect unison.

var _MAJOR_SCALE_FORMULA = new FormulaDegrees("major scale", "maj", null, "1", "2", "3", "4", "5", "6", "7");
var _NATURAL_MINOR_SCALE_FORMULA = new FormulaDegrees("natural minor scale", "nat min", null, "1", "2", "b3", "4", "5", "b6", "b7");
var _HARMONIC_MINOR_SCALE_FORMULA = new FormulaDegrees("harmonic minor scale", "harm min", null, "1", "2", "b3", "4", "5", "b6", "7");
var _MELODIC_MINOR_SCALE_FORMULA = new FormulaDegrees("melodic minor scale", "mel min", null, "1", "2", "b3", "4", "5", "6", "7", "1'", "b7", "b6", "5", "4", "b3", "2", "1");

// In order of thirds, e.g. min3-min3 would be 0-0, and min3-maj3 would be 0-1, and so on.
var _DIMINISHED_TRIAD_FORMULA = new FormulaDegrees("diminished triad", "b5", null, "1", "b3", "b5"); // or "\xB0"
var _MINOR_TRIAD_FORMULA = new FormulaDegrees("minor triad", "m", "", "1", "b3", "5");
var _MAJOR_TRIAD_FORMULA = new FormulaDegrees("major triad", "M", "", "1", "3", "5");
var _AUGMENTED_TRIAD_FORMULA = new FormulaDegrees("augmented triad", "#5", null, "1", "3", "#5"); // or "+"

var _DIMINISHED_SEVENTH_CHORD_FORMULA = new FormulaDegrees("diminished seventh chord", "dim7", null, "1", "b3", "b5", "bb7"); // or "\xB07"
var _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA = new FormulaDegrees("half diminished seventh chord", "m7b5", "7b5", "1", "b3", "b5", "b7"); // or "\xF87"
var _MINOR_SEVENTH_CHORD_FORMULA = new FormulaDegrees("minor seventh chord", "m7", "7", "1", "b3", "5", "b7");
var _MINOR_MAJOR_SEVENTH_CHORD_FORMULA = new FormulaDegrees("minor major seventh chord", "mM7", "M7", "1", "b3", "5", "7");
var _DOMINANT_SEVENTH_CHORD_FORMULA = new FormulaDegrees("dominant seventh chord", "7", null, "1", "3", "5", "b7");
var _MAJOR_SEVENTH_CHORD_FORMULA = new FormulaDegrees("major seventh chord", "M7", null, "1", "3", "5", "7");
var _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA = new FormulaDegrees("augmented major seventh chord", "M7#5", null, "1", "3", "#5", "7"); // or "+M7"

var _DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA = new FormulaDegrees("dominant seventh flat five chord", "7b5", null, "1", "3", "b5", "b7");
var _AUGMENTED_SEVENTH_CHORD_FORMULA = new FormulaDegrees("augmented seventh chord", "7#5", null, "1", "3", "#5", "b7"); // or "+7"

var _CHORD_FORMULAS = [
_DIMINISHED_TRIAD_FORMULA,
_MINOR_TRIAD_FORMULA,
_MAJOR_TRIAD_FORMULA,
_AUGMENTED_TRIAD_FORMULA,
_DIMINISHED_SEVENTH_CHORD_FORMULA,
_HALF_DIMINISHED_SEVENTH_CHORD_FORMULA,
_MINOR_SEVENTH_CHORD_FORMULA,
_MINOR_MAJOR_SEVENTH_CHORD_FORMULA,
_DOMINANT_SEVENTH_CHORD_FORMULA,
_MAJOR_SEVENTH_CHORD_FORMULA,
_AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA,
_DOMINANT_SEVENTH_FLAT_FIVE_CHORD_FORMULA,
_AUGMENTED_SEVENTH_CHORD_FORMULA
];

function lookUpChordFormulaForFormulaDegrees(formulaDegrees) {
	for (var i = 0; i < _CHORD_FORMULAS.length; ++i) {
		if (formulaDegrees.isEqual(_CHORD_FORMULAS[i])) {
			return _CHORD_FORMULAS[i];
		}
	}
}

var chordFormulasInScaleFormulas = {};
Object.defineProperty(chordFormulasInScaleFormulas, _MAJOR_SCALE_FORMULA.name, { value: {} });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _DIMINISHED_TRIAD_FORMULA.name, { value: "7" });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _MINOR_TRIAD_FORMULA.name, { value: "2 3 6" });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _MAJOR_TRIAD_FORMULA.name, { value: "1 4 5" });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA.name, { value: "7" });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _MINOR_SEVENTH_CHORD_FORMULA.name, { value: "2 3 6" });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _DOMINANT_SEVENTH_CHORD_FORMULA.name, { value: "5" });
Object.defineProperty(chordFormulasInScaleFormulas[_MAJOR_SCALE_FORMULA.name], _MAJOR_SEVENTH_CHORD_FORMULA.name, { value: "1 4" });

Object.defineProperty(chordFormulasInScaleFormulas, _NATURAL_MINOR_SCALE_FORMULA.name, { value: {} });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _DIMINISHED_TRIAD_FORMULA.name, { value: "2" });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _MINOR_TRIAD_FORMULA.name, { value: "1 4 5" });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _MAJOR_TRIAD_FORMULA.name, { value: "b3 b6 b7" });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA.name, { value: "2" });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _MINOR_SEVENTH_CHORD_FORMULA.name, { value: "1 4 5" });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _DOMINANT_SEVENTH_CHORD_FORMULA.name, { value: "b7" });
Object.defineProperty(chordFormulasInScaleFormulas[_NATURAL_MINOR_SCALE_FORMULA.name], _MAJOR_SEVENTH_CHORD_FORMULA.name, { value: "b3 b6" });

Object.defineProperty(chordFormulasInScaleFormulas, _HARMONIC_MINOR_SCALE_FORMULA.name, { value: {} });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _DIMINISHED_TRIAD_FORMULA.name, { value: "2 7" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _MINOR_TRIAD_FORMULA.name, { value: "1 4" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _MAJOR_TRIAD_FORMULA.name, { value: "5 b6" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _AUGMENTED_TRIAD_FORMULA.name, { value: "b3" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _DIMINISHED_SEVENTH_CHORD_FORMULA.name, { value: "7" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _HALF_DIMINISHED_SEVENTH_CHORD_FORMULA.name, { value: "2" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _MINOR_SEVENTH_CHORD_FORMULA.name, { value: "4" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _MINOR_MAJOR_SEVENTH_CHORD_FORMULA.name, { value: "1" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _DOMINANT_SEVENTH_CHORD_FORMULA.name, { value: "5" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _MAJOR_SEVENTH_CHORD_FORMULA.name, { value: "b6" });
Object.defineProperty(chordFormulasInScaleFormulas[_HARMONIC_MINOR_SCALE_FORMULA.name], _AUGMENTED_MAJOR_SEVENTH_CHORD_FORMULA.name, { value: "b3" });

var _C_MAJOR_SCALE = new Notes(_C, _MAJOR_SCALE_FORMULA);
var _F_MAJOR_SCALE = new Notes(_F, _MAJOR_SCALE_FORMULA);
var _G_MAJOR_SCALE = new Notes(_G, _MAJOR_SCALE_FORMULA);
var _Bb_MAJOR_SCALE = new Notes(_Bb, _MAJOR_SCALE_FORMULA);
var _D_MAJOR_SCALE = new Notes(_D, _MAJOR_SCALE_FORMULA);
var _Eb_MAJOR_SCALE = new Notes(_Eb, _MAJOR_SCALE_FORMULA);
var _A_MAJOR_SCALE = new Notes(_A, _MAJOR_SCALE_FORMULA);
var _Ab_MAJOR_SCALE = new Notes(_Ab, _MAJOR_SCALE_FORMULA);
var _E_MAJOR_SCALE = new Notes(_E, _MAJOR_SCALE_FORMULA);
var _Db_MAJOR_SCALE = new Notes(_Db, _MAJOR_SCALE_FORMULA);
var _B_MAJOR_SCALE = new Notes(_B, _MAJOR_SCALE_FORMULA);
var _Gb_MAJOR_SCALE = new Notes(_Gb, _MAJOR_SCALE_FORMULA);
var _Fs_MAJOR_SCALE = new Notes(_Fs, _MAJOR_SCALE_FORMULA);
var _Cb_MAJOR_SCALE = new Notes(_Cb, _MAJOR_SCALE_FORMULA);
var _Cs_MAJOR_SCALE = new Notes(_Cs, _MAJOR_SCALE_FORMULA);

var _MAJOR_SCALES = {};
for (var i = 0; i < _NOTES.length; ++i) {
	var key = _NOTES[i].name;
	key = key.replace(/\u266D/g, 'b');
	key = key.replace(/\u266F/g, 's');
	Object.defineProperty(_MAJOR_SCALES, key, { value: new Notes(_NOTES[i], _MAJOR_SCALE_FORMULA) });
}

var _NATURAL_MINOR_SCALES = {};
for (var i = 0; i < _NOTES.length; ++i) {
	var key = _NOTES[i].name;
	key = key.replace(/\u266D/g, 'b');
	key = key.replace(/\u266F/g, 's');
	Object.defineProperty(_NATURAL_MINOR_SCALES, key, { value: new Notes(_NOTES[i], _NATURAL_MINOR_SCALE_FORMULA) });
}

var _HARMONIC_MINOR_SCALES = {};
for (var i = 0; i < _NOTES.length; ++i) {
	var key = _NOTES[i].name;
	key = key.replace(/\u266D/g, 'b');
	key = key.replace(/\u266F/g, 's');
	Object.defineProperty(_HARMONIC_MINOR_SCALES, key, { value: new Notes(_NOTES[i], _HARMONIC_MINOR_SCALE_FORMULA) });
}

function FormulaDegrees(name, shortName, suffixForRomanNumeralNotation, tonic) {
	this._name = name;
	this._shortName = shortName;
	this._suffixForRomanNumeralNotation = suffixForRomanNumeralNotation;
	this.tonic = lookUpIntervalForFormulaDegree(tonic);
	this.intervals = [];

	for (var i = 4; i < arguments.length; ++i) {
		this.intervals[i - 4] = lookUpIntervalForFormulaDegree(arguments[i]);
	}

	this.upperCaseRoman = lookUpFormulaDegreeForInterval(this.intervals[0].minusInterval(this.tonic)) != "b3";

	Object.defineProperty(this, "name",
    {
    	get: function () {
    		return this._name;
    	}
    });

	Object.defineProperty(this, "shortName",
    {
    	get: function () {
    	    return this._shortName;
    	}
    });

	Object.defineProperty(this, "suffixForRomanNumeralNotation",
    {
        get: function () {
            if (this._suffixForRomanNumeralNotation == null) return this._shortName;
            return this._suffixForRomanNumeralNotation;
        }
    });

	Object.defineProperty(this, "suffixForNoteName",
    {
    	get: function () {
    	    var suffixForNoteName = this._shortName;
    		if (suffixForNoteName == 'M') suffixForNoteName = '';
    		return suffixForNoteName;
    	}
    });

	Object.defineProperty(this, "nameOfChordFormulaInRomanNumeralNotation",
    {
    	get: function () {
    		var romanDegree = lookUpRomanDegreeForInterval(this.tonic);
    		if (!this.upperCaseRoman) romanDegree = romanDegree.toLowerCase();
    		return romanDegree + lookUpChordFormulaForFormulaDegrees(this).suffixForRomanNumeralNotation;
    	}
    });

	Object.defineProperty(this, "nameAsSet",
    {
    	get: function () {
    		return this._name + "s";
    	}
    });

	Object.defineProperty(this, "nameAsFormula",
    {
    	get: function () {
    		return this._name + " formula";
    	}
    });

	Object.defineProperty(this, "degreesAsString",
    {
    	get: function () {
    		var result = lookUpFormulaDegreeForInterval(this.tonic);
    		for (var i = 0; i < this.intervals.length; ++i) {
    			result += ' ' + lookUpFormulaDegreeForInterval(this.intervals[i]);
    		}
    		if (Note_NameIsUnicode) {
    			result = result.replace(/b/g, Typography_FlatUnicode);
    			result = result.replace(/#/g, Typography_SharpUnicode);
    		}
    		return result;
    	}
    });
}
FormulaDegrees.prototype.isEqual = function (scaleFormula) {
	if (this.intervals.length != scaleFormula.intervals.length) return false;
	for (var i = 0; i < this.intervals.length; ++i) {
		if (!this.intervals[i].isEqual(scaleFormula.intervals[i])) return false;
	}
	return true;
};
FormulaDegrees.prototype.degree = function (degreeNumber) {
	if (degreeNumber > 7) degreeNumber -= 7;
	//if (degreeNumber === 1) return _PER1; Looks like a bug, commenting out. All tests seem to work as well with this fixed.
	if (degreeNumber === 1) return this.tonic;
	return this.intervals[degreeNumber - 2];
};
FormulaDegrees.prototype.degreeAsANSIString = function (degreeNumber) {
	return lookUpFormulaDegreeForInterval(this.degree(degreeNumber));
};
FormulaDegrees.prototype.diatonicChordRoot1 = function (rootFormulaDegreeOrdinalNumber, toneCount) {
    var args = [null, null, null, "1"]; // the nulls are the name and shortName arguments.
	var rootInterval = this.degree(rootFormulaDegreeOrdinalNumber);
	for (var i = 0; i < toneCount - 1; ++i) {
		rootFormulaDegreeOrdinalNumber += 2;
		//var overflowOctave = _PER1;
		//if (degreeNumber > 7) {
		//degreeNumber -= 7;
		//overflowOctave = _PER8;
		//}
		//var degreeInterval = this.intervals[degreeNumber - 2].plusInterval(overflowOctave);
		var degreeInterval = this.degree(rootFormulaDegreeOrdinalNumber).minusInterval(rootInterval);
		args.push(lookUpFormulaDegreeForInterval(degreeInterval));
	}
	return new (Function.prototype.bind.apply(FormulaDegrees, [null].concat(args)));
};
FormulaDegrees.prototype.diatonicChordRootN = function (rootFormulaDegreeOrdinalNumber, toneCount) {
    var args = [null, null, null, rootFormulaDegreeOrdinalNumber.toString()]; // the nulls are the name and shortName arguments.
	var rootInterval = this.degree(rootFormulaDegreeOrdinalNumber);
	for (var i = 0; i < toneCount - 1; ++i) {
		rootFormulaDegreeOrdinalNumber += 2;
		if (rootFormulaDegreeOrdinalNumber > 7) rootFormulaDegreeOrdinalNumber -= 7;
		var degreeInterval = this.degree(rootFormulaDegreeOrdinalNumber);
		args.push(lookUpFormulaDegreeForInterval(degreeInterval));
	}
	return new (Function.prototype.bind.apply(FormulaDegrees, [null].concat(args)));
};
FormulaDegrees.prototype.chromaticChordRootN = function (rootFormulaDegree, chordFormula) {
    var args = [null, null, null, rootFormulaDegree]; // the nulls are the name and shortName arguments.
	var rootInterval = lookUpIntervalForFormulaDegree(rootFormulaDegree);
	for (var i = 0; i < chordFormula.intervals.length; ++i) {
		args.push(lookUpFormulaDegreeForInterval(rootInterval.plusInterval(chordFormula.intervals[i])));
	}
	return new (Function.prototype.bind.apply(FormulaDegrees, [null].concat(args)));
};
FormulaDegrees.prototype.isEqual = function (rhs) {
	if (this.intervals.length != rhs.intervals.length) return false;
	for (var i = 0; i < this.intervals.length; ++i) {
		if (!this.intervals[i].minusInterval(this.tonic).isEqual(rhs.intervals[i])) return false;
	}
	return true;
};

function Notes(tonic, formulaDegrees) {
	this.degrees = [tonic];
	this.formulaDegrees = formulaDegrees;
	for (var i = 0; i < formulaDegrees.intervals.length; ++i) {
		this.degrees[i + 1] = this.degrees[0].plusInterval(formulaDegrees.intervals[i]);
	}

	Object.defineProperty(this, "name",
    {
    	get: function () {
    		return this.degrees[0].name + ' ' + formulaDegrees.name;
    	}
    });

	Object.defineProperty(this, "minimalName",
    {
    	get: function () {
    	    return this.degrees[0].name + this.formulaDegrees.suffixForNoteName;
    	}
    });

	Object.defineProperty(this, "degreesAsString",
    {
    	get: function () {
    		var result = this.degrees[0].name;
    		for (var i = 1; i < this.degrees.length; ++i) {
    			result += ' ' + this.degrees[i].name;
    		}
    		if (Note_NameIsUnicode) {
    			result = result.replace(/b/g, Typography_FlatUnicode);
    			result = result.replace(/#/g, Typography_SharpUnicode);
    		}
    		return result;
    	}
    });
}
Notes.prototype.degree = function (degreeNumber) {
	return this.degrees[degreeNumber - 1];
};

function ScaleDegreeNumber(scaleDegreeNumber) {
	this.scaleDegreeNumber = scaleDegreeNumber;

	Object.defineProperty(this, "name",
    {
    	get: function () {
    		if (this.scaleDegreeNumber === 1)
    			return "1st";
    		else if (this.scaleDegreeNumber === 2)
    			return "2nd";
    		else if (this.scaleDegreeNumber === 3)
    			return "3rd";
    		else
    			return this.scaleDegreeNumber + "th";
    	}
    });
}
ScaleDegreeNumber.prototype.isEqual = function (scaleDegreeNumber) {
	return this.scaleDegreeNumber === scaleDegreeNumber;
};