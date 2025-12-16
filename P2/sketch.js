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

let pendingStart = null;      // 시작점 임시 저장
let selectedCategory = null;  // 선택된 카테고리 버튼
let currentDataset = "custom"; // 현재 데이터셋 ("custom", "october", 새로 추가한 id 등)

// 버튼 / 탭 레이아웃 공통 상수
const CAT_BTN_W   = 50;
const CAT_BTN_H   = 26;
const CAT_BTN_GAP = 10;
const CAT_BTN_X_OFFSET = 160;  // 시간축 왼쪽으로부터 떨어진 정도

const TAB_W       = 50;
const TAB_H       = 26;
const TAB_GAP     = 10;
const TAB_X_MARGIN = 100;      // 그리드 오른쪽으로부터 떨어진 정도

// 카테고리 스타일
let categoryStyles = {
  "home":   { color: [255, 255, 224, 127], weight: 20 },
  "d.home": { color: [255, 255, 204, 180], weight: 22 },
  "school": { color: [255, 255, 0,   180], weight: 22 },
  "club":   { color: [255, 255, 0,   180], weight: 22 },
  "f.d":    { color: [0,   255, 0,   180], weight: 22 },
  "other":  { color: [255, 204, 255, 180], weight: 22 },
  "work":   { color: [0,   255, 255, 180], weight: 22 }
};

