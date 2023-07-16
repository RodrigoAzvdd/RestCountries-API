const submitBtn = document.querySelector('.btn')

//card items
const flagImg = document.querySelector('#img')
const nameInput = document.querySelector('#name')
const capital = document.querySelector('#capital')
const population = document.querySelector('#population')
const area = document.querySelector('#area')
const countryCard = document.querySelector('.country-card')

async function getCountry(name) {
    if (name) {
        const response = await fetch(`https://restcountries.com/v2/name/${name}`)
        const countries = await response.json()
        if (countries.length > 0) {
            const countryInfo = countries[0]
            return countryInfo;
        } else {
            return Promise.reject('País não encontrado.')
        }
    }
    return Promise.reject('Por favor, informe um nome de país válido.')
}

async function showCountry() {
    try {
        const inputValue = document.getElementById('countryName').value
        const country = await getCountry(inputValue)

        resetCard()

        const countryName = country.name
        const countryCapital = country.capital
        const countryPopulation = country.population
        const countryArea = country.area
        const countryFlag = country.flag

        nameInput.textContent = `Name: ${countryName}`
        capital.textContent = `Capital: ${countryCapital}`
        population.textContent = `Population: ${countryPopulation}`
        area.textContent = `Area: ${countryArea} Km²`
        flagImg.src = countryFlag

        countryCard.classList.remove('d-none')
    } catch (err) {
        if (!countryCard.classList.contains('d-none')) {
            countryCard.classList.add('d-none')
        }
        alert(err)
    }
}

function resetCard() {
    nameInput.textContent = ''
    capital.textContent = ''
    population.textContent = ''
    area.textContent = ''
    flagImg.src = ''
}

submitBtn.addEventListener('click', showCountry)
