function getOptions() {
  var Q1 = localStorage.getItem("Q1");
  var Q2 = localStorage.getItem("Q2");
  var Q3 = localStorage.getItem("Q3");
  var Q4 = localStorage.getItem("Q4");

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
}

getOptions();
console.log("Hello");
