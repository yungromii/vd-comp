let cols = 31;
let rows = 24;
let spacing;
let offsetX, offsetY;

let marginTop = 180;
let marginLeft = 180;

let viewMode = "full"; // "full", "timeRange", "weeklyGroup"
let timeStart = 9;
let timeEnd = 18;
let weekGroup = 0;

let animationSpeed = 545; // 한 프레임당 선 그려질 길이 (픽셀)
let drawingProgress = 0; // 현재 그려지는 선의 진행 정도

let categoryStyles = {
  "집":    { color: [255, 255, 224, 127],     weight: 20 },
  "남의집": { color: [255, 255, 204, 180],     weight: 30 },
  "학교":  { color: [255, 255, 0, 180],   weight: 35 },
  "꼼방":  { color: [255, 255, 0, 180],   weight: 30 },
  "식당":  { color: [0, 255, 0, 180],   weight: 25 },
  "기타":  { color: [255, 204, 255, 180], weight: 30 },
  "알바":  { color: [0, 255, 255, 180],   weight: 40 }
};

let points = [{date: "01", y: 0, category: "집"},
  {date: "01", y: 20, category: "식당"},
  {date: "01", y: 21, category: "기타"},
  {date: "02", y: 0, category: "기타"},
  {date: "02", y: 2, category: "남의집"},
  {date: "02", y: 5, category: "집"},
  {date: "02", y: 17, category: "식당"},
  {date: "02", y: 19, category: "남의집"},
  {date: "03", y: 0, category: "남의집"},
  {date: "03", y: 12, category: "식당"},
  {date: "03", y: 15, category: "남의집"},
  {date: "04", y: 0, category: "남의집"},
  {date: "04", y: 13, category: "기타"},
  {date: "04", y: 16, category: "남의집"},
  {date: "04", y: 19, category: "식당"},
  {date: "04", y: 21, category: "남의집"},
  {date: "05", y: 0, category: "남의집"},
  {date: "05", y: 13, category: "집"},
  {date: "05", y: 15, category: "기타"},
  {date: "05", y: 17, category: "식당"},
  {date: "05", y: 18, category: "집"},
  {date: "05", y: 19, category: "식당"},
  {date: "05", y: 21, category: "집"},
  {date: "06", y: 0, category: "집"},
  {date: "07", y: 0, category: "집"},
  {date: "07", y: 10, category: "알바"},
  {date: "07", y: 19, category: "남의집"},
  {date: "07", y: 22, category: "집"},
  {date: "08", y: 0, category: "집"},
  {date: "09", y: 0, category: "집"},
  {date: "10", y: 0, category: "집"},
  {date: "10", y: 9, category: "학교"},
  {date: "10", y: 12, category: "학교"},
  {date: "10", y: 14, category: "학교"},
  {date: "10", y: 18, category: "식당"},
  {date: "10", y: 19, category: "남의집"},
  {date: "10", y: 21, category: "집"},
  {date: "11", y: 0, category: "집"},
  {date: "11", y: 1, category: "식당"},
  {date: "11", y: 3, category: "집"},
  {date: "11", y: 14, category: "학교"},
  {date: "11", y: 19, category: "식당"},
  {date: "11", y: 20, category: "기타"},
  {date: "11", y: 21, category: "식당"},
  {date: "11", y: 23, category: "집"},
  {date: "12", y: 0, category: "집"},
  {date: "12", y: 9, category: "학교"},
  {date: "12", y: 12, category: "학교"},
  {date: "12", y: 14, category: "학교"},
  {date: "12", y: 19, category: "식당"},
  {date: "12", y: 20, category: "집"},
  {date: "13", y: 0, category: "집"},
  {date: "13", y: 10, category: "알바"},
  {date: "13", y: 19, category: "식당"},
  {date: "13", y: 22, category: "집"},
  {date: "14", y: 0, category: "집"},
  {date: "14", y: 12, category: "알바"},
  {date: "14", y: 19, category: "기타"},
  {date: "14", y: 23, category: "기타"},
  {date: "15", y: 0, category: "집"},
  {date: "16", y: 0, category: "집"},
  {date: "16", y: 15, category: "기타"},
  {date: "16", y: 16, category: "식당"},
  {date: "16", y: 19, category: "식당"},
  {date: "16", y: 21, category: "식당"},
  {date: "16", y: 23, category: "집"},
  {date: "17", y: 0, category: "집"},
  {date: "17", y: 9, category: "학교"},
  {date: "17", y: 18, category: "꼼방"},
  {date: "18", y: 0, category: "꼼방"},
  {date: "18", y: 5, category: "집"},
  {date: "18", y: 17, category: "식당"},
  {date: "18", y: 18, category: "집"},
  {date: "18", y: 19, category: "꼼방"},
  {date: "19", y: 0, category: "꼼방"},
  {date: "19", y: 3, category: "집"},
  {date: "19", y: 9, category: "학교"},
  {date: "19", y: 19, category: "기타"},
  {date: "19", y: 20, category: "식당"},
  {date: "19", y: 22, category: "집"},
  {date: "20", y: 0, category: "집"},
  {date: "20", y: 13, category: "식당"},
  {date: "20", y: 14, category: "기타"},
  {date: "20", y: 15, category: "기타"},
  {date: "20", y: 17, category: "집"},
  {date: "21", y: 0, category: "집"},
  {date: "21", y: 12, category: "알바"},
  {date: "21", y: 19, category: "식당"},
  {date: "21", y: 21, category: "식당"},
  {date: "21", y: 23, category: "집"},
  {date: "22", y: 0, category: "집"},
  {date: "22", y: 12, category: "학교"},
  {date: "22", y: 18, category: "학교"},
  {date: "22", y: 23, category: "집"},
  {date: "23", y: 0, category: "집"},
  {date: "23", y: 12, category: "학교"},
  {date: "23", y: 18, category: "집"},
  {date: "24", y: 0, category: "집"},
  {date: "24", y: 9, category: "학교"},
  {date: "24", y: 11, category: "학교"},
  {date: "24", y: 14, category: "학교"},
  {date: "24", y: 17, category: "학교"},
  {date: "24", y: 20, category: "집"},
  {date: "25", y: 0, category: "집"},
  {date: "25", y: 16, category: "기타"},
  {date: "25", y: 18, category: "식당"},
  {date: "25", y: 19, category: "식당"},
  {date: "25", y: 21, category: "기타"},
  {date: "25", y: 22, category: "식당"},
  {date: "26", y: 0, category: "집"},
  {date: "26", y: 9, category: "학교"},
  {date: "26", y: 11, category: "학교"},
  {date: "26", y: 14, category: "학교"},
  {date: "26", y: 18, category: "집"},
  {date: "26", y: 21, category: "식당"},
  {date: "26", y: 22, category: "기타"},
  {date: "26", y: 23, category: "집"},
  {date: "27", y: 0, category: "집"},
  {date: "27", y: 12, category: "알바"},
  {date: "27", y: 19, category: "기타"},
  {date: "27", y: 21, category: "집"},
  {date: "28", y: 0, category: "집"},
  {date: "28", y: 12, category: "알바"},
  {date: "28", y: 19, category: "기타"},
  {date: "28", y: 21, category: "식당"},
  {date: "28", y: 23, category: "남의집"},
  {date: "29", y: 0, category: "남의집"},
  {date: "29", y: 3, category: "집"},
  {date: "29", y: 20, category: "식당"},
  {date: "29", y: 22, category: "집"},
  {date: "30", y: 0, category: "집"},
  {date: "30", y: 20, category: "식당"},
  {date: "30", y: 21, category: "집"},
  {date: "31", y: 0, category: "집"},
  {date: "31", y: 9, category: "학교"},
  {date: "31", y: 11, category: "학교"},
  {date: "31", y: 14, category: "학교"},
  {date: "31", y: 17, category: "꼼방"},
  {date: "31", y: 23, category: "집"}];

