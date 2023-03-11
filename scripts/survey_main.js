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

  localStorage.setItem("Q4", Q4);
}
