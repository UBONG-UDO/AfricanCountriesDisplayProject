const inputEl = document.querySelector("input");
const formEl = document.querySelector("form");
const countriesCtn = document.querySelector("#countriesDiv");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getCountryByRegion = (region = "Africa") => {
  const formattedRegion = capitalize(region);

  fetch(`https://restcountries.com/v3.1/region/${formattedRegion}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      countriesCtn.innerHTML = '';  // Clear previous results

      // Sort countries alphabetically by common name
      const arrangedCountries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      // Display sorted countries
      arrangedCountries.forEach((country) => {
        countriesCtn.insertAdjacentHTML(
          "beforeend",
          `
          <div class="countryCard">
              <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
              <h1>${country.name.common}</h1>
              <h3>Capital of Country: ${country.capital ? country.capital[0] : "N/A"}</h3>
              <h4>Population of Country: ${country.population.toLocaleString() || "N/A"}</h4>
          </div>
          `
        );
      });
    })
    .catch(err => {
      countriesCtn.innerHTML = `<p style="color:red;">Error fetching countries: ${err.message}</p>`;
      console.error(err);
    });
};

// Trigger search on form submit
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const regionInput = inputEl.value.trim() || "Africa"; // Default to Africa if input empty
  getCountryByRegion(regionInput);
});

// Load Africa countries on page load by default
getCountryByRegion("Africa");