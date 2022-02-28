// Getting The Data From Api
const getResult = () => {
  const searchKeyword = document.getElementById('search-box').value;
  const apiUrl = `https://openapi.programming-hero.com/api/phones?search=${searchKeyword}`;

  // Fatching Data From Api.
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displayResult(data.data));
}

// Display Search Result In Frontend.
const displayResult = phones => {
  document.getElementById('result-container').textContent = '';
  let total = phones.slice(0, 20);
  total.forEach(phone => {
    // console.log(phone)
    const displayContainer = document.getElementById('result-container');
    const cardContetDiv = document.createElement('div');
    cardContetDiv.classList.add('col-md-3')
    cardContetDiv.innerHTML = `
      <div class="card p-3">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body text-center">
          <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
          <h5 class="card-title">Brand Name:  ${phone.brand}</h5>
          <a href="#" class="btn btn-primary" onclick="moreDetails('${phone.slug}')">More Details</a>
        </div>
      </div>
    `;
    displayContainer.appendChild(cardContetDiv)
  })
}

// Get More Detisl Form Api
const moreDetails = async slug => {
  const detailsApUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
  // console.log(detailsApUrl)
  const response = await fetch(detailsApUrl);
  const data = await response.json();
  displayMoreDetails(data.data);
}

// Display More Detisl in Frontend;
const displayMoreDetails = phone => {
  // All Sensor
  const sensors = phone.mainFeatures.sensors;
  const sensor = sensors.map(item => {
    return item
  })

  // Other Feature
  const { WLAN, Bluetooth, GPS, NFC, USB } = phone.others;

  // console.log(sensor);
  const detailsContainer = document.getElementById('more-details');
  detailsContainer.textContent = '';
  const detailContetDiv = document.createElement('div');
  detailContetDiv.classList.add('col-8', 'offset-2');

  detailContetDiv.innerHTML = `
    <table class="table border">
      <thead>
        <h4 class="text-center mt-5">Phone Spacification</h4>
      </thead>
      <tbody>
        <tr>
          <td>Model Name</td>
          <td>${phone.name}</td>
        </tr>
        <tr>
          <td>Release Date</td>
          <td>${phone.releaseDate ? phone.releaseDate : 'No Relase Date Found.'}</td>
        </tr>
        <tr>
          <td>Storage</td>
          <td>${phone.mainFeatures.storage}</td>
        </tr>

        <tr>
          <td>Memory</td>
          <td>${phone.mainFeatures.memory}GB</td>
        </tr>
        <tr>
          <td>Display</td>
          <td>${phone.mainFeatures.displaySize}</td>
        </tr>

        <tr>
          <td>Processor</td>
          <td>${phone.mainFeatures.chipSet}</td>
        </tr>
        <tr>
          <td>Sensors</td>
          <td>${sensor}</td>
        </tr>
        <tr>
          <td>Others Feature</td>
          <td>${WLAN}, ${Bluetooth}, ${GPS}, ${NFC}, ${USB}</td>
        </tr>
      </tbody>
    </table>
  `;
  detailsContainer.appendChild(detailContetDiv)
}