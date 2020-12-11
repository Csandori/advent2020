const input = require("./11input");

let data = input.input.split(/[\r\n]/gm).map((x) => x.split(""));
function one() {
  let tempData = JSON.parse(JSON.stringify(data));
  let change = 0;
  function recursive() {
    change = 0;
    data.forEach((line, y) => {
      line.forEach((seat, x) => {
        if (seat !== ".") {
          let neighbors = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
          ];
          neighbors = neighbors.filter(
            (el) =>
              el[0] >= 0 &&
              el[1] >= 0 &&
              el[0] <= line.length - 1 &&
              el[1] <= data.length - 1 &&
              data[el[1]][el[0]] === "#"
          );
          if (neighbors.length === 0 && seat === "L") {
            tempData[y][x] = "#";
            change++;
          } else if (neighbors.length >= 4 && seat === "#") {
            tempData[y][x] = "L";
            change++;
          }
        }
      });
    });
    data = JSON.parse(JSON.stringify(tempData));
    let readable = tempData.map((x) => x.reduce((a, b) => (a += b)));
    if (change != 0) {
      recursive();
    } else {
      console.log(
        (readable.reduce((a, b) => (a += b)).match(/#/g) || []).length
      );
    }
  }
  recursive();
}

function two() {
  let tempData = JSON.parse(JSON.stringify(data));
  let change = 0;
  function recursive() {
    change = 0;
    data.forEach((line, y) => {
      line.forEach((seat, x) => {
        if (seat !== ".") {
          let neighbors = map[y + "|" + x].neighbors
            .flat()
            .filter((el) => el.value != undefined)
            .map((x) => [x.y, x.x])
            .map((x) => data[x[0]][x[1]])
            .filter((el) => el === "#");

          if (neighbors.length === 0 && seat === "L") {
            tempData[y][x] = "#";
            change++;
          } else if (neighbors.length >= 5 && seat === "#") {
            tempData[y][x] = "L";
            change++;
          }
        }
      });
    });
    data = JSON.parse(JSON.stringify(tempData));
    let readable = tempData.map((x) => x.reduce((a, b) => (a += b)));
    if (change != 0) {
      recursive();
    } else {
      console.log(
        (readable.reduce((a, b) => (a += b)).match(/#/g) || []).length
      );
    }
  }
  recursive();
}

function createMap() {
  let map = {};
  data.forEach((line, y) => {
    line.forEach((seat, x) => {
      map[y + "|" + x] = {
        value: seat,
        neighbors: [
          [
            findNeighbor(-1, -1, x, y),
            findNeighbor(0, -1, x, y),
            findNeighbor(1, -1, x, y),
          ],
          [findNeighbor(-1, 0, x, y), findNeighbor(1, 0, x, y)],
          [
            findNeighbor(-1, 1, x, y),
            findNeighbor(0, 1, x, y),
            findNeighbor(1, 1, x, y),
          ],
        ],
      };
    });
  });

  function findNeighbor(xDirection, yDirection, x, y) {
    let tempX = x,
      tempY = y;
    let startFlag = true;
    let value = data[y][x];
    let foundFlag = true;
    while (
      startFlag ||
      (value !== undefined && value !== "L" && value !== "#")
    ) {
      tempX += xDirection;
      tempY += yDirection;

      if (data[tempY] == undefined) {
        value = undefined;
        foundFlag = false;
      } else {
        if (data[tempY][tempX] === undefined) foundFlag = false;
        value = data[tempY][tempX];
      }
      startFlag = false;
    }
    return { x: tempX, y: tempY, value: value, found: foundFlag };
  }
  return map;
}
let map = createMap();

one(); // 2164

data = input.input.split(/[\r\n]/gm).map((x) => x.split(""));
two(); // 1974
