let data = require("./10input");
//"What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?"
let input = data.input;
//can produce 1,2,3 lower than input, or 3 higher than the highest
let values = input.split(/[\n\r]/gm).map((x) => parseInt(x));

values.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    return 0;
  }
});
let combinations = values.reduce((a, b) => {
  a[b] = (a[b - 3] || 0) + (a[b - 2] || 0) + (a[b - 1] || 0);
  return a;
}, [1]).pop();
console.log(combinations);
values.unshift(0);
let object = { onedifference: 0, twodifference: 0, threedifference: 1 };
function one() {
  values.forEach((el, index) => {
    if (index !== el.length - 1) {
      switch (values[index + 1] - el) {
        case 1:
          object.onedifference++;
          break;
        case 2:
          object.twodifference++;
          break;
        case 3:
          object.threedifference++;
          break;
      }
    }
  });
  console.log(object);
  console.log(object.onedifference * object.threedifference);
}
function two() {
  let map={}
  let returnNumber = 0;
  recursive(values, 0);
  function recursive(array, position) {
    if (position !== array.length - 1) {
      switch (array[position + 1] - array[position]) {
        case 1:
          if (
            position !== array.length - 2 &&
            array[position + 2] - array[position] <= 3
          ) {
            recursive(array, position + 2);
          }
          if (
            position !== array.length - 3 &&
            array[position + 3] - array[position] <= 3
          ) {
            recursive(array, position + 3);
          }
          recursive(array, position + 1);
          break;
        case 2:
          recursive(array, position + 1);
          if (
            position !== array.length - 2 &&
            array[position + 2] - array[position] <= 3
          ) {
            recursive(array, position + 2);
          }
          break;
        case 3:
          recursive(array, position + 1);
          break;
        default:
          returnNumber++;
          console.log(returnNumber);
          break;
      }
    } else {
      returnNumber++;
      returnNumber % 1000000000 === 0 ? console.log(returnNumber) : "";
    }
  }
  returnNumber % 1000000000 === 0 ? console.log(returnNumber) : "";
}
function twoVar() {
  values.sort((a, b) => {
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    } else {
      return 0;
    }
  });
  let returnNumber = 0;
  recursive(values, 0, 1, 1);
  function recursive(array, position, multiple, length) {
    if (position !== array.length - 1) {
      if (array[position] - array[position + 1] <= 3) {
        recursive(array, position + 1, length * multiple, length);
      }
      if (
        position !== array.length - 1 &&
        array[position] - array[position + 2] <= 3
      ) {
        recursive(array, position + 1, length * multiple, length);
      }
      if (
        position !== array.length - 2 &&
        array[position] - array[position + 3] <= 3
      ) {
        recursive(array, position + 1, length * multiple, length);
      }
    } else {
      returnNumber += length * multiple;
    }
  }
  console.log(returnNumber);
}
function twoVar2() {
  let arrayOfObjects = [];
  let object = { value: null, optionNum: null };
  let tempObject = JSON.parse(JSON.stringify(object));
  let tempArray = [];
  values.forEach((el, index) => {
    let count = 0;
    switch (values.length - 1 - index) {
      case 1:
        if (values[index + 1] - el <= 3) {
          tempArray.push(values[index + 1]);
          count++;
        }
        break;
      case 2:
        if (values[index + 2] - el <= 3) {
          tempArray.push(values[index + 2]);
          count++;
        }
        if (values[index + 1] - el <= 3) {
          tempArray.push(values[index + 1]);
          count++;
        }
        break;
      default:
        if (values[index + 3] - el <= 3) {
          tempArray.push(values[index + 3]);
          count++;
        }
        if (values[index + 2] - el <= 3) {
          tempArray.push(values[index + 2]);
          count++;
        }
        if (values[index + 1] - el <= 3) {
          tempArray.push(values[index + 1]);
          count++;
        }
        break;
    }
    let countBack = 0;
    switch (index) {
      case 1:
        if (el - values[index - 1] <= 3) {
          countBack++;
        }
        break;
      case 2:
        if (el - values[index - 2] <= 3) {
          countBack++;
        }
        if (el - values[index - 1] <= 3) {
          countBack++;
        }
        break;
      default:
        if (el - values[index - 3] <= 3) {
          countBack++;
        }
        if (el - values[index - 2] <= 3) {
          countBack++;
        }
        if (el - values[index - 1] <= 3) {
          countBack++;
        }
        break;
    }

    tempObject = {
      value: el,
      optionNum: count,
      countBack: countBack,
      list: tempArray,
    };
    tempArray = [];
    arrayOfObjects.push(tempObject);
    tempObject = JSON.parse(JSON.stringify(object));
  });
  let valami = 0;
  console.log(arrayOfObjects);
  arrayOfObjects.forEach((a) => {
    if (a.optionNum > 1) {
      valami += a.optionNum - 1;
    }
    if (a.countBack > 1) {
      valami += a.countBack - 1;
    }
  });
  let value = 1;
  console.log(
    arrayOfObjects
      .filter((el) => el.optionNum > 1)
      .forEach((el) => {
        value = value * (el.optionNum - 1);
      })
  );
  console.log(value);
  arrayOfObjects.map((el) => {
    el.list.forEach((el2) => {
      arrayOfObjects.find((e) => e.value == el2).answer;
    });
  });
}
one();

