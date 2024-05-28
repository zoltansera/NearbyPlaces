class GeoLoc {

    constructor() {
        this.options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        this.lat = 47.488524;
        this.long = 19.0421782;
        this.acc = 0;

        this.state = undefined;
        this.zoom = 19;
        this.map = L.map("map").setView([this.lat, this.long], this.zoom);
        this.myPosMarker = L.circle([this.lat, this.long], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.2,
            radius: 2,
        }).addTo(this.map);
        this.askForGeolocationPermission();
    }

    askForGeolocationPermission = () => {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            if (result.state === "granted") {
                //showLocalNewsWithGeolocation();
            } else if (result.state === "prompt") {
                //showButtonToEnableLocalNews();
                console.log("Enable later");
            } else {
                // Don't do anything if the permission was denied.
            }
            this.state = result.state;
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.success, this.error, this.options);
            this.state = "watching";
        } else {
            alert("Not supported");
        }
    }

    success = (pos) => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude;
        this.acc = pos.coords.accuracy;
        console.log("Your current position is:");
        console.log(`Latitude : ${this.lat}`);
        console.log(`Longitude: ${this.long}`);
        console.log(`More or less ${this.acc} meters.`);
        this.showPosition(this.lat, this.long, this.acc);
    }

    error = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    showPosition = () => {
        this.zoom = this.map.getZoom();
        this.map.setView([this.lat, this.long], this.zoom);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 21,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
    
        this.myPosMarker.setLatLng([this.lat, this.long]);
    }
}


const myLoc = new GeoLoc();
