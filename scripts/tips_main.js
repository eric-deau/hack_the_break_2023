var Q1 = localStorage.getItem("Q1");
var Q2 = localStorage.getItem("Q2");
var Q3 = localStorage.getItem("Q3");
var Q4 = localStorage.getItem("Q4");

function loadTips() {
  $.get(`./text/${Q1}.html`, function (data) {
    console.log($("#carouseldynamic_first").append(data));
    for (let i= 1; i<10;i++)
      if (i == 3 || i == 4 || i == 5){
        $(`#card_${i}`).hide()
      }
});

$.get(`./text/${Q2}.html`, function (data) {
   console.log($("#carouseldynamic_first").append(data));
  $("#card_first").hide()
  $("#card_second").hide()
});
  
    $.get(`./text/${Q1}.html`, function (data) {
      console.log($("#carouseldynamic_third").append(data));
  });
    $.get(`./text/${Q2}.html`, function (data) {
      console.log($("#carouseldynamic_fourth").append(data));
  });

if (Q1 == "Not Stressed"){
  console.log("all.good")
  $("#carouseldynamic_first").hide()
  $("#carouseldynamic_third").hide()
  $("#carouseldynamic_fourth").hide()
  $("#foryou").hide()
  $("#fullforyou").hide()
}

}

loadTips();
