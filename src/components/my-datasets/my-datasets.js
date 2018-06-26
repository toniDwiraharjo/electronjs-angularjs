angular.module('myApp')
    .component('myDatasets', {
        bindings: {
            addTabs: '&'
        },
        controller: class myDatasets {
            constructor($scope) {
                this.scope = $scope;

                this.scope.tambah = () => {
                    console.log('alloha bos');
                    this.addTabs({
                        tab: {
                            title: 'testing',
                            content: 'plot.html'
                        }
                    });
                }
            }
        },
        templateUrl: './components/my-datasets/my-datasets.html'
    })