// 원래 october 데이터
let originalPoints = [
  {date: "01", y: 0, category: "home"},
  {date: "01", y: 20, category: "f.d"},
  {date: "01", y: 21, category: "other"},
  {date: "02", y: 0, category: "other"},
  {date: "02", y: 2, category: "d.home"},
  {date: "02", y: 5, category: "home"},
  {date: "02", y: 17, category: "f.d"},
  {date: "02", y: 19, category: "d.home"},
  {date: "03", y: 0, category: "d.home"},
  {date: "03", y: 12, category: "f.d"},
  {date: "03", y: 15, category: "d.home"},
  {date: "04", y: 0, category: "d.home"},
  {date: "04", y: 13, category: "other"},
  {date: "04", y: 16, category: "d.home"},
  {date: "04", y: 19, category: "f.d"},
  {date: "04", y: 21, category: "d.home"},
  {date: "05", y: 0, category: "d.home"},
  {date: "05", y: 13, category: "home"},
  {date: "05", y: 15, category: "other"},
  {date: "05", y: 17, category: "f.d"},
  {date: "05", y: 18, category: "home"},
  {date: "05", y: 19, category: "f.d"},
  {date: "05", y: 21, category: "home"},
  {date: "06", y: 0, category: "home"},
  {date: "07", y: 0, category: "home"},
  {date: "07", y: 10, category: "work"},
  {date: "07", y: 19, category: "d.home"},
  {date: "07", y: 22, category: "home"},
  {date: "08", y: 0, category: "home"},
  {date: "09", y: 0, category: "home"},
  {date: "10", y: 0, category: "home"},
  {date: "10", y: 9, category: "school"},
  {date: "10", y: 12, category: "school"},
  {date: "10", y: 14, category: "school"},
  {date: "10", y: 18, category: "f.d"},
  {date: "10", y: 19, category: "d.home"},
  {date: "10", y: 21, category: "home"},
  {date: "11", y: 0, category: "home"},
  {date: "11", y: 1, category: "f.d"},
  {date: "11", y: 3, category: "home"},
  {date: "11", y: 14, category: "school"},
  {date: "11", y: 19, category: "f.d"},
  {date: "11", y: 20, category: "other"},
  {date: "11", y: 21, category: "f.d"},
  {date: "11", y: 23, category: "home"},
  {date: "12", y: 0, category: "home"},
  {date: "12", y: 9, category: "school"},
  {date: "12", y: 12, category: "school"},
  {date: "12", y: 14, category: "school"},
  {date: "12", y: 19, category: "f.d"},
  {date: "12", y: 20, category: "home"},
  {date: "13", y: 0, category: "home"},
  {date: "13", y: 10, category: "work"},
  {date: "13", y: 19, category: "f.d"},
  {date: "13", y: 22, category: "home"},
  {date: "14", y: 0, category: "home"},
  {date: "14", y: 12, category: "work"},
  {date: "14", y: 19, category: "other"},
  {date: "14", y: 23, category: "other"},
  {date: "15", y: 0, category: "home"},
  {date: "16", y: 0, category: "home"},
  {date: "16", y: 15, category: "other"},
  {date: "16", y: 16, category: "f.d"},
  {date: "16", y: 19, category: "f.d"},
  {date: "16", y: 21, category: "f.d"},
  {date: "16", y: 23, category: "home"},
  {date: "17", y: 0, category: "home"},
  {date: "17", y: 9, category: "school"},
  {date: "17", y: 18, category: "club"},
  {date: "18", y: 0, category: "club"},
  {date: "18", y: 5, category: "home"},
  {date: "18", y: 17, category: "f.d"},
  {date: "18", y: 18, category: "home"},
  {date: "18", y: 19, category: "club"},
  {date: "19", y: 0, category: "club"},
  {date: "19", y: 3, category: "home"},
  {date: "19", y: 9, category: "school"},
  {date: "19", y: 19, category: "other"},
  {date: "19", y: 20, category: "f.d"},
  {date: "19", y: 22, category: "home"},
  {date: "20", y: 0, category: "home"},
  {date: "20", y: 13, category: "f.d"},
  {date: "20", y: 14, category: "other"},
  {date: "20", y: 15, category: "other"},
  {date: "20", y: 17, category: "home"},
  {date: "21", y: 0, category: "home"},
  {date: "21", y: 12, category: "work"},
  {date: "21", y: 19, category: "f.d"},
  {date: "21", y: 21, category: "f.d"},
  {date: "21", y: 23, category: "home"},
  {date: "22", y: 0, category: "home"},
  {date: "22", y: 12, category: "school"},
  {date: "22", y: 18, category: "school"},
  {date: "22", y: 23, category: "home"},
  {date: "23", y: 0, category: "home"},
  {date: "23", y: 12, category: "school"},
  {date: "23", y: 18, category: "home"},
  {date: "24", y: 0, category: "home"},
  {date: "24", y: 9, category: "school"},
  {date: "24", y: 11, category: "school"},
  {date: "24", y: 14, category: "school"},
  {date: "24", y: 17, category: "school"},
  {date: "24", y: 20, category: "home"},
  {date: "25", y: 0, category: "home"},
  {date: "25", y: 16, category: "other"},
  {date: "25", y: 18, category: "f.d"},
  {date: "25", y: 19, category: "f.d"},
  {date: "25", y: 21, category: "other"},
  {date: "25", y: 22, category: "f.d"},
  {date: "26", y: 0, category: "home"},
  {date: "26", y: 9, category: "school"},
  {date: "26", y: 11, category: "school"},
  {date: "26", y: 14, category: "school"},
  {date: "26", y: 18, category: "home"},
  {date: "26", y: 21, category: "f.d"},
  {date: "26", y: 22, category: "other"},
  {date: "26", y: 23, category: "home"},
  {date: "27", y: 0, category: "home"},
  {date: "27", y: 12, category: "work"},
  {date: "27", y: 19, category: "other"},
  {date: "27", y: 21, category: "home"},
  {date: "28", y: 0, category: "home"},
  {date: "28", y: 12, category: "work"},
  {date: "28", y: 19, category: "other"},
  {date: "28", y: 21, category: "f.d"},
  {date: "28", y: 23, category: "d.home"},
  {date: "29", y: 0, category: "d.home"},
  {date: "29", y: 3, category: "home"},
  {date: "29", y: 20, category: "f.d"},
  {date: "29", y: 22, category: "home"},
  {date: "30", y: 0, category: "home"},
  {date: "30", y: 20, category: "f.d"},
  {date: "30", y: 21, category: "home"},
  {date: "31", y: 0, category: "home"},
  {date: "31", y: 9, category: "school"},
  {date: "31", y: 11, category: "school"},
  {date: "31", y: 14, category: "school"},
  {date: "31", y: 17, category: "club"},
  {date: "31", y: 23, category: "home"}
];

