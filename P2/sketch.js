function mousePressed() {
  let colIndex = Math.floor((mouseX - offsetX + spacing / 2) / spacing);
  let rowIndex = Math.floor((mouseY - offsetY + spacing / 2) / spacing);

  if (
    colIndex >= 0 &&
    colIndex < cols &&
    rowIndex >= 0 &&
    rowIndex < rows
  ) {
    let time = rowIndex;
    let day = colIndex;

    // Find the corresponding grid point
    let matchedPt = allGridPoints.find(
      pt => Math.abs(pt.x - (offsetX + day * spacing)) < spacing / 2 &&
            Math.abs(pt.y - (offsetY + time * spacing)) < spacing / 2
    );

    if (matchedPt) {
      // If category not set yet, initialize
      if (!points[time]) {
        points[time] = {};
      }
      if (!points[time][day]) {
        points[time][day] = {};
      }

      points[time][day].category = selectedCategory;
      redraw();
    }
  }
}