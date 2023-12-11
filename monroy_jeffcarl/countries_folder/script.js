function searchCountry() {
    const input = document.getElementById('search_input').value;

    fetch(`https://restcountries.com/v3.1/name/${input}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .then(data => {
            const country = data[0];
            const region = country.region;

            const countryDetailsElement = document
                .getElementById('country_details');
            countryDetailsElement.innerHTML = `
                <h2>${country.name.common}</h2>
                <p>Capital: ${country.capital}</p>
                <p>Region: ${region}</p>
                <p>Population: ${country.population}</p>
                <p>Area: ${country.area} sq km</p>
                <p>Languages: ${Object.values(country.languages).join(', ')}</p>
            `;
            fetch(`https://restcountries.com/v3.1/region/${region}`)
                .then(response => response.json())
                .then(sameRegion => {
                    const sameRegionElement = document
                        .getElementById('same_region');
                        sameRegionElement.innerHTML = 
                        `<h3>Other countries in the ${region} region:</h3>`;
                        sameRegion.forEach(country => {
                            sameRegionElement.innerHTML += 
                            `<p>${country.name.common}</p>`;
                    });
                })
                .catch(error => console.error('Error fetching other countries:',
                     error));
        })
        .catch(error => {
            alert('Invalid country. Please enter valid name of a country.');
            console.error('Error fetching country details:', error);
        });
}