// 데이터셋 저장소
let datasetStore = {
  custom: [],
  october: originalPoints.map(p => ({ date: p.date, y: p.y, category: p.category }))
};

let datasetOrder = ["custom", "october"];
let points = datasetStore[currentDataset];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Helvetica');
  strokeCap(ROUND);
  spacing = min((width - 200) / (cols - 1), (height - 200) / (rows - 1));
  offsetX = (width - (cols - 1) * spacing) / 2;
  offsetY = (height - (rows - 1) * spacing) / 2;
  noLoop(); // 필요할 때만 redraw()로 다시 그림
}

function draw() {
  background(0);
  drawGrid();
  drawLabels();
  drawCategoryButtons();
  drawUserTabs();
  drawAllPoints();
  drawLines(); // 애니메이션 없이 한 번에 선 그리기
}

// 그리드 점들
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
      push();
      stroke(255);
      strokeWeight(0.5);
      fill(255, 1);
      ellipse(x, y, 3, 3);
      pop();
    }
  }
  pop();
}

// 날짜/시간 라벨 + 축 이름
function drawLabels() {
  push();
  textAlign(CENTER, CENTER);
  textSize(10);
  textFont('Helvetica');
  noStroke();

  let visibleCols = (viewMode === "weeklyGroup") ? 7 : cols;
  let gridWidth   = (visibleCols - 1) * spacing;
  let gridHeight  = (rows - 1) * spacing;

  // 날짜 (위/아래)
  if (viewMode === "full") {
    for (let i = 0; i < cols; i++) {
      let x = offsetX + i * spacing;
      // 위: 흰색
      fill(255);
      text(str(i + 1), x, offsetY - 35);
      // 아래: 회색
      fill(125);
      text(str(i + 1), x, offsetY + gridHeight + 35);
    }
  } else if (viewMode === "weeklyGroup") {
    for (let i = 0; i < 7; i++) {
      let x = offsetX + i * spacing;
      // 위: 흰색
      fill(255);
      text("D" + (i + 1), x, offsetY - 35);
      // 아래: 회색
      fill(125);
      text("D" + (i + 1), x, offsetY + gridHeight + 35);
    }
  }

  // 시간 (좌/우)
  let startRow = (viewMode === "timeRange") ? timeStart : 0;
  let endRow   = (viewMode === "timeRange") ? timeEnd + 1 : rows;

  for (let j = startRow; j < endRow; j++) {
    let y = offsetY + j * spacing;
    // 왼쪽: 흰색
    fill(255);
    text(j + "", offsetX - 35, y);
    // 오른쪽: 회색
    fill(125);
    text(j + "", offsetX + gridWidth + 35, y);
  }

  // 축 제목
  fill(255);
  let bottomX = offsetX + gridWidth / 2;
  let bottomY = offsetY + gridHeight + 70;
  text("dates ←", bottomX, bottomY);

  push();
  translate(offsetX + gridWidth + 70, offsetY + gridHeight / 2);
  rotate(-HALF_PI);
  text("← hours", 0, 0);
  pop();

  pop();
}

