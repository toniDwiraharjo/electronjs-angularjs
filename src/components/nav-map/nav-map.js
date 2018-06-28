angular.module('myApp')
    .component('navMap', {
        controller: class navMap {
            constructor($scope) {
                this.scope = $scope;

                // style init
                this.scope.btnModal = {
                    zIndex: 99999999999,
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                };
                this.scope.btnGrafik = {
                    zIndex: 99999999999,
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px'
                };
                this.scope.modalContainer = {
                    zIndex: 99999999999999,
                    display: 'block'
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

                console.log('nav-map berhasil di load');
            }
        },
        templateUrl: './components/nav-map/nav-map.html'
    })