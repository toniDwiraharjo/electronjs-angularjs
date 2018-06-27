angular.module('myApp')
    .component('navMap', {
        controller: class navMap {
            constructor() {
                console.log('nav-map berhasil di load');
            }
        },
        templateUrl: './components/nav-map/nav-map.html'
    })