// 왼쪽 카테고리 버튼 UI
function drawCategoryButtons() {
  push();
  let categories = Object.keys(categoryStyles);

  let bx = offsetX - CAT_BTN_X_OFFSET;
  let by = offsetY;

  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textSize(10);
  noStroke();

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let x = bx;
    let y = by + i * (CAT_BTN_H + CAT_BTN_GAP);

    let style = categoryStyles[cat];
    if (selectedCategory === cat) {
      // 선택된 버튼: 해당 카테고리 색으로 배경
      fill(style.color[0], style.color[1], style.color[2], 220);
    } else {
      fill(40, 40, 40, 200);
    }
    rect(x, y, CAT_BTN_W, CAT_BTN_H, 4);

    // 텍스트는 선택되면 검정, 아니면 흰색
    if (selectedCategory === cat) {
      fill(0);
    } else {
      fill(255);
    }
    text(cat, x + CAT_BTN_W / 2, y + CAT_BTN_H / 2);
  }
  pop();
}

// 오른쪽 데이터셋 탭 (custom / october / +id)
function drawUserTabs() {
  push();

  let visibleCols = (viewMode === "weeklyGroup") ? 7 : cols;
  let gridWidth   = (visibleCols - 1) * spacing;
  let ux = offsetX + gridWidth + TAB_X_MARGIN;
  let uy = offsetY;

  textAlign(CENTER, CENTER);
  textFont('Helvetica');
  textSize(10);
  noStroke();

  for (let i = 0; i < datasetOrder.length; i++) {
    let id = datasetOrder[i];
    let x = ux;
    let y = uy + i * (TAB_H + TAB_GAP);

    if (currentDataset === id) {
      fill(255, 255, 255, 230);
    } else {
      fill(40, 40, 40, 200);
    }
    rect(x, y, TAB_W, TAB_H, 4);

    if (currentDataset === id) {
      fill(0);
    } else {
      fill(255);
    }
    text(id, x + TAB_W / 2, y + TAB_H / 2);
  }

  // "+ id" 버튼
  let addY = uy + datasetOrder.length * (TAB_H + TAB_GAP) + 10;
  fill(40, 40, 40, 200);
  rect(ux, addY, TAB_W, TAB_H, 4);
  fill(255);
  text("+ id", ux + TAB_W / 2, addY + TAB_H / 2);

  pop();
}

// 모든 포인트 점 찍기
function drawAllPoints() {
  let grouped = {};
  for (let p of points) {
    if (!grouped[p.date]) grouped[p.date] = [];
    grouped[p.date].push(p);
  }

  let sortedDates = Object.keys(grouped).sort((a, b) => int(a) - int(b));
  for (let date of sortedDates) {
    let dateIndex = int(date) - 1;
    if (viewMode === "weeklyGroup") {
      let groupStart = weekGroup * 7;
      if (dateIndex < groupStart || dateIndex >= groupStart + 7) continue;
    }

    let x = (viewMode === "weeklyGroup")
      ? offsetX + (dateIndex - weekGroup * 7) * spacing
      : offsetX + dateIndex * spacing;

    let dayPoints = grouped[date];
    for (let p of dayPoints) {
      let y = offsetY + p.y * spacing;
      let style = categoryStyles[p.category] || { color: [150, 150, 150, 127], weight: 6 };
      push();
      stroke(...style.color);
      strokeWeight(style.weight / 2);
      fill(...style.color);
      ellipse(x, y, 8, 8);
      pop();
    }
  }
}

// 선을 한 번에 그리는 버전 (애니메이션 X)
function drawLines() {
  let grouped = {};
  for (let p of points) {
    if (!grouped[p.date]) grouped[p.date] = [];
    grouped[p.date].push(p);
  }

  let sortedDates = Object.keys(grouped).sort((a, b) => int(a) - int(b));

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

    for (let i = 0; i < dayPoints.length - 1; i++) {
      let p1 = dayPoints[i];
      let p2 = dayPoints[i + 1];

      let y1 = offsetY + p1.y * spacing;
      let y2 = offsetY + p2.y * spacing;

      let style = categoryStyles[p1.category] || { color: [150, 150, 150, 127], weight: 6 };
      push();
      if (p1.category === "home") {
        noFill();
        stroke(...style.color);
        strokeWeight(style.weight);
      } else {
        stroke(...style.color);
        strokeWeight(style.weight);
      }
      line(x, y1, x, y2);
      pop();
    }
  }
}

