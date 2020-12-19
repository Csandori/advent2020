let data = require("./12input");

let lines = data.input.split(/[\r\n]/gm);

let pos = [0, 0, 90];
function one() {
  lines.forEach((line) => {
    let direction = line.trim().charAt(0);
    console.log(direction);
    console.log(line);
    let second = parseInt(line.trim().substring(1));
    if (direction == "F") {
      switch (pos[2]) {
        case 0:
          direction = "N";
          break;
        case 90:
          direction = "E";
          break;
        case 180:
          direction = "S";
          break;
        case 270:
          direction = "W";
          break;
      }
    }
    switch (direction) {
      case "N":
        pos[0] += second;
        break;
      case "W":
        pos[1] -= second;
        break;
      case "S":
        pos[0] -= second;
        break;
      case "E":
        pos[1] += second;
        break;
      case "L":
        pos[2] -= second;
        if (pos[2] < 0) {
          pos[2] += 360;
        }
        break;
      case "R":
        pos[2] += second;
        if (pos[2] >= 360) {
          pos[2] -= 360;
        }
        break;
      case "F":
        break;
    }
    console.log(pos);
    console.log(direction);
    console.log("______________-");
  });
}
function two() {
  wPos = [1, 10];
  pos = [0, 0];
  lines.forEach((line) => {
    console.log("pos " + pos);
    console.log("way " + wPos);
    console.log(line);
    console.log("________");
    let direction = line.trim().charAt(0);
    let second = parseInt(line.trim().substring(1));
    switch (direction) {
      case "N":
        wPos[0] += second;
        break;
      case "W":
        wPos[1] -= second;
        break;
      case "S":
        wPos[0] -= second;
        break;
      case "E":
        wPos[1] += second;
        break;
      case "L":
        for (let i = 0; i < second / 90; i++) {
          wPos = rotate(wPos, "L");
        }
        break;
      case "R":
        for (let i = 0; i < second / 90; i++) {
          wPos = rotate(wPos, "R");
        }
        break;
      case "F":
        pos = [pos[0] + wPos[0] * second, pos[1] + wPos[1] * second];

        break;
    }
  });
  console.log(Math.sqrt(pos[0] * pos[0])+Math.sqrt(pos[1] * pos[1]));
}
function rotate(wPos, dir) {
  let tempPos = [0, 0];
  if (dir === "R") {
    // NW/SE
    // NE
    tempPos[0] = -1 * wPos[1];
    tempPos[1] = wPos[0];

    // NE
  } else {
    tempPos[1] = -1 * wPos[0];
    tempPos[0] = wPos[1];
  }
  return tempPos;
}
two();

/*

       N
W            E
       S

*/
