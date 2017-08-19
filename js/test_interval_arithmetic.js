"use strict";

var settingDimAndAug = undefined;

function hookUpTestToUI() {
    settingDimAndAug = document.getElementById("settingDimAndAug");
    settingDimAndAug.addEventListener("click", onSettingClicked);
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
	for (var quantityA = 0; quantityA < _INTERVAL_DICTIONARY.length; ++quantityA) {
		for (var alterationA = 0; alterationA < _INTERVAL_DICTIONARY[quantityA].length ; ++alterationA) {
			if (quantityA == 0 && alterationA == 1) continue; // adding a per1 gets old quickly.
			var intervalA = _INTERVAL_DICTIONARY[quantityA][alterationA];
			if ((!settingDimAndAug.classList.contains("correct")) && (intervalA.qualityShort === "dim" || intervalA.qualityShort === "aug")) continue;

			for (var quantityB = 0; quantityB < _INTERVAL_DICTIONARY.length; ++quantityB) {
				for (var alterationB = 0; alterationB < _INTERVAL_DICTIONARY[quantityB].length ; ++alterationB) {
					if ((quantityB == 0 || quantityB == 7) && alterationB == 1) continue; // adding a per1 or a per8 gets old quickly.
					var intervalB = _INTERVAL_DICTIONARY[quantityB][alterationB];
					if ((!settingDimAndAug.classList.contains("correct")) && (intervalB.qualityShort === "dim" || intervalB.qualityShort === "aug")) continue;

					var intervalAnswer = intervalA.plusInterval(intervalB);
					questionSeries.push(new Question("what simple interval is " + articleForName(intervalA.name), intervalA.name + " plus " + articleForName(intervalB.name) + " " + intervalB.name + "?", intervalAnswer.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
				}
			}
		}
	}

	for (var quantitySum = 0; quantitySum < _INTERVAL_DICTIONARY.length; ++quantitySum) {
		for (var alterationSum = 0; alterationSum < _INTERVAL_DICTIONARY[quantitySum].length ; ++alterationSum) {
			var intervalSum = _INTERVAL_DICTIONARY[quantitySum][alterationSum];

			if ((!settingDimAndAug.classList.contains("correct")) && (intervalSum.qualityShort === "dim" || intervalSum.qualityShort === "aug")) continue;

			for (var quantityA = 0; quantityA < _INTERVAL_DICTIONARY.length; ++quantityA) {
				for (var alterationA = 0; alterationA < _INTERVAL_DICTIONARY[quantityA].length ; ++alterationA) {
					if (quantityA == 0 && alterationA == 1) continue; // subtracting a per1 gets old quickly.
					if (quantityA == quantitySum && alterationA == alterationSum) continue; // answering per1 gets old quickly.
					var intervalA = _INTERVAL_DICTIONARY[quantityA][alterationA];

					if ((!settingDimAndAug.classList.contains("correct")) && (intervalA.qualityShort === "dim" || intervalA.qualityShort === "aug")) continue;

					var intervalAnswer = intervalSum.minusInterval(intervalA);
					questionSeries.push(new Question("what interval is " + articleForName(intervalSum.name), intervalSum.name + " minus " + articleForName(intervalA.name) + " " + intervalA.name + "?", intervalAnswer.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
				}
			}
		}
	}
}

//function newQuestionSeries() {
//	for (var quantityA = 0; quantityA < _INTERVAL_DICTIONARY.length; ++quantityA) {
//		for (var alterationA = 0; alterationA < _INTERVAL_DICTIONARY[quantityA].length ; ++alterationA) {
//			if (quantityA == 0 && alterationA == 1) continue; // adding a per1 gets old quickly.
//			var intervalA = _INTERVAL_DICTIONARY[quantityA][alterationA];
//			if ((!settingDimAndAug.classList.contains("correct")) && (intervalA.qualityShort === "dim" || intervalA.qualityShort === "aug")) continue;

//			for (var quantityB = 0; quantityB < (7 - quantityA) ; ++quantityB) {
//				for (var alterationB = 0; alterationB < _INTERVAL_DICTIONARY[quantityB].length ; ++alterationB) {
//					if (quantityB == 0 && alterationB == 1) continue; // adding a per1 gets old quickly.
//					var intervalB = _INTERVAL_DICTIONARY[quantityB][alterationB];
//					if ((!settingDimAndAug.classList.contains("correct")) && (intervalB.qualityShort === "dim" || intervalB.qualityShort === "aug")) continue;

//					var intervalAnswer = intervalA.plusInterval(intervalB);
//					questionSeries.push(new Question("what interval is " + articleForName(intervalA.name), intervalA.name + " plus " + articleForName(intervalB.name) + " " + intervalB.name + "?", intervalAnswer.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
//				}
//			}
//		}
//	}

//	for (var quantitySum = 0; quantitySum < _INTERVAL_DICTIONARY.length; ++quantitySum) {
//		for (var alterationSum = 0; alterationSum < _INTERVAL_DICTIONARY[quantitySum].length ; ++alterationSum) {
//			var intervalSum = _INTERVAL_DICTIONARY[quantitySum][alterationSum];

//			if ((!settingDimAndAug.classList.contains("correct")) && (intervalSum.qualityShort === "dim" || intervalSum.qualityShort === "aug")) continue;

//			for (var quantityA = 0; quantityA < quantitySum; ++quantityA) {
//				for (var alterationA = 0; alterationA < _INTERVAL_DICTIONARY[quantityA].length ; ++alterationA) {
//					if (quantityA == 0 && alterationA == 1) continue; // subtracting a per1 gets old quickly.
//					var intervalA = _INTERVAL_DICTIONARY[quantityA][alterationA];

//					if ((!settingDimAndAug.classList.contains("correct")) && (intervalA.qualityShort === "dim" || intervalA.qualityShort === "aug")) continue;

//					var intervalAnswer = intervalSum.minusInterval(intervalA);
//					questionSeries.push(new Question("what interval is " + articleForName(intervalSum.name), intervalSum.name + " minus " + articleForName(intervalA.name) + " " + intervalA.name + "?", intervalAnswer.name, PICKER_KIND_INTERVAL, Math.random() * 1000));
//				}
//			}
//		}
//	}
//}

function constructPickerForCurrentQuestion() {
    if (pickerThis === null) {
        pickerThis = new PickerTwelveClock();
    }
    pickerOnLayoutChangedBase();
}