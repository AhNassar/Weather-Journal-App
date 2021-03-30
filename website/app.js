const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '3f9c86d23511259ce071780b6dce1182';

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener for Generate button is clicked
document.getElementById('generate').addEventListener('click', genEntry);

async function genEntry(event) {
    const zipCode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;
    getWeatherData(baseUrl, zipCode, apikey)
        .then(function (userData) {

            postData('/add', {
                Temperature: userData.main.temp,
                Date: newDate,
                userResponse: userResponse,
            })



            updateUI();

        })


}

async function getWeatherData(baseUrl, zipCode, apikey) {
    const openWheatherApiUrl = baseUrl + zipCode + "&APPID=" + apikey;
    const res = await fetch(openWheatherApiUrl);
    try {
        const userData = await res.json();
        console.log(userData);
        return userData;

    } catch (error) {
        console.log('error', error);
    }
}
const postData = async function (url = '/add', Data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(Data)
    })
    try {
        const newEntry = await response.json();
        console.log(newEntry);
        return newEntry;
    } catch (error) {
        console.log('error', error);

    }
}
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date: ${allData.Date}</P>`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.Temperature}`;
        document.getElementById('content').innerHTML = `You Feel: ${allData.userResponse}`;
    }
    catch (error) {
        console.log('error', error);
    }
}

