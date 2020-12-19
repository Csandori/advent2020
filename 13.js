let data = require("./13input");
let lines = data.input.split(/[\r\n]/g);

let time = parseInt(lines[0].trim());
let buses = lines[1]
  .split(",")
  .filter((el) => el !== "x")
  .map((el) => {
    return {
      busNumber: parseInt(el),
      minuteAfter: parseInt(el) - (time % parseInt(el)),
    };
  });

buses.sort((a, b) => {
  return a.minuteAfter - b.minuteAfter;
});
// First part answer
console.log(buses[0].busNumber * buses[0].minuteAfter);



let buses42 = lines[1]
  .split(",")
  .filter((el) => el !== "x")
  .map((el) => {
    return {
      busNumber: parseInt(el),
      minuteAfter: parseInt(el) - (time % parseInt(el)),
      position: lines[1].split(",").indexOf(el),
    };
  });

buses42.sort((a, b) => {
  return b.busNumber - a.busNumber;
});
console.log(buses42[0]);
let foundFlag = false;
let i = 1;

let tempArray = [];
for (let i = 0; i < buses42.length; i++) {
  let busesI = buses42[i];
  for (let j = 0; j < buses42.length; j++) {
    let busesJ = buses42[j];
    if (
      i !== j &&
      busesI.busNumber + busesI.position - busesJ.position > 0 &&
      (busesI.busNumber + busesI.position - busesJ.position) %
        busesJ.busNumber ==
        0
    ) {
      tempArray.push(busesI);
    }
  }
}
console.log(tempArray);
while (!foundFlag) {
  let line = [];
  let base = buses42[0].busNumber * i - buses42[0].position;
  if (validate(base, buses42)) {
    console.log(base);
    buses42.forEach((el) => {
      console.log(
        el.busNumber +
          "___" +
          ((base % el.busNumber) - el.position) +
          "__" +
          el.position
      );
      //  console.log(el.busNumber*i + "__" + el.position);
    });
    foundFlag = true;
    //2757600000000
  } else {
  }
  if (base % 100000000 === 0) {
    console.log(base + "  E" + String(base).length);
  }
  i++;
}

function validate(base, buses) {
  let returnValue = false;
  for (let i = 0; i < buses.length; i++) {
    let el = buses[i];
    let bn = el.busNumber;

    if ((base + el.position) % bn == 0) {
      returnValue = true;
    } else {
      return false;
    }
  }
  console.log("slkanflasn");
  return returnValue;
}
// 7,13,x,x,59,x,31,19

function one() {}
