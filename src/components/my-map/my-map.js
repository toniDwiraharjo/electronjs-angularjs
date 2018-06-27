angular.module('myApp')
    .component('myMap', {
        controller: class myMap {
            constructor() {
                this.map = L.map('map').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);
            }
        },
        templateUrl: './components/my-map/my-map.html'
    })