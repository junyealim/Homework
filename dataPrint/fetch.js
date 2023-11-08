var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(35.2246964100, 128.5983270000),
    level: 3
};

var map = new kakao.maps.Map(container, options);
fetch('https://apis.data.go.kr/1383000/gmis/babysitEdnstServiceV2/getBabysitEdnstListV2?serviceKey=sb6FwEbehVaOSAoJo%2FiGMC8YP4pgok78k1u%2FrPkUWhB%2BPTG2OERg%2Bu%2FnDDxZt5nuTLqFaxFbBwEoVlsm7RtkYQ%3D%3D&pageNo=1&numOfRows=100&type=json')
  .then(res => res.json())
  .then((data) => {
    const datalist = data.response.body.items.item
    
    console.log(datalist)
  })


/*
eduInstNm / 센터이름
roadNmAddr / 도로명 주소
lat / 위도
lot / 경도
hmpgAddr / 홈페이지 주소
emlAddr / 이메일 주소
operHrCn / 운영시간
rprsTelno / 연락처
fxno / 팩스번호
*/
