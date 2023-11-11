const header = ['전국', '서울', '광역시', '경기도', '강원도', '충청도', '전라도', '경상도', '제주도']

// 전체 데이터
 fetch('https://apis.data.go.kr/1383000/gmis/babysitEdnstServiceV2/getBabysitEdnstListV2?serviceKey=sb6FwEbehVaOSAoJo%2FiGMC8YP4pgok78k1u%2FrPkUWhB%2BPTG2OERg%2Bu%2FnDDxZt5nuTLqFaxFbBwEoVlsm7RtkYQ%3D%3D&pageNo=1&numOfRows=100&type=json')
  .then(res => res.json())
  .then((data) => {
    const table = document.createElement('table');
    const place = document.getElementById('list');
    place.appendChild(table)

    const tableHeader = table.createTHead();
    const titleRow = tableHeader.insertRow();
    const mainTitleCell = titleRow.insertCell();
    mainTitleCell.colSpan = 6; 
    mainTitleCell.textContent = header[0];
    // 스타일 넣기
    const newAttr = document.createAttribute('style')
    newAttr.value = 'font-size: 20px; font-weight: bold; background-color: #fce205; padding: 5px'
    mainTitleCell.setAttributeNode(newAttr)

    const headerRow = tableHeader.insertRow();
    ['','센터이름','도로명 주소', '운영시간', '연락처', '팩스번호'].forEach((titlename) => {
      const title = document.createElement('th');
      title.textContent = titlename;
      headerRow.appendChild(title);
    })

    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    const datalist = data.response.body.items.item

    for (let i= 0; i< datalist.length; i++) {
      const row = tableBody.insertRow();
      const numCell = document.createElement('td');
      numCell.textContent = i + 1;
      row.appendChild(numCell); 

      const centerId = document.createElement('td');
      centerId.textContent = datalist[i].eduInstNm;
      // 추가: 클릭 시 홈페이지로 이동
      centerId.style.cursor = 'pointer';
      centerId.addEventListener('click', () => {
        if (datalist[i].hmpgAddr) {
          window.location.href = datalist[i].hmpgAddr;
        }
      });

      row.appendChild(centerId)

      const address = document.createElement('td');
      address.textContent = datalist[i].roadNmAddr;
      row.appendChild(address)

      const oper = document.createElement('td');
      oper.textContent = datalist[i].operHrCn;
      row.appendChild(oper)

      const tel = document.createElement('td');
      tel.textContent = datalist[i].rprsTelno;
      row.appendChild(tel)

      const pax = document.createElement('td');
      pax.textContent = datalist[i].fxno;
      row.appendChild(pax)

      // 지도 생성
      address.style.cursor = 'pointer';
      address.addEventListener('click', () => {
        const lot = datalist[i].lot;
        const lat = datalist[i].lat;
        makingMap(lat, lot);
      });

    }
    
  })

  // 지역별로 표출하기
  function RenderTable(filterFunction, num) {
    fetch('https://apis.data.go.kr/1383000/gmis/babysitEdnstServiceV2/getBabysitEdnstListV2?serviceKey=sb6FwEbehVaOSAoJo%2FiGMC8YP4pgok78k1u%2FrPkUWhB%2BPTG2OERg%2Bu%2FnDDxZt5nuTLqFaxFbBwEoVlsm7RtkYQ%3D%3D&pageNo=1&numOfRows=100&type=json')
      .then(res => res.json())
      .then(async (data) => {
        // 기존 데이터 없애기
        const before = document.getElementById('list');
        const parent = document.querySelector('table');
        before.removeChild(parent);
  
        const datalist = data.response.body.items.item;
        const filteredData = await filterFunction(datalist);

        // 새로운 테이블 만들기
        const table = document.createElement('table');
        const place = document.getElementById('list');
        place.appendChild(table);
        
        // 지역이름 제목으로 넣기
        const tableHeader = table.createTHead();
        const titleRow = tableHeader.insertRow();
        const mainTitleCell = titleRow.insertCell();
        mainTitleCell.colSpan = 6; 
        mainTitleCell.textContent = header[num];
        // style 속성생성
        const newAttr = document.createAttribute('style')
        newAttr.value = 'font-size: 20px; font-weight: bold; background-color: #fce205; padding: 5px'
        mainTitleCell.setAttributeNode(newAttr)
        
        // 목록 이름 생성
        const headerRow = tableHeader.insertRow();
        ['', '센터이름', '도로명 주소', '운영시간', '연락처', '팩스번호'].forEach((titlename) => {
          const title = document.createElement('th');
          title.textContent = titlename;
          headerRow.appendChild(title);
        });
  
        const tableBody = document.createElement('tbody');
        table.appendChild(tableBody);
  
        for (let i = 0; i < filteredData.length; i++) {
          const row = tableBody.insertRow();
          const numCell = document.createElement('td');
          numCell.textContent = i + 1;
          row.appendChild(numCell);
  
          const centerId = document.createElement('td');
          centerId.textContent = filteredData[i].eduInstNm;
          // 추가: 클릭 시 홈페이지로 이동
          centerId.style.cursor = 'pointer';
          centerId.addEventListener('click', () => {
            if (filteredData[i].hmpgAddr) {
              window.location.href = filteredData[i].hmpgAddr;
            }
          });
          row.appendChild(centerId);
  
          const address = document.createElement('td');
          address.textContent = filteredData[i].roadNmAddr;
          row.appendChild(address);
  
          const oper = document.createElement('td');
          oper.textContent = filteredData[i].operHrCn;
          row.appendChild(oper);
  
          const tel = document.createElement('td');
          tel.textContent = filteredData[i].rprsTelno;
          row.appendChild(tel);
  
          const pax = document.createElement('td');
          pax.textContent = filteredData[i].fxno;
          row.appendChild(pax);

          // 지도 생성
          address.style.cursor = 'pointer';
          address.addEventListener('click', () => {
          const lot = filteredData[i].lot;
          const lat = filteredData[i].lat;
          makingMap(lat, lot);
          });
}
 } )}

  // 서울 데이터
  function filterSeoul(datalist) {
    return datalist.filter((item) => item.ctpvNm == '서울');
  }
  
  // 광역시 데이터
  function filterGwang(datalist) {
    return datalist.filter((item) => ['부산', '대구', '인천', '광주', '대전', '울산'].includes(item.ctpvNm));
  }
  
  // 경기도 데이터
  function filterGG(datalist) {
    return datalist.filter((item) => item.ctpvNm == '경기');
  }
  
  // 강원도 데이터
  function filterGW(datalist) {
    return datalist.filter((item) => item.ctpvNm == '강원');
  }
  
  // 충청도 데이터
  function filterCC(datalist) {
    return datalist.filter((item) => ['충남', '충북'].includes(item.ctpvNm));
  }
  
  // 전라도
  function filterJR(datalist) {
    return datalist.filter((item) => ['전남', '전북'].includes(item.ctpvNm));
  }

  // 경상도
  function filterGS(datalist) {
    return datalist.filter((item) => ['경남', '경북'].includes(item.ctpvNm));
  }

  // 제주도
  function filterJJ(datalist) {
    return datalist.filter((item) => item.ctpvNm == '제주');
  }

  // 지도
  var map;
  var marker;

  function makingMap(lat, lot) {
    var mapContainer = document.getElementById('map');
    
    // 만약 지도가 없으면 새로 생성
    if (!map) {
      var mapOption = {
        center: new kakao.maps.LatLng(lat, lot),
        level: 3
      }; 
      map = new kakao.maps.Map(mapContainer, mapOption);
    } else {
      // 이미 지도가 있으면 중심좌표 변경
      map.setCenter(new kakao.maps.LatLng(lat, lot));
    }
  
    // 마커가 없으면 새로 생성
    if (!marker) {
      var markerPosition  = new kakao.maps.LatLng(lat, lot);
      marker = new kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    } else {
      // 이미 마커가 있으면 위치 변경
      marker.setPosition(new kakao.maps.LatLng(lat, lot));
    }
  }