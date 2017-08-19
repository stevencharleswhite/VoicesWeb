"use strict";

var Note_NameIncludesOctave = false;
var Note_NameIncludesNatural = false;
var Note_NameIsUnicode = false;
var GeneralNameIsSimple = true;

var IntervalNameIsAbbreviated = true;

var Typography_FlatUnicode = '\u266D';
var Typography_NaturalUnicode = '\u266E';
var Typography_SharpUnicode = '\u266F';
var Typography_DoubleSharpUnicode = 'x'; // a good-enough double-sharp because most font families don't have a glyph for "\ud834\udd2a".

// ASCII
var Typography_FlatAscii = 'b';
var Typography_NaturalAscii = 'n';
var Typography_SharpAscii = '#';
var Typography_DoubleSharpAscii = 'x'; // a good-enough double-sharp.

// The twelve-tone clock can be inferred from the note clock.
var _NOTE_CLOCK = ['C', '', 'D', '', 'E', 'F', '', 'G', '', 'A', '', 'B'];
var _NATURAL_TONE_INDEX = [0, 2, 4, 5, 7, 9, 11];

var _INTERVAL_CLOCK = ['1', '', '2', '', '3', '4', '', '5', '', '6', '', '7'];
var _INTERVAL_QUANTITY = ['unison', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'octave', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth'];
var _INTERVAL_QUANTITY_SHORT = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
var _INTERVAL_QUALITY = ['diminished', 'minor', 'perfect', 'major', 'augmented'];
var _INTERVAL_QUALITY_SHORT = ['dim', 'min', 'per', 'maj', 'aug'];
var _INTERVAL_QUALITY_VERY_SHORT = ['d', 'm', 'P', 'M', 'A'];

var _C = new Note();
var _G = new Note('G');
var _D = new Note('D');
var _A = new Note('A');
var _E = new Note('E');
var _B = new Note('B');
var _Fs = new Note('F', 1);
var _Cs = new Note('C', 1);
var _Gs = new Note('G', 1);
var _Ds = new Note('D', 1);
var _F = new Note('F');
var _Bb = new Note('B', -1);
var _Eb = new Note('E', -1);
var _Ab = new Note('A', -1);
var _Db = new Note('D', -1);
var _Gb = new Note('G', -1);
var _Cb = new Note('C', -1);
var _Fb = new Note('F', -1);

var _NOTES = [_C, _G, _D, _A, _E, _B, _Fs, _Cs, _Ds, _F, _Bb, _Eb, _Ab, _Db, _Gb, _Cb, _Fb];

var _PER1 = new Interval(1);
var _AUG1 = new Interval(1, 1);
var _MIN2 = new Interval(2, -1);
var _MAJ2 = new Interval(2);
var _AUG2 = new Interval(2, 1);
var _DIM3 = new Interval(3, -2);
var _MIN3 = new Interval(3, -1);
var _MAJ3 = new Interval(3);
var _AUG3 = new Interval(3, 1);
var _PER4 = new Interval(4);
var _DIM4 = new Interval(4, -1);
var _AUG4 = new Interval(4, 1);
var _2AUG4 = new Interval(4, 2);
var _DIM5 = new Interval(5, -1);
var _PER5 = new Interval(5);
var _AUG5 = new Interval(5, 1);
var _DIM6 = new Interval(6, -2);
var _MIN6 = new Interval(6, -1);
var _MAJ6 = new Interval(6);
var _AUG6 = new Interval(6, 1);
var _DIM7 = new Interval(7, -2);
var _MIN7 = new Interval(7, -1);
var _MAJ7 = new Interval(7);
var _AUG7 = new Interval(7, 1);
var _DIM8 = new Interval(8, -1);
var _PER8 = new Interval(8);

var _ROMAN_DEGREE_DICTIONARY = [["bI", "I", "#I"], ["bII", "II", "#II"], ["bbIII", "bIII", "III", "#III"], ["bIV", "IV", "#IV", "##IV"], ["bV", "V", "#V"], ["bVI", "VI", "#VI"], ["bbVII", "bVII", "VII", "#VII"], ["1'"]];
var _DEGREE_DICTIONARY = [["b1", "1", "#1"], ["b2", "2", "#2"], ["bb3", "b3", "3", "#3"], ["b4", "4", "#4", "##4"], ["b5", "5", "#5"], ["b6", "6", "#6"], ["bb7", "b7", "7", "#7"], ["1'"]];
var _INTERVAL_DICTIONARY = [[_DIM8, _PER1, _AUG1], [_MIN2, _MAJ2, _AUG2], [_DIM3, _MIN3, _MAJ3, _AUG3], [_DIM4, _PER4, _AUG4, _2AUG4], [_DIM5, _PER5, _AUG5], [_MIN6, _MAJ6, _AUG6], [_DIM7, _MIN7, _MAJ7, _AUG7], [_PER8]];

function lookUpInterval(quantity, alteration) {
    return _INTERVAL_DICTIONARY[quantity - 1][alteration];
}

function lookUpDegree(quantity, alteration) {
    var degree = _DEGREE_DICTIONARY[quantity - 1][alteration];
    if (Note_NameIsUnicode) {
        degree = degree.replace(/b/g, Typography_FlatUnicode);
        degree = degree.replace(/#/g, Typography_SharpUnicode);
    }
    return degree;
}

function lookUpIntervalForFormulaDegree(formulaDegree) {
    for (var quantity = 0; quantity < _DEGREE_DICTIONARY.length; ++quantity) {
        for (var alteration = 0; alteration < _DEGREE_DICTIONARY[quantity].length; ++alteration) {
            if (_DEGREE_DICTIONARY[quantity][alteration] === formulaDegree) {
                return _INTERVAL_DICTIONARY[quantity][alteration];
            }
        }
    }
}

function lookUpFormulaDegreeForInterval(interval) {
    for (var quantity = 0; quantity < _DEGREE_DICTIONARY.length; ++quantity) {
        for (var alteration = 0; alteration < _DEGREE_DICTIONARY[quantity].length ; ++alteration) {
            if (_INTERVAL_DICTIONARY[quantity][alteration].isEqual(interval)) {
                return _DEGREE_DICTIONARY[quantity][alteration];
            }
        }
    }
}

function lookUpRomanDegreeForInterval(interval) {
    for (var quantity = 0; quantity < _ROMAN_DEGREE_DICTIONARY.length; ++quantity) {
        for (var alteration = 0; alteration < _ROMAN_DEGREE_DICTIONARY[quantity].length ; ++alteration) {
            if (_INTERVAL_DICTIONARY[quantity][alteration].isEqual(interval)) {
                return _ROMAN_DEGREE_DICTIONARY[quantity][alteration];
            }
        }
    }
}

// A Note's state is a tuple containing a natural note letter (string, 'A'-'G', default 'C'),
// an alteration (number, default 0, undefined means this is a general note),
// and an octave number (number, default 4). A Note instance is immutable; some operations return a new Note.
// Note that middle C is C4 in scientific pitch notation (note-octave notation). The C4 designation is the most commonly
// recognized in auditory science and most frequently used in musical studies.
// Operations on a note include: adding or subtracting an interval (if you add/subtract a general interval, the resulting note is general).

function Note(naturalNoteLetter, alteration, octaveNumber, isGeneral) {
    this.naturalNoteLetter = 'C';
    this.alteration = 0;
    this.octaveNumber = 4;

    if (typeof naturalNoteLetter == "string") {
        if (_NOTE_CLOCK.indexOf(naturalNoteLetter) != -1) {
            this.naturalNoteLetter = naturalNoteLetter;
        }
    }

    if (typeof alteration == "number") {
        this.alteration = alteration;
    }

    if (typeof octaveNumber == "number") {
        this.octaveNumber = octaveNumber;
    }

    if (typeof isGeneral == "boolean" && isGeneral) {
        this.alteration = undefined;
        this.octaveNumber = undefined;
    }

    Object.defineProperty(this, "naturalClockIndex",
    {
        get: function () {
            return _NOTE_CLOCK.indexOf(this.naturalNoteLetter);
        }
    });

    Object.defineProperty(this, "name",
    {
        get: function () {
            if (this.isGeneral) {
                return this.generalName;
            }

            var name = this.naturalNoteLetter;
            if (Note_NameIncludesOctave && !(this.octaveNumber === undefined)) {
                name += this.octaveNumber;
            }

            var accidentals = "";
            if (this.alteration === 0 && Note_NameIncludesNatural) {
                accidentals = Note_NameIsUnicode ? Typography_NaturalUnicode : Typography_NaturalAscii;
            }
            else {
                var diff = this.alteration;
                while (diff > 0) {
                    if (accidentals.length > 0 && (accidentals[accidentals.length - 1] === (Note_NameIsUnicode ? Typography_SharpUnicode : Typography_SharpAscii))) {
                        accidentals = accidentals.substring(0, accidentals.length - 1) + (Note_NameIsUnicode ? Typography_DoubleSharpUnicode : Typography_DoubleSharpAscii);
                    }
                    else {
                        accidentals += Note_NameIsUnicode ? Typography_SharpUnicode : Typography_SharpAscii;
                    }
                    --diff;
                }
                while (diff < 0) {
                    accidentals += Note_NameIsUnicode ? Typography_FlatUnicode : Typography_FlatAscii;
                    ++diff;
                }
            }
            return name + accidentals;
        }
    });

    Object.defineProperty(this, "generalName",
    {
        get: function () {
            var returnString = this.naturalNoteLetter;
            if (!GeneralNameIsSimple) {
                returnString += " of some kind";
            }
            return returnString;
        }
    });

    Object.defineProperty(this, "isGeneral",
    {
        get: function () {
            return this.alteration === undefined;
        }
    });
}
Note.prototype.isEqual = function (rhs) {
    var areEqual = true;
    if (this.naturalNoteLetter !== rhs.naturalNoteLetter || this.isGeneral !== rhs.isGeneral) areEqual = false;
    if (!this.isGeneral) {
        if (this.alteration !== rhs.alteration || this.octaveNumber !== rhs.octaveNumber) areEqual = false;
    }
    return areEqual;
};
//Note.prototype.copy = function () {
//    return new Note(this.naturalNoteLetter, this.alteration, this.octaveNumber, this.isGeneral);
//};
Note.prototype.flat = function () {
    if (!this.isGeneral) {
        --this.alteration;
    }
};
Note.prototype.sharp = function () {
    if (!this.isGeneral) {
        ++this.alteration;
    }
};
Note.prototype.plusInterval = function (interval) {
    var addendNaturalNoteLetterIndexIndex = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(this.naturalNoteLetter));
    var sumNaturalNoteLetterIndexIndex = (addendNaturalNoteLetterIndexIndex + (interval.quantityAsNumber - 1)) % 7;
    var sumNaturalNoteLetter = _NOTE_CLOCK[_NATURAL_TONE_INDEX[sumNaturalNoteLetterIndexIndex]];
    var sumAlteration = this.alteration;
    if (!this.isGeneral && !interval.isGeneral) {
        var naturalWidthOfInterval = interval.naturalClockIndex;
        var distanceFromNaturalThisToNaturalSum = _NOTE_CLOCK.indexOf(sumNaturalNoteLetter) - this.naturalClockIndex;
        if (distanceFromNaturalThisToNaturalSum < 0) distanceFromNaturalThisToNaturalSum += 12;
        sumAlteration += (naturalWidthOfInterval - distanceFromNaturalThisToNaturalSum);
        sumAlteration += interval.alterationFromNaturalAsNumber;
    }
    return new Note(sumNaturalNoteLetter, sumAlteration, this.octaveNumber, this.isGeneral && interval.isGeneral);
};
Note.prototype.minusInterval = function (interval) {
    //var addendNaturalNoteLetterIndexIndex = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(this.naturalNoteLetter));
    //var sumNaturalNoteLetterIndexIndex = (addendNaturalNoteLetterIndexIndex + (interval.quantityAsNumber - 1)) % 7;
    //var sumNaturalNoteLetter = _NOTE_CLOCK[_NATURAL_TONE_INDEX[sumNaturalNoteLetterIndexIndex]];
    //var sumAlteration = this.alteration;
    //if (!this.isGeneral && !interval.isGeneral) {
    //    var naturalWidthOfInterval = interval.naturalClockIndex;
    //    var distanceFromNaturalThisToNaturalSum = _NOTE_CLOCK.indexOf(sumNaturalNoteLetter) - this.naturalClockIndex;
    //    if (distanceFromNaturalThisToNaturalSum < 0) distanceFromNaturalThisToNaturalSum += 12;
    //    sumAlteration += naturalWidthOfInterval - distanceFromNaturalThisToNaturalSum;
    //    sumAlteration += interval.alterationFromNaturalAsNumber;
    //}
    //return new Note(sumNaturalNoteLetter, sumAlteration, this.octaveNumber, this.isGeneral && interval.isGeneral);

    var minuendNaturalNoteLetterIndexIndex = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(this.naturalNoteLetter));
    var differenceNaturalNoteLetterIndexIndex = (minuendNaturalNoteLetterIndexIndex - (interval.quantityAsNumber - 1));
    if (differenceNaturalNoteLetterIndexIndex < 0) differenceNaturalNoteLetterIndexIndex += 7;
    var differenceNaturalNoteLetter = _NOTE_CLOCK[_NATURAL_TONE_INDEX[differenceNaturalNoteLetterIndexIndex]];
    var differenceAlteration = this.alteration;
    if (!this.isGeneral && !interval.isGeneral) {
        var naturalWidthOfInterval = -interval.naturalClockIndex;
        var distanceFromNaturalThisToNaturalDifference = _NOTE_CLOCK.indexOf(differenceNaturalNoteLetter) - (this.naturalClockIndex + 12);
        if (distanceFromNaturalThisToNaturalDifference < -11) distanceFromNaturalThisToNaturalDifference += 12;
        differenceAlteration += naturalWidthOfInterval - distanceFromNaturalThisToNaturalDifference;
        differenceAlteration -= interval.alterationFromNaturalAsNumber;
    }
    return new Note(differenceNaturalNoteLetter, differenceAlteration, this.octaveNumber, this.isGeneral && interval.isGeneral);
};
Note.prototype.intervalUpToNote = function (note) {
    var quantity = 1;
    var alteration = 0;
    var isGeneral = true;
    var lowNoteNaturalNoteLetterIndexIndex = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(this.naturalNoteLetter));
    var highNoteNaturalNoteLetterIndexIndex = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(note.naturalNoteLetter));
    quantity = highNoteNaturalNoteLetterIndexIndex - lowNoteNaturalNoteLetterIndexIndex + 1;
    if (quantity < 1) quantity += 7;
    if (!this.isGeneral && !note.isGeneral) {
        isGeneral = false;
        var naturalWidthFromNaturalLowNoteToNaturalHighNote = _INTERVAL_CLOCK.indexOf(quantity.toString());
        var lowNoteNaturalClockIndex = this.naturalClockIndex;
        var highNoteNaturalClockIndex = note.naturalClockIndex + 12;
        var actualWidthFromNaturalLowNoteToNaturalHighNote = highNoteNaturalClockIndex - lowNoteNaturalClockIndex;
        if (actualWidthFromNaturalLowNoteToNaturalHighNote > 11) actualWidthFromNaturalLowNoteToNaturalHighNote -= 12;
        alteration = actualWidthFromNaturalLowNoteToNaturalHighNote - naturalWidthFromNaturalLowNoteToNaturalHighNote;
        alteration -= this.alteration;
        alteration += note.alteration;
    }
    return new Interval(quantity, alteration, isGeneral);
};

