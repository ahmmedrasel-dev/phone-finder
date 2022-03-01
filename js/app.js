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
  if (phones.length <= 0) {
    document.getElementById('result-container').textContent = '';
    document.getElementById('more-details').textContent = '';
    const messContainer = document.getElementById("error-message");
    const messDiv = document.createElement('div');
    messDiv.setAttribute('role', 'alert');
    messDiv.classList.add('alert', 'alert-danger', 'mt-5')
    messDiv.innerHTML = `
    Search Resualt Not Found.
    `;
    messContainer.appendChild(messDiv);
  } else {
    document.getElementById('result-container').textContent = '';
    document.getElementById('more-details').textContent = '';
    document.getElementById("error-message").textContent = '';
    // Display 20 phone in Frontend.
    let total = phones.slice(0, 20);
    total.forEach(phone => {
      const displayContainer = document.getElementById('result-container');
      const cardContetDiv = document.createElement('div');
      cardContetDiv.classList.add('col-md-4')
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
}

// Get More Detisl Form Api
const moreDetails = async slug => {
  const detailsApUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
  console.log(detailsApUrl)
  const response = await fetch(detailsApUrl);
  const data = await response.json();
  displayMoreDetails(data.data);
}

// Display More Detisl in Frontend;
const displayMoreDetails = phone => {
  // All Sensor
  const sensors = phone.mainFeatures.sensors;

  // All Others Features.
  const othersInfo = phone.others;
  let others = '';
  if (othersInfo !== undefined) {
    others = Object.values(othersInfo);
  }

  const detailsContainer = document.getElementById('more-details');
  detailsContainer.textContent = '';

  const detailContetDiv = document.createElement('div');
  detailContetDiv.classList.add('col-8', 'offset-2', 'table-responsive');

  detailContetDiv.innerHTML = `
    <table class="table border">
      <thead>
        <h4 class="text-center mt-5">Features & Spacification</h4>
      </thead>
      <tbody>
        <tr>
          <td>Picture</td>
          <td class="text-center"><img src="${phone.image}" alt="picture"></td>
        </tr>
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
          <td>${sensors}</td>
        </tr>
        <tr>
          <td>Others Feature</td>
          <td>${others.length != 0 ? others : 'No others Features'}</td>
        </tr>
      </tbody>
    </table>
  `;
  detailsContainer.appendChild(detailContetDiv)
}