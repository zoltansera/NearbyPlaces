const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

function geo() {
    navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
        /* result.status = "prompt" */
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
        alert("Geolocation denied / not supported by browser.");
    }
}

function showPosition(position) {
    var map = L.map("map").setView([position.latitude, position.longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
}

function success(pos) {
    const crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    showPosition(crd);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

geo();
