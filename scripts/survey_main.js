function saveSurveyResults() {
  localStorage.clear();

  var Q1 = $("#Q1").val();
  console.log("Q1: " + Q1);
  localStorage.setItem("Q1", Q1);

  var Q2 = $("#Q2").val();
  console.log("Q2: " + Q2);
  localStorage.setItem("Q2", Q2);

  var Q3 = $("#Q3").val();
  console.log("Q3: " + Q3);
  localStorage.setItem("Q3", Q3);

  var Q4;

  if ($("#inlineRadio1").is(":checked")) {
    Q4 = $("#inlineRadio1").val();
  } else if ($("#inlineRadio2").is(":checked")) {
    Q4 = $("#inlineRadio2").val();
  } else if ($("#inlineRadio3").is(":checked")) {
    Q4 = $("#inlineRadio3").val();
  } else if ($("#inlineRadio4").is(":checked")) {
    Q4 = $("#inlineRadio4").val();
  } else if ($("#inlineRadio5").is(":checked")) {
    Q4 = $("#inlineRadio5").val();
  }
  db.collection("surveys").doc("surveys".uid).set({
    emotion: Q1,
    how_long: Q2,
    reason: Q3,
    stress_level: Q4,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })

  localStorage.setItem("Q4", Q4);
}

var subjectObject = {
  "Not Stressed": {
    "Enjoyment of Occupation": ["1 or more days", "1 or more months", "1 or more years"],
    "Financials": ["1 or more days", "1 or more months", "1 or more years"],
    "Current Workload": ["1 or more days", "1 or more months", "1 or more years"]
  },

  "Jobless": {
    "Financial": ["1 or more days", "1 or more months", "1 or more years"],
    "Interviews": ["1 or more days", "1 or more months", "1 or more years"],
    "Current Workload": ["1 or more days", "1 or more months", "1 or more years"]
  },

  "Current Job": {
    "Financial": ["1 or more days", "1 or more months", "1 or more years"],
    "Deadlines": ["1 or more days", "1 or more months", "1 or more years"],
    "Interpersonal": ["1 or more days", "1 or more months", "1 or more years"]
  },
}
window.onload = function () {
  var subjectSel = document.getElementById("Q1");
  var topicSel = document.getElementById("Q2");
  var chapterSel = document.getElementById("Q3");
  for (var x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
  subjectSel.onchange = function () {
    //empty Chapters- and Topics- dropdowns
    chapterSel.length = 1;
    topicSel.length = 1;
    //display correct values
    for (var y in subjectObject[this.value]) {
      topicSel.options[topicSel.options.length] = new Option(y, y);
    }
  }
  topicSel.onchange = function () {
    //empty Chapters dropdown
    chapterSel.length = 1;
    //display correct values
    var z = subjectObject[subjectSel.value][this.value];
    for (var i = 0; i < z.length; i++) {
      chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
    }
  }
}

