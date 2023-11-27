document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/')
      .then(response => response.json())
      .then(data => {
        const userList = document.getElementById('store-list');

        data.forEach(store => {
            // 이미지 추가
            const imgElement = document.createElement('img');
            imgElement.src = './images/' + store.image.split('\\')[1]  // 이미지 파일 경로 설정
            imgElement.alt = store.image.split('\\')[1]; // 이미지 설명 - 이미지이름
            imgElement.width = 100;
            userList.appendChild(imgElement)

            const listItem = document.createElement('li');
            listItem.innerHTML = `매장명: ${store.name}<br>주소: ${store.address}`;

            userList.appendChild(listItem);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
})