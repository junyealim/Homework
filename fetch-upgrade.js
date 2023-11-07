fetch('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const table = document.getElementById('parent');

    for (let i = 0; i < data.dataseries.length; i++) {
      const rowData = data.dataseries[i];
      const row = document.createElement('tr');
      const numCell = document.createElement('td');
      numCell.textContent = i + 1;
      row.appendChild(numCell);

      ['timepoint', 'cloudcover', 'seeing', 'transparency'].forEach((field) => {
        const cell = document.createElement('td');
        cell.textContent = rowData[field];
        row.appendChild(cell);
      });

      table.appendChild(row); // 테이블에 행 추가
    }
  })
  .catch((error) => {
    console.error('데이터 출력 에러', error);
  });

