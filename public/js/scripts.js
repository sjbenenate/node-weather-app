console.log('Client side JavaScript');

const forecastMsg = document.getElementById('forecast')
const locationMsg = document.getElementById('location')
const errorMsg = document.getElementById('msg')
const addressInput = document.getElementById('addressInput')

function getForecast(address) {
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                forecastMsg.textContent = ''
                locationMsg.textContent = ''
                return errorMsg.textContent = 'Error: ' + data.error
            }
            errorMsg.textContent = ''
            forecastMsg.textContent = data.forecast
            locationMsg.textContent = data.location
        })
    })
}

function addressSubmitHandler(event) {
    errorMsg.textContent = 'Loading...'
    forecastMsg.textContent = ''
    locationMsg.textContent = ''

    getForecast(addressInput.value)
    event.preventDefault()
}

let addressForm = document.getElementById("addressForm")
addressForm.addEventListener('submit', addressSubmitHandler)


