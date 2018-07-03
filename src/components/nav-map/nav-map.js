angular.module('myApp')
    .component('navMap', {
        controller: class navMap {
            constructor($scope) {
                this.scope = $scope;

                // style init
                this.scope.btnModal = {
                    zIndex: 999999999,
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                };
                this.scope.modalContainer = {
                    zIndex: 99999999999999,
                    display: 'block'
                };

                console.log('nav-map berhasil di load');

                this.clearMapTrigger = false;
                this.scope.clear = () => {
                    // butuh ada perubahan saja karena one way data bindings
                    // agar mentrigger fungsi onChanges di map
                    this.clearMapTrigger = !this.clearMapTrigger;
                };
            }
        },
        templateUrl: './components/nav-map/nav-map.html'
    })