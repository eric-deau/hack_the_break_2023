function loadTips() {
  $.get("./text/option_1.html", function (data) {
    console.log($("#carouseldynamic").append(data));
  });

  $.get("./text/option_1.html", function (data) {
    console.log($("#carouseldynamic").append(data));
  });

  $.get("./text/option_1.html", function (data) {
    console.log($("#carouseldynamic").append(data));
  });
}

loadTips();