// An interval's state is a displacement from C4 (a note in its default state), and a flag indicating whether the interval is ascending (Boolean, default true).
// An interval is general if the note in its state is general. An Interval instance is immutable; some operations return a new Interval.

function Interval(quantity, alteration, isGeneral) {
    this.note = new Note();
    this.octaves = Math.floor(quantity / 8);

    if (typeof quantity == "number") {
        var octaveNumber = 4;
        while (quantity > 7) {
            quantity -= 7;
            ++octaveNumber;
        }
        this.note = new Note(_NOTE_CLOCK[_NATURAL_TONE_INDEX[quantity - 1]], alteration, octaveNumber, isGeneral);
    }

    Object.defineProperty(this, "naturalClockIndex",
    {
        get: function () {
            return this.note.naturalClockIndex;
        }
    });

    Object.defineProperty(this, "clockIndex",
    {
        get: function () {
            return this.note.naturalClockIndex + this.alterationFromNaturalAsNumber;
        }
    });

    Object.defineProperty(this, "quantityAsNumber",
    {
        get: function () {
            return _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(this.note.naturalNoteLetter)) + 1;
        }
    });

    Object.defineProperty(this, "quantityAsString",
    {
        get: function () {
            return _INTERVAL_QUANTITY[_NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(this.note.naturalNoteLetter)) + (this.octaves * 7)];
        }
    });

    Object.defineProperty(this, "alterationFromNaturalAsNumber",
    {
        get: function () {
            return this.note.alteration;
        }
    });

    Object.defineProperty(this, "alterationMultiplierAsString",
    {
        get: function () {
            var alterationFromNaturalAsNumber = this.alterationFromNaturalAsNumber;
            if (!this.canBePerfect && alterationFromNaturalAsNumber < 0)
                ++alterationFromNaturalAsNumber;
            return (Math.abs(alterationFromNaturalAsNumber) > 1) ? Math.abs(alterationFromNaturalAsNumber).toString() : '';
        }
    });

    Object.defineProperty(this, "canBePerfect",
    {
        get: function () {
            return ((this.note.naturalNoteLetter === 'C') || (this.note.naturalNoteLetter === 'F') || (this.note.naturalNoteLetter === 'G'));
        }
    });

    Object.defineProperty(this, "qualityIndex",
    {
        get: function () {
            if (this.isGeneral)
                return undefined;
            if (this.canBePerfect) {
                if (this.note.alteration === 0)
                    return 2;
            }
            else {
                if (this.note.alteration === 0)
                    return 3;
                else if (this.note.alteration === -1)
                    return 1;
            }
            if (this.note.alteration > 0)
                return 4;
            else
                return 0;
        }
    });

    Object.defineProperty(this, "quality",
    {
        get: function () {
            if (this.isGeneral)
                return "";
            return _INTERVAL_QUALITY[this.qualityIndex];
        }
    });

    Object.defineProperty(this, "qualityShort",
    {
        get: function () {
            if (this.isGeneral)
                return "";
            return _INTERVAL_QUALITY_SHORT[this.qualityIndex]
        }
    });

    Object.defineProperty(this, "qualityVeryShort",
    {
        get: function () {
            if (this.isGeneral)
                return "";
            return _INTERVAL_QUALITY_VERY_SHORT[this.qualityIndex]
        }
    });

    Object.defineProperty(this, "name",
    {
        get: function () {
            if (this.note.isGeneral) {
                return this.generalName;
            }

            if (IntervalNameIsAbbreviated) {
                return this.alterationMultiplierAsString + this.quality + ' ' + this.quantityAsString;
            }
            else {
                return this.alterationMultiplierAsString + this.quality + ' ' + this.quantityAsString;
            }
        }
    });

    Object.defineProperty(this, "generalName",
    {
        get: function () {
            var returnString = _INTERVAL_QUANTITY[this.quantityAsNumber - 1];
            if (!GeneralNameIsSimple) {
                returnString += " of some kind";
            }
            return returnString;
        }
    });

    Object.defineProperty(this, "generalNameShort",
    {
        get: function () {
            var returnString = _INTERVAL_QUANTITY_SHORT[this.quantityAsNumber - 1];
            return returnString;
        }
    });

    Object.defineProperty(this, "isGeneral",
    {
        get: function () {
            return this.note.isGeneral;
        }
    });
}
Interval.prototype.isEqual = function (rhs) {
    var areEqual = true;
    if (this.quantityAsNumber !== rhs.quantityAsNumber || this.isGeneral !== rhs.isGeneral) areEqual = false;
    if (!this.isGeneral) {
        if (this.note.alteration !== rhs.note.alteration || this.note.octaveNumber !== rhs.note.octaveNumber) areEqual = false;
    }
    return areEqual;
};
//Interval.prototype.copy = function () {
//    return new Interval(this.quantityAsNumber, this.note.alteration, this.note.isGeneral);
//};
Interval.prototype.minusInterval = function (interval) {
    var differenceNote = this.note.minusInterval(interval);
    var quantity = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(differenceNote.naturalNoteLetter)) + 1;
    if (quantity === 1 && differenceNote.alteration === -1) quantity = 8;
    return new Interval(quantity, differenceNote.alteration, differenceNote.isGeneral);
};
Interval.prototype.plusInterval = function (interval) {
    var sumNote = this.note.plusInterval(interval);
    var quantity = _NATURAL_TONE_INDEX.indexOf(_NOTE_CLOCK.indexOf(sumNote.naturalNoteLetter)) + 1;
    if (quantity === 1 && sumNote.alteration === -1) quantity = 8;
    return new Interval(quantity, sumNote.alteration, sumNote.isGeneral);
};