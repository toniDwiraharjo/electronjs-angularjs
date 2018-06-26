angular.module('myApp')
    .component('myDatasets', {
        bindings: {
            addTabs: '&'
        },
        controller: class myDatasets {
            constructor($scope, app, Menu, dialog) {
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

                setupMenu();

                // kondisi awal langsung buka dialog open file nc
                dialogOpenFileNc();
                
                function setupMenu() {
                    const menuTemplate = [
                        {
                            label: 'File',
                            submenu: [
                                {
                                    label: 'Open File NetCDF4',
                                    click() {
                                        // buka dialog
                                        dialogOpenFileNc();
                                    }
                                }
                            ]
                        },
                        {
                            role: 'help',
                            submenu: [
                                {
                                    label: 'Learn More',
                                    click() { }
                                }
                            ]
                        }
                    ];
                    app.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
                }

                function dialogOpenFileNc() {
                    const dialogConfig = {
                        title: 'Open File NetCDF4',
                        filters: [
                            { name: 'NetCDF4', extensions: ['nc'] }
                        ]
                    };
                    dialog.showOpenDialog(dialogConfig, (filePath) => {
                        if (filePath) {
                            console.log('berhasil');
                        }
                    });
                }
            }
        },
        templateUrl: './components/my-datasets/my-datasets.html'
    })