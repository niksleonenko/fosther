let image = document.getElementById("image");
let temperature = document.getElementById("temperature");

let apiKey = "AIzaSyBiluVpJ_LDYxqfzdy38AySJM8oqA7UIic";
let url = "https://weather.googleapis.com/v1/currentConditions:lookup?key=";

function toggleVisibility(target, state) { document.getElementById(target).style.visibility = state; }

function fosther() {

    toggleVisibility("denied", "hidden");
    toggleVisibility("locating", "visible");
    temperature.innerHTML = "Loading...";

    navigator.geolocation.getCurrentPosition(callDarkSky, function(error) {

        toggleVisibility("locating", "hidden");
        toggleVisibility("denied", "visible");
        temperature.innerHTML = "Location denied";

    });

    // This is a nod to my previous project, Tempus
    //  RIP DarkSky </3
    async function callDarkSky(position) {

        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let generated_url = url + apiKey + "&location.latitude=" + latitude + "&location.longitude=" + longitude;
        console.log(generated_url)

        try {

            const response = await fetch(generated_url);
            if (!response.ok) { throw new Error(`Response status: ${response.status}`); }

            const data = await response.json();
            console.log(data);
            console.log(data.weatherCondition.iconBaseUri+".svg");

            toggleVisibility("locating", "hidden");

            image.src = data.weatherCondition.iconBaseUri + ".svg"
            temperature.innerHTML = data.temperature.degrees + "° C";

        } catch (error) { console.error(error.message);}

    }


}
