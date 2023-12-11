async function searchCountry() {
        const country_input = 
            document.getElementById('country_input').value.toLowerCase();
        const countryUrl = 
            `https://restcountries.com/v3.1/name/${country_input}`;
        
        try {
            const countryResponse = await fetch(countryUrl);
            const countryData = await countryResponse.json();
            const countryDetails = countryData[0];
            console.log(countryDetails.currencies);
            const region = countryDetails.continents[0];
            
            displayCountryDetails(countryDetails);

            const regionUrl = `https://restcountries.com/v3.1/region/${region}`;
            const regionResponse = await fetch(regionUrl);
            const regionData = await regionResponse.json();
    
            displayRegionCountries(regionData);
        } catch (error) {
            console.error('Error fetching data:', error);
    }
}
    
function displayCountryDetails(countryDetails) {
    const detailsContainer = document.getElementById('country_details');
    detailsContainer.innerHTML = 
        `<h2>${countryDetails.name.common}</h2>                 
        <p>Capital: ${countryDetails.capital}</p>
        <p>Population: ${countryDetails.population}</p>
        <p>Area: ${countryDetails.area} km²</p>
        <p>Language: 
            ${Object.values(countryDetails.languages).join(', ')}</p>
        <p>Currency: 
            ${Object.keys(countryDetails.currencies)
                .filter(key => countryDetails.currencies.hasOwnProperty(key))
                .join(', ')}</p>`;
}
    
function displayRegionCountries(regionData) {
    const regionContainer = document.getElementById('region_countries');
    const regionCountries = regionData.map(country => country.name.common);
     regionContainer.innerHTML = 
        `<h3>Other countries in the same region:</h3>
        <ul>${regionCountries.map(country => 
            `<li>${country}</li>`).join('')}
        </ul>`;
}