// 키로 viewMode 변경
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
  }
  redraw();
}

// 마우스 클릭: 카테고리 선택 / 데이터셋 탭 / 그리드에서 시작점-끝점 찍기
function mousePressed() {
  let categories = Object.keys(categoryStyles);

  // 1) 카테고리 버튼 클릭 체크
  let bx = offsetX - CAT_BTN_X_OFFSET;
  let by = offsetY;

  for (let i = 0; i < categories.length; i++) {
    let x = bx;
    let y = by + i * (CAT_BTN_H + CAT_BTN_GAP);
    if (
      mouseX >= x && mouseX <= x + CAT_BTN_W &&
      mouseY >= y && mouseY <= y + CAT_BTN_H
    ) {
      selectedCategory = categories[i];
      pendingStart = null;
      redraw();
      return;
    }
  }

  // 2) 오른쪽 데이터셋 탭 클릭 체크
  let visibleCols = (viewMode === "weeklyGroup") ? 7 : cols;
  let gridWidth   = (visibleCols - 1) * spacing;
  let ux = offsetX + gridWidth + TAB_X_MARGIN;
  let uy = offsetY;

  for (let i = 0; i < datasetOrder.length; i++) {
    let id = datasetOrder[i];
    let tx = ux;
    let ty = uy + i * (TAB_H + TAB_GAP);
    if (
      mouseX >= tx && mouseX <= tx + TAB_W &&
      mouseY >= ty && mouseY <= ty + TAB_H
    ) {
      currentDataset = id;
      points = datasetStore[id];
      pendingStart = null;
      redraw();
      return;
    }
  }

  // "+ id" 탭
  let addY = uy + datasetOrder.length * (TAB_H + TAB_GAP) + 10;
  if (
    mouseX >= ux && mouseX <= ux + TAB_W &&
    mouseY >= addY && mouseY <= addY + TAB_H
  ) {
    let newId = prompt("Enter a new ID name:");
    if (newId) {
      newId = newId.trim();
      if (newId.length > 0) {
        if (datasetStore[newId]) {
          alert("That ID already exists.");
        } else {
          datasetStore[newId] = [];
          datasetOrder.push(newId);
          currentDataset = newId;
          points = datasetStore[newId];
          pendingStart = null;
        }
      }
    }
    redraw();
    return;
  }

  // 3) 그리드 클릭 → 점 선택 / 선 추가
  let threshold = 10;
  let clicked = null;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = offsetX + i * spacing;
      let y = offsetY + j * spacing;
      if (dist(mouseX, mouseY, x, y) < threshold) {
        clicked = { dateIndex: i, row: j };
        break;
      }
    }
    if (clicked) break;
  }

  if (!clicked) return;

  if (!selectedCategory) {
    alert("Please select one of the category buttons on the left first.");
    return;
  }

  // 시작점이 아직 없는 경우 → 시작점 저장
  if (pendingStart === null) {
    pendingStart = {
      dateIndex: clicked.dateIndex,
      row: clicked.row,
      category: selectedCategory
    };
    redraw();
    return;
  }

  // 이미 시작점이 있는 경우 → 같은 날짜인지 확인 후 끝점으로 추가
  if (clicked.dateIndex !== pendingStart.dateIndex) {
    alert("You can only choose the start and end on the same day's grid.");
    return;
  }

  let dateIndex = clicked.dateIndex;
  let startRow = pendingStart.row;
  let endRow = clicked.row;
  let cat = pendingStart.category;
  let dateStr = nf(dateIndex + 1, 2); // "01" 형식

  let yMin = Math.min(startRow, endRow);
  let yMax = Math.max(startRow, endRow);

  points.push({ date: dateStr, y: yMin, category: cat });
  points.push({ date: dateStr, y: yMax, category: cat });

  pendingStart = null;
  redraw();
}