(function () {
  const form = document.getElementById("countryForm");
  const countryInput = document.getElementById("countryInput");
  const statusMessage = document.getElementById("statusMessage");
  const tableBody = document.getElementById("results");

  const API_KEY = "rc_live_4c0d124eea7f4ff9b5487accf81a1b16";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = countryInput.value.trim();
    if (!query) return;

    tableBody.innerHTML = "";
    statusMessage.textContent = "";

    const url = `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      if (!response.ok) throw new Error(`Blad HTTP: ${response.status}`);

      const jsonResponse = await response.json();

      let countries = [];
      if (jsonResponse.data && jsonResponse.data.objects) {
        countries = jsonResponse.data.objects;
      }

      if (!countries || countries.length === 0) {
        statusMessage.textContent = "Brak wyników";
        return;
      }

      statusMessage.textContent = "";

      countries.forEach((country) => {
        const row = document.createElement("tr");

        const name = country.names?.common || "Brak danych";

        let capital = "Brak stolicy";
        if (country.capitals && country.capitals.length > 0) {
          capital = country.capitals[0].name || country.capitals[0];
        }

        const population = country.population || "Brak danych";

        const region = country.region || "Brak danych";
        const subregion = country.subregion || "Brak danych";

        row.innerHTML = `
          <td>${name}</td>
          <td>${capital}</td>
          <td>${population}</td>
          <td>${region}</td>
          <td>${subregion}</td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error(error);
    }
  });
})();
