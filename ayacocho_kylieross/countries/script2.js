async function searchCountry() {
    const inputElement = document.getElementById('country-input');
    const countryName = inputElement.value;

    try {
        const countryResponse = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = await countryResponse.json();

        if (!countryData || countryData.status === 404) {
            alert('Please enter a valid country name.');
            return;
        }

        const country = countryData[0];
        const region = country.region;

        const regionResponse = await fetch(
            `https://restcountries.com/v3.1/region/${region}`);
        const regionData = await regionResponse.json();

        displayCountryDetails(country);    

        displayRegionCountries(regionData);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred. Please try again.');
    }
}

function displayCountryDetails(country) {
    const countryDetailsElement = document.getElementById('country-details');
    countryDetailsElement.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Area: ${country.area} square kilometers</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
    `;
}

function displayRegionCountries(regionData) {
    const regionCountriesElement = document.getElementById('region-countries');
    regionCountriesElement.innerHTML = '<h2>Other Countries in the Region</h2>';

    if (!regionData.length) {
        regionCountriesElement.innerHTML +=
        '<p>No other countries in the region.</p>';
        return;
    }

    const countryList = document.createElement('ul');

    regionData.forEach(country => {
        const listItem = document.createElement('li');
        listItem.textContent = country.name.common;
        countryList.appendChild(listItem);
    });

    regionCountriesElement.appendChild(countryList);
}