let drawnLines = [];
let startPoint = null;
let endPoint = null;

let selectedCategory = "집"; // Default selected category for adding points

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeCap(ROUND);
  spacing = min((width - 200) / (cols - 1), (height - 200) / (rows - 1));
  offsetX = (width - spacing * (cols - 1)) / 2;
  offsetY = (height - spacing * (rows - 1)) / 2;
  frameRate(60);
  noLoop(); // Stop automatic drawing until mouse click
}

function draw() {
  background(0);
  drawGrid();
  drawAllPoints();
  let totalLength = getTotalLineLength();
  drawLinesAnimated();
  drawingProgress += animationSpeed;
  // Stop animation after all lines are drawn
  if (drawingProgress > totalLength) {
    noLoop();
  }
  drawLines();
}
// Calculate the total length of all lines to control animation
function getTotalLineLength() {
  let grouped = {};
  for (let p of points) {
    if (!grouped[p.date]) grouped[p.date] = [];
    grouped[p.date].push(p);
  }
  let sortedDates = Object.keys(grouped).sort((a, b) => int(a) - int(b));
  let total = 0;
  for (let date of sortedDates) {
    let dateIndex = int(date) - 1;
    if (viewMode === "weeklyGroup") {
      let groupStart = weekGroup * 7;
      if (dateIndex < groupStart || dateIndex >= groupStart + 7) continue;
    }
    let dayPoints = grouped[date].sort((a, b) => a.y - b.y);
    for (let i = 0; i < dayPoints.length; i++) {
      let p1 = dayPoints[i];
      let p2 = dayPoints[i + 1];
      let y1 = offsetY + p1.y * spacing;
      if (!p2) {
        let dayEndY = offsetY + (rows - 1) * spacing;
        total += abs(dayEndY - y1);
        continue;
      }
      let y2 = offsetY + p2.y * spacing;
      total += abs(y2 - y1);
    }
  }
  return total;
}

