angular.module('myApp')
    .component('myMap', {
        controller: class myMap {
            constructor($scope, $compile) {
                this.scope = $scope;

                // style init
                this.scope.btnGrafik = {
                    zIndex: 99999999999,
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px'
                };
                this.scope.grafikContainer = {
                    zIndex: 99999999999,
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    height: '300px',
                    display: 'none',
                    backgroundColor: '#dad9da'
                };

                // style method
                const defaultBottomBtnGrafik = this.scope.btnGrafik.bottom,
                    defaultTopDisplayGrafikContainer = {
                        top: this.scope.grafikContainer.top,
                        display: this.scope.grafikContainer.display
                    };
                this.scope.showHideGrafik = () => {
                    if (this.scope.btnGrafik.bottom === defaultBottomBtnGrafik) {
                        this.scope.btnGrafik.bottom = `calc(${this.scope.grafikContainer.height} + ${this.scope.btnGrafik.bottom})`;
                        this.scope.grafikContainer.top = `calc(${this.scope.grafikContainer.top} - ${this.scope.grafikContainer.height})`;
                        this.scope.grafikContainer.display = 'block';
                    } else {
                        this.scope.btnGrafik.bottom = defaultBottomBtnGrafik;
                        Object.assign(this.scope.grafikContainer, defaultTopDisplayGrafikContainer);
                    }
                };

                // map init
                this.map = L.map('map').setView([51.505, -0.09], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.map);

                // map event click
                this.map.on('click', ({ latlng }) => {
                    var popup = L.popup()
                        .setLatLng(latlng)
                        .setContent(toPopupContent(latlng))
                        .openOn(this.map);

                    function toPopupContent(latlng) {
                        var popupTemplate = `
                        <div>
                            <h4>Data</h4>
                            ${angular.toJson(latlng)}
                            <br>
                            <button ng-click='addMarker(${angular.toJson(latlng)})'>tambah marker dan lihat grafik</button>
                        </div>
                        `;
                        return $compile(popupTemplate)($scope)[0];
                    }
                });

                // fungsi marker
                const tampilGrafikContainer = () => {
                    if (this.scope.grafikContainer.display !== 'block') {
                        this.scope.btnGrafik.bottom = `calc(${this.scope.grafikContainer.height} + ${this.scope.btnGrafik.bottom})`;
                        this.scope.grafikContainer.top = `calc(${this.scope.grafikContainer.top} - ${this.scope.grafikContainer.height})`;
                        this.scope.grafikContainer.display = 'block';
                    }
                }
                this.markers = [];
                this.markerIdCount = 0;
                this.scope.addMarker = (latlng) => {
                    var markerId = this.markerIdCount;
                    this.markers.push({
                        marker: new L.marker(latlng).bindPopup(toMarkerPopup(latlng)).addTo(this.map).openPopup(),
                        id: markerId
                    });

                    // buka grafik terlebih dahulu
                    // baru increment markerIdCount
                    // supaya ga error di grafik-container
                    tampilGrafikContainer();

                    this.markerIdCount++;

                    function toMarkerPopup(latlng) {
                        var popupTemplate = `
                            <div>
                                <h4>Data</h4>
                                ${angular.toJson(latlng)}
                                <br>
                                id ${markerId}, kedepannya marker dihapus oleh tab
                                <br>
                                <!--  
                                    <button ng-click="$ctrl.removeMarker(${markerId})">hapus marker</button>
                                -->
                                <button ng-click="openTab(${markerId})">lihat grafik</button>
                            </div>
                            `;
                        return $compile(popupTemplate)($scope)[0];
                    }
                };

                this.idTabWantToOpen = null;
                this.scope.openTab = (id) => {
                    // tampilkan terlebih dahulu grafiknya
                    tampilGrafikContainer();

                    // baru ubah nilai idTabWantToOpen
                    this.idTabWantToOpen = id;
                    console.log('testing', id);
                };

                // testing openPopupMarkerById
                // window.openPopupMarkerById = this.openPopupMarkerById;
                // window.markers = this.markers
            }

            removeMarker(idToRemove) {
                this.markers.forEach(({ marker, id }) => {
                    if (id === idToRemove) {
                        this.map.removeLayer(marker);
                        console.log(`marker id-${id} telah di hapus`);
                    }
                });
            }

            openPopupMarkerById(idToOpenPopup) {
                this.markers.forEach(({ marker, id }) => {
                    if (id === idToOpenPopup) {
                        marker.openPopup();
                    }
                });
            }
        },
        templateUrl: './components/my-map/my-map.html'
    })