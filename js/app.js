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
const moreDetails = (slug) => {
  const detailsUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
  console.log(detailsUrl)
}