function drawGrid() {
  push();
  stroke(220, 127);
  noFill();
  let colCount = (viewMode === "weeklyGroup") ? 7 : cols;
  let rowStart = (viewMode === "timeRange") ? timeStart : 0;
  let rowEnd = (viewMode === "timeRange") ? timeEnd + 1 : rows;

  for (let i = 0; i < colCount; i++) {
    for (let j = rowStart; j < rowEnd; j++) {
      let x = offsetX + i * spacing;
      let y = offsetY + j * spacing;
      // draw grid point with isolated style
      push();
      stroke(255);
      strokeWeight(1);
      fill(255,1);
      ellipse(x, y, 5, 5);
      pop();
    }
  }
  pop();
}
function drawLabels() {
  // text rendering disabled
}       

function drawLinesAnimated() {
  let grouped = {};
  for (let p of points) {
    if (!grouped[p.date]) grouped[p.date] = [];
    grouped[p.date].push(p);
  }

  let sortedDates = Object.keys(grouped).sort((a, b) => int(a) - int(b));
  let totalDrawn = 0;

  for (let date of sortedDates) {
    let dateIndex = int(date) - 1;
    if (viewMode === "weeklyGroup") {
      let groupStart = weekGroup * 7;
      if (dateIndex < groupStart || dateIndex >= groupStart + 7) continue;
    }

    let x = (viewMode === "weeklyGroup")
      ? offsetX + (dateIndex - weekGroup * 7) * spacing
      : offsetX + dateIndex * spacing;

    let dayPoints = grouped[date].sort((a, b) => a.y - b.y);
    for (let i = 0; i < dayPoints.length; i++) {
      let p1 = dayPoints[i];
      let p2 = dayPoints[i + 1];
      let y1 = offsetY + p1.y * spacing;
      if (!p2) {
        // 마지막 점이면 하루 끝(y=23h)까지만 그리기
        let dayEndY = offsetY + (rows - 1) * spacing;
        let style = categoryStyles[p1.category] || { color: [150, 150, 150, 127], weight: 6 };
        // isolate stroke state
        push();
        if(p1.category === "집"){
          noFill();
          stroke(...style.color);
          strokeWeight(style.weight);
        } else {
          stroke(...style.color);
          strokeWeight(style.weight);
        }
        let lineLength = abs(dayEndY - y1);
        if (drawingProgress > totalDrawn) {
          let visibleLength = min(drawingProgress - totalDrawn, lineLength);
          let yEnd = y1 + visibleLength * (dayEndY > y1 ? 1 : -1);
          line(x, y1, x, yEnd);
        }
        pop();
        totalDrawn += lineLength;
        continue;
      }
      let y2 = offsetY + p2.y * spacing;

      let style = categoryStyles[p1.category] || { color: [150, 150, 150, 127], weight: 6 };
      // isolate stroke state
      push();
      if(p1.category === "집"){
        noFill();
        stroke(...style.color);
        strokeWeight(style.weight);
      } else {
        stroke(...style.color);
        strokeWeight(style.weight);
      }

      let lineLength = abs(y2 - y1);
      if (drawingProgress > totalDrawn) {
        let visibleLength = min(drawingProgress - totalDrawn, lineLength);
        let yEnd = y1 + visibleLength * (y2 > y1 ? 1 : -1);
        line(x, y1, x, yEnd);
      }
      pop();
      totalDrawn += lineLength;
    }
  }

  
}

