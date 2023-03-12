var Q1 = localStorage.getItem("Q1");
var Q2 = localStorage.getItem("Q2");
var Q3 = localStorage.getItem("Q3");
var Q4 = localStorage.getItem("Q4");

function getOptions() {

  //   console.log("Q1: " + Q1);
  //   console.log("Q2: " + Q2);
  //   console.log("Q3: " + Q3);
  //   console.log("Q4: " + Q4);

  switch (Q1) {
    case "What...":
      console.log(Q1);
      break;
    case "o1":
      console.log(Q1);
      break;
    case "o2":
      console.log(Q1);
      break;
    case "o3":
      console.log(Q1);
      break;
  }
console.log(Q1)
console.log(Q2)
}

getOptions();

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
