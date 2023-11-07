fetch('https://www.7timer.info/bin/astro.php?lon=113.2&lat=23.1&ac=0&unit=metric&output=json&tzshift=0')
.then((response) => {
    return response.json() // 받아온 객체를 json형식으로 변환 
})
.then((data)=> {
    for(let i=0; i < data.dataseries.length; i++){
        const row = document.createElement('tr') // 가상으로 tr태그 생성

        const num = i+1
        const cell = document.createElement('td')
        cell.innerHTML = num

        const cell1 = document.createElement('td') // 가상으로 tr태그 생성
        const timepoint = data.dataseries[i].timepoint;
        cell1.innerHTML = timepoint

        const cell2 = document.createElement('td')
        const cloudcover = data.dataseries[i].cloudcover;
        cell2.innerHTML = cloudcover

        const cell3 = document.createElement('td')
        const seeing = data.dataseries[i].seeing;
        cell3.innerHTML = seeing

        const cell4 = document.createElement('td')
        const transparency = data.dataseries[i].transparency;
        cell4.innerHTML = transparency

        document.getElementById('parent').appendChild(row)
        document.getElementById('parent').appendChild(cell)
        document.getElementById('parent').appendChild(cell1)
        document.getElementById('parent').appendChild(cell2)
        document.getElementById('parent').appendChild(cell3)
        document.getElementById('parent').appendChild(cell4)
    }
})
.catch((error) => {
    console.error('데이터 출력 에러');
})