function keyPressed() {
  if (key === '1') {
    viewMode = "full";
  } else if (key === '2') {
    viewMode = "timeRange";
    timeStart = 9;
    timeEnd = 18;
  } else if (key === '3') {
    viewMode = "weeklyGroup"; weekGroup = 0;
  } else if (key === '4') {
    viewMode = "weeklyGroup"; weekGroup = 1;
  } else if (key === '5') {
    viewMode = "weeklyGroup"; weekGroup = 2;
  } else if (key === '6') {
    viewMode = "weeklyGroup"; weekGroup = 3;
  } else if (key === 'p' || key === 'P') {
    startDrawing();
  }

  drawingProgress = 0;
  loop(); // 다시 애니메이션 시작
}

function startDrawing() {
  // Placeholder for any animation start logic if needed
  // Currently handled by loop() in keyPressed
}

function mousePressed() {
  let threshold = 10;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = offsetX + i * spacing;
      let y = offsetY + j * spacing;
      let d = dist(mouseX, mouseY, x, y);
      if (d < threshold) {
        // Instead of conditional on existing points, allow adding or updating
        let matched = points.find(p => int(p.date) - 1 === i && p.y === j);
        if (!matched) {
          // Add new point with selectedCategory
          points.push({date: nf(i + 1, 2), y: j, category: selectedCategory});
        } else {
          // Update category of existing point
          matched.category = selectedCategory;
        }
        break;
      }
    }
  }
}

function drawAllPoints() {
  let grouped = {};
  for (let p of points) {
    if (!grouped[p.date]) grouped[p.date] = [];
    grouped[p.date].push(p);
  }

  let sortedDates = Object.keys(grouped).sort((a, b) => int(a) - int(b));
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let dateKey = nf(i + 1, 2);
      let dateIndex = i;
      if (viewMode === "weeklyGroup") {
        let groupStart = weekGroup * 7;
        if (dateIndex < groupStart || dateIndex >= groupStart + 7) continue;
      }
      let x = (viewMode === "weeklyGroup")
        ? offsetX + (dateIndex - weekGroup * 7) * spacing
        : offsetX + dateIndex * spacing;
      let y = offsetY + j * spacing;
      // Find if there is a point at this grid cell
      let dayPoints = grouped[dateKey] || [];
      let point = dayPoints.find(p => p.y === j);
      if (point) {
        let style = categoryStyles[point.category] || { color: [150, 150, 150, 127], weight: 6 };
        push();
        strokeWeight(25);
        stroke(...style.color);
        fill(...style.color);
        ellipse(x, y, 8, 8);
        pop();
      } else {
        // Draw default appearance for empty cells
        push();
        strokeWeight(25);
        stroke(100, 100, 100, 50);
        fill(100, 100, 100, 30);
        ellipse(x, y, 8, 8);
        pop();
      }
    }
  }
}

function drawLines() {
  strokeWeight(25);
  stroke(0); // Default stroke color, or customizable
  for (let l of drawnLines) {
    line(l.start.x, l.start.y, l.end.x, l.end.y);
  }
}