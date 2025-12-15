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
let pendingStart = null; // 시작점 임시 저장용
let selectedCategory = null; // 고정 버튼으로 선택된 카테고리
let currentDataset = "custom"; // 현재 선택된 데이터셋 ("custom" or "october")

let animationSpeed = 545; // 한 프레임당 선 그려질 길이 (픽셀)
let drawingProgress = 0; // 현재 그려지는 선의 진행 정도

let categoryStyles = {
  "집":    { color: [255, 255, 224, 127],     weight: 20 },
  "남의집": { color: [255, 255, 204, 180],     weight: 22 },
  "학교":  { color: [255, 255, 0, 180],   weight: 22 },
  "꼼방":  { color: [255, 255, 0, 180],   weight: 22 },
  "식당":  { color: [0, 255, 0, 180],   weight: 22 },
  "기타":  { color: [255, 204, 255, 180], weight: 22 },
  "알바":  { color: [0, 255, 255, 180],   weight: 22 }
};

let originalPoints = [{date: "01", y: 0, category: "집"},
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

let points = [];

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
  drawLabels();        // 날짜/시간 텍스트 다시 표시
  drawCategoryButtons(); // 고정된 카테고리 버튼 UI
  drawUserTabs();
  drawAllPoints();
  let totalLength = getTotalLineLength();
  drawLinesAnimated();
  drawingProgress += animationSpeed;
  // Stop animation after all lines are drawn
  if (drawingProgress > totalLength) {
    noLoop();
  }
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
      // 마지막 점에는 더 이상 선을 그리지 않음 (끝점까지만)
      if (!p2) continue;
      let y1 = offsetY + p1.y * spacing;
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
      strokeWeight(0.5);
      fill(255,1);
      ellipse(x, y, 3, 3);
      pop();
    }
  }
  pop();
}
function drawLabels() {
  push();
  textAlign(CENTER, CENTER);
  textSize(10);           // 글자 크기
  textFont('Helvetica');  // 폰트 이름 (시스템 폰트 사용)
  fill(255);              // 흰색 텍스트
  noStroke();

  // 위쪽 날짜 라벨
  if (viewMode === "full") {
    for (let i = 0; i < cols; i++) {
      let x = offsetX + i * spacing;
      text(str(i + 1), x, offsetY - 35);
    }
  } else if (viewMode === "weeklyGroup") {
    for (let i = 0; i < 7; i++) {
      let x = offsetX + i * spacing;
      text("D" + (i + 1), x, offsetY - 35);
    }
  }

  // 왼쪽 시간 라벨
  fill (125);
  let startRow = (viewMode === "timeRange") ? timeStart : 0;
  let endRow = (viewMode === "timeRange") ? timeEnd + 1 : rows;

  for (let j = startRow; j < endRow; j++) {
    let y = offsetY + j * spacing;
    text(j + "", offsetX - 40, y);
  }

  pop();
}
function drawCategoryButtons() {
  push();
  let categories = Object.keys(categoryStyles);

  // 버튼 크기와 간격
  let bw = 80;  // 버튼 폭
  let bh = 22;  // 버튼 높이
  let gap = 8;  // 버튼 사이 간격

  // 왼쪽 시간 축 근처에 세로 배열로 배치
  // 시간 라벨은 offsetX - 40에 있으므로, 그보다 더 왼쪽으로
  let bx = offsetX - 120; // 카테고리 버튼 X 위치
  let by = offsetY;       // 첫 번째 버튼의 시작 Y (0시 위치 근처에서 시작)

  textAlign(CENTER, CENTER);
  textSize(10);
  noStroke();

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let x = bx;
    let y = by + i * (bh + gap);

    // 선택된 카테고리는 하이라이트
    if (selectedCategory === cat) {
      fill(255, 255, 255, 220);
    } else {
      fill(40, 40, 40, 200);
    }
    rect(x, y, bw, bh, 4);

    // 텍스트
    if (selectedCategory === cat) {
      fill(0);
    } else {
      fill(255);
    }
    text(cat, x + bw / 2, y + bh / 2);
  }
  pop();
}

