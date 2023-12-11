document.getElementById("search_button").addEventListener("click", function() {
	let searchBox = document.getElementById("search_box");
	let countryName = searchBox.value;
	let url = `https://restcountries.com/v3.1/name/${countryName}`;

	fetch(url)
	.then(response => response.json())
	.then(data => {
		let country = data[0];
		let region = country.region;
		let regionUrl = `https://restcountries.com/v3.1/region/${region}`;

		fetch(regionUrl)
		.then(response => response.json())
		.then(data => {
			let countries = data.map(country => {
				return `<li>${country.name.common}</li>`;});
                
			let countryDetails = `
				<h2>${country.name.common}</h2>
				<ul>
                    <li>Area: ${country.area} km²</li>
					<li>Capital: ${country.capital}</li>
                    <li>Currency: ${Object.values(country.currencies)[0].name}
                        (${Object.values(country.currencies)[0].symbol})</li>
                    <li>Language: ${Object.values(country.languages)[0]}</li>
					<li>Population: ${country.population}</li>
				</ul>
			`;

			document.getElementById("country_details").innerHTML =
                countryDetails;
			document.getElementById("region_countries").innerHTML = `
				<h2>Countries in ${region}</h2>
				<ul>
					${countries.join("")}
				</ul>
			`;
		})
		.catch(error => console.log(error));
	})
	.catch(error => {
        console.log(error);
        alert("Please Enter a Valid Country!");});
});
