const input = require("./14input");

let data = input.input.split(/[\n\r]/gm).reduce((a, b) => {
  if (b.includes("mask")) {
    a.push({ mask: b.split(" = ")[1], mems: {} });
  } else {
    a[a.length - 1].mems[b.split("[")[1].split("]")[0]] = parseInt(
      b.split(" = ")[1]
    );
  }
  return a;
}, []);

//console.log=(Array.from(input.example).reverse().toString)
function one() {
  let memory = {};
  data.forEach((el) => {
    let oKeys = Object.keys(el.mems);
    oKeys.forEach((oKey) => {
      let dec = el.mems[oKey];
      let binary = dec.toString(2);

      let arrayBinary = Array.from(binary).reverse();
      let arrayMask = Array.from(el.mask).reverse();
      let returnArray = [];
      arrayMask.forEach((mask, index) => {
        switch (mask) {
          case "X":
            if (index > arrayBinary.length - 1) {
              returnArray.push("0");
            } else {
              returnArray.push(arrayBinary[index]);
            }
            break;
          default:
            returnArray.push(arrayMask[index]);
            break;
        }
      });
      let result = returnArray.reverse().reduce((a, b) => (a += b));
      memory[oKey] = result;
    });
  });
  let memories = Object.keys(memory);
  let finalResult = memories.reduce((a, b) => {
    a += parseInt(memory[b], 2);
    return a;
  }, 0);
  console.log(finalResult);
}

function two() {
  let memory = [];
  data.forEach((el) => {
    let oKeys = Object.keys(el.mems);
    oKeys.forEach((oKey) => {
      let dec = oKey;
      let binary = parseInt(dec).toString(2);

      let arrayBinary = Array.from(binary).reverse();
      let arrayMask = Array.from(el.mask).reverse();
      let returnArray = [];
      arrayMask.forEach((mask, index) => {
        switch (mask) {
          case "X":
            returnArray.push("X");
            break;
          case "0":
            if (index < arrayBinary.length) {
              returnArray.push(arrayBinary[index]);
            } else {
              returnArray.push("0");
            }
            break;
          case "1":
            returnArray.push("1");
            break;
          default:
            break;
        }
      });
      let result = returnArray.reverse().reduce((a, b) => (a += b));
      memory.push({ result: result, value: el.mems[oKey] });
    });
  });
  console.log(memory);
  let finalMemory = {};
  memory.forEach((el) => {
    returnDecimals(el.result, []).forEach(
      (el2) => (finalMemory[el2] = parseInt(el.value))
    );
  });
  console.log(
    Object.keys(finalMemory).reduce((a, b) => {
      a += finalMemory[b];
      return a;
    }, 0)
  );
  function returnDecimals(code, returnArray) {
    if (code.includes("X")) {
      let index = code.indexOf("X");
      returnDecimals(
        code.substring(0, index) + "0" + code.substring(index + 1, code.length),
        returnArray
      );
      returnDecimals(
        code.substring(0, index) + "1" + code.substring(index + 1, code.length),
        returnArray
      );
    } else {
      returnArray.push(parseInt(code, 2));
    }
    return returnArray;
  }
}
//one();
two();
