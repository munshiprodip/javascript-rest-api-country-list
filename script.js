
const url = `https://restcountries.eu/rest/v2/all`
fetch(url)
.then(response => response.json())
.then(data => displayCountriesTable(data))

const displayCountriesTable = countries =>{
    
    const tableBody = document.getElementById('tableBody')
    let i = 1
    countries.forEach(country => {
        const tr        = document.createElement('tr')
        const td = `
            <th scope="row">${i++}</th>
            <td><img class="flag-image" src="${country.flag}" alt="${country.name}"></td>
            <td>${country.name}</td>
            <td>${country.capital}</td>
            <td>${country.population}</td>
            <td><button onclick="getCountryDetails('${country.name}')" type="button" class="btn btn-outline-info">View</button></td>
        `
        tr.innerHTML = td
        tableBody.appendChild(tr)

    });
}

const getCountryDetails = country =>{
    const url = `https://restcountries.eu/rest/v2/name/${country}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayCountryDetails(data[0]))
}

const displayCountryDetails = country =>{
    var countryModal = new bootstrap.Modal(document.getElementById('countryModal'))
    const modalBody = document.getElementById('modalBody')
    const modalContent = `
        <img class="flag-image" src="${country.flag}">
        <h3>${country.name} (${country.alpha2Code})</h3>
        <h4>${country.region}</h4>
        <p>Population : ${country.population}</p>
        <p>Time zone : ${country.timezones}</p>
        <p>Top Level Domain : (${country.topLevelDomain})</p>
        <p>Languages : ${languagesList(country.languages)}</p>

    `
    modalBody.innerHTML = modalContent
    countryModal.show()
}

const languagesList = languages =>{
    let list = ""
    languages.forEach(language => {
        list = list + " " + language.name +","
    });
    return list
}