function drawUserTabs() {
  push();

  // 오른쪽 그리드 끝 기준으로 위치 계산
  let visibleCols = (viewMode === "weeklyGroup") ? 7 : cols;
  let gridWidth = (visibleCols - 1) * spacing;
  let ux = offsetX + gridWidth + 80; // 그리드 오른쪽에서 약간 띄워서
  let uy = offsetY;                  // 상단 정렬

  let bw = 90; // 탭 폭
  let bh = 26; // 탭 높이

  // 배경 박스
  if (currentDataset === "october") {
    fill(255, 255, 255, 230); // 선택된 상태 강조
  } else {
    fill(40, 40, 40, 200);
  }
  noStroke();
  rect(ux, uy, bw, bh, 4);

  // 텍스트
  if (currentDataset === "october") {
    fill(0);
  } else {
    fill(255);
  }
  textAlign(CENTER, CENTER);
  textSize(10);
  text("october", ux + bw / 2, uy + bh / 2);

  pop();
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
      // 마지막 점이면 더 이상 선을 그리지 않음 (끝점까지만)
      if (!p2) continue;
      let y1 = offsetY + p1.y * spacing;
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
  }

  drawingProgress = 0;
  loop(); // 다시 애니메이션 시작
}
function mousePressed() {
  // 1) 먼저 왼쪽 카테고리 버튼을 눌렀는지 확인
  let categories = Object.keys(categoryStyles);

  // 버튼 크기와 간격 (drawCategoryButtons와 동일)
  let bw = 80;
  let bh = 22;
  let gap = 8;

  // 시간 축 왼쪽에 세로 배열 (drawCategoryButtons와 동일)
  let bx = offsetX - 120;
  let by = offsetY;

  for (let i = 0; i < categories.length; i++) {
    // drawCategoryButtons와 동일한 좌표 계산: 세로 배열
    let x = bx;
    let y = by + i * (bh + gap);
    if (mouseX >= x && mouseX <= x + bw && mouseY >= y && mouseY <= y + bh) {
      // 이 버튼 영역 클릭 → 선택 카테고리 설정
      selectedCategory = categories[i];
      pendingStart = null;      // 진행 중이던 선 선택 초기화
      drawingProgress = 0;
      loop();                   // 하이라이트 업데이트
      return;
    }
  }

  // 1.5) 오른쪽 'october' 탭을 눌렀는지 확인
  let visibleCols = (viewMode === "weeklyGroup") ? 7 : cols;
  let gridWidth = (visibleCols - 1) * spacing;
  let ux = offsetX + gridWidth + 80; // drawUserTabs와 동일한 위치
  let uy = offsetY;
  let tabW = 90;
  let tabH = 26;

  if (mouseX >= ux && mouseX <= ux + tabW && mouseY >= uy && mouseY <= uy + tabH) {
    // 'october' 탭 클릭 → 저장된 원래 데이터 로드
    currentDataset = "october";
    points = originalPoints.map(p => ({ date: p.date, y: p.y, category: p.category }));
    pendingStart = null;
    drawingProgress = 0;
    loop();
    return;
  }

  // 2) 버튼이 아닌 영역 → 그리드에서 점 선택 로직
  let threshold = 10;
  let clicked = null;

  // 클릭한 위치에 가장 가까운 그리드 좌표 찾기
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = offsetX + i * spacing;
      let y = offsetY + j * spacing;
      let d = dist(mouseX, mouseY, x, y);
      if (d < threshold) {
        clicked = { dateIndex: i, row: j };
        break;
      }
    }
    if (clicked) break;
  }

  if (!clicked) return; // 아무 점도 안 눌렀으면 종료

  // 아직 카테고리 버튼이 선택되지 않았다면
  if (!selectedCategory) {
    alert("먼저 위의 카테고리 버튼 중 하나를 선택하세요.");
    return;
  }

  // 아직 시작점이 선택되지 않은 상태 → 시작점만 저장
  if (pendingStart === null) {
    pendingStart = {
      dateIndex: clicked.dateIndex,
      row: clicked.row,
      category: selectedCategory
    };
    return;
  }

  // 여기까지 왔으면 pendingStart가 이미 있음 → 끝점 선택 단계
  // 같은 날짜(같은 x축) 안에서만 허용
  if (clicked.dateIndex !== pendingStart.dateIndex) {
    alert("You can only choose the start and end on the same day’s grid.");
    return;
  }

  let dateIndex = clicked.dateIndex;
  let startRow = pendingStart.row;
  let endRow = clicked.row;
  let cat = pendingStart.category;
  let dateStr = nf(dateIndex + 1, 2);

  // 시작/끝 y 순서 정리
  let yMin = Math.min(startRow, endRow);
  let yMax = Math.max(startRow, endRow);

  // 동일한 날짜/카테고리/좌표의 기존 포인트가 있어도 그냥 추가 (중복 허용)
  points.push({ date: dateStr, y: yMin, category: cat });
  points.push({ date: dateStr, y: yMax, category: cat });

  // 상태 초기화 후 애니메이션 다시 시작
  pendingStart = null;
  drawingProgress = 0;
  loop();
}

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

function drawLines() {
  stroke(0); // black stroke
  strokeWeight(1);
  noFill();

  // Filter and sort "집" category points by x (date), then y (time)
  let housePoints = points
    .filter(p => p.category === "집")
    .sort((a, b) => int(a.date) - int(b.date) || a.y - b.y);

  if (housePoints.length > 1) {
    beginShape();
    for (let i = 0; i < housePoints.length; i++) {
      let pt = housePoints[i];
      let x = offsetX + (int(pt.date) - 1) * spacing;
      let y = offsetY + pt.y * spacing;
      vertex(x, y);
    }
    endShape();
  }
}