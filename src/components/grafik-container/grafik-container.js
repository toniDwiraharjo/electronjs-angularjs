angular.module('myApp')
    .component('grafikContainer', {
        bindings: {
            markers: '<',
            markerIdCount: '<',
            removeMarker: '&',
            idTabWantToOpen: '<'
        },
        controller: class grafikContainer {
            constructor($scope, $timeout) {
                this.scope = $scope;
                this.timeout = $timeout;

                this.chromeTabs = new ChromeTabs();
                const el = document.querySelector('.chrome-tabs');
                this.chromeTabs.init(el, {
                    tabOverlapDistance: 14,
                    minWidth: 45,
                    maxWidth: 243
                });

                // remove tab default
                this.chromeTabs.removeTab(el.querySelector('.chrome-tab-current'))

                el.addEventListener('tabRemove', ({ detail }) => {
                    var id = Number(detail.tabEl.id);
                    this.removeMarker({ idToRemove: id });

                    // hide graph current id
                    angular.forEach(this.scope.graphs, (graph) => {
                        if (graph.id === id) {
                            graph.show = false;
                        }
                    });
                    scopeApply();

                    console.log('Tab removed', id);
                });

                // inisialisasi graphs
                this.scope.graphs = [];
                el.addEventListener('activeTabChange', ({ detail }) => {
                    var id = Number(detail.tabEl.id);

                    angular.forEach(this.scope.graphs, (graph) => {
                        if (graph.id === id) {
                            graph.show = true;
                        } else {
                            graph.show = false;
                        }
                    });
                    scopeApply();

                    console.log('Active tab changed', id)
                });

                function scopeApply() {
                    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                        $scope.$apply();
                    }
                }
                console.log('grafik-container berhasil di load');
            }

            openTab(id) {
                console.log('tab yang akan diaktifkan', id);

                var tabEl = document.getElementById(`${id}`);
                // jika tabEl tidak sama dengan null
                if (tabEl) {
                    tabEl.click();
                    console.log('aktif tab el id-', id);
                }
            }

            addTab(tab) {
                var graph = {
                    id: tab.id,
                    divId: `graph-${tab.id}`,
                    show: false
                };
                this.scope.graphs.push(graph);

                // inisialisasi graph setelah scope di render semua
                this.timeout(() => {
                    console.log('siap render graph', document.getElementById(graph.divId));
                    initGraph(graph.divId);
                });


                // add tab terakhir agar tidak error di event el di container
                this.chromeTabs.addTab({
                    title: tab.title,
                    id: tab.id
                });

                // fungsi template untuk get graph
                function initGraph(divId) {
                    Highcharts.chart(divId, {

                        title: {
                            text: `ini id ke-${divId}`
                        },

                        subtitle: {
                            text: 'Source: thesolarfoundation.com'
                        },

                        yAxis: {
                            title: {
                                text: 'Number of Employees'
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle'
                        },

                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                pointStart: 2010
                            }
                        },

                        series: [{
                            name: 'Installation',
                            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                        }, {
                            name: 'Manufacturing',
                            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                        }, {
                            name: 'Sales & Distribution',
                            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                        }, {
                            name: 'Project Development',
                            data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                        }, {
                            name: 'Other',
                            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                        }],

                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }

                    });
                }
            }

            $onChanges(e) {
                // if e has markerIdCount
                if (e.markerIdCount) {
                    if (e.markerIdCount.previousValue.constructor.name !== 'UNINITIALIZED_VALUE') {
                        var lastIdMarker = e.markerIdCount.previousValue;

                        this.addTab({
                            title: `${lastIdMarker}-tab baru`,
                            id: lastIdMarker
                        });
                    }
                }

                // if e has idTabWantToOpen
                if (e.idTabWantToOpen) {
                    var idTabWantToOpen = e.idTabWantToOpen.currentValue;
                    this.openTab(idTabWantToOpen);
                }
            }
        },
        template: `
        <div>
            <div class="chrome-tabs">
                <div class="chrome-tabs-content">
                    <div class="chrome-tab chrome-tab-current">
                        <div class="chrome-tab-background">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <symbol id="chrome-tab-geometry-left" viewBox="0 0 214 29">
                                        <path d="M14.3 0.1L214 0.1 214 29 0 29C0 29 12.2 2.6 13.2 1.1 14.3-0.4 14.3 0.1 14.3 0.1Z" />
                                    </symbol>
                                    <symbol id="chrome-tab-geometry-right" viewBox="0 0 214 29">
                                        <use xlink:href="#chrome-tab-geometry-left" />
                                    </symbol>
                                    <clipPath id="crop">
                                        <rect class="mask" width="100%" height="100%" x="0" />
                                    </clipPath>
                                </defs>
                                <svg width="50%" height="100%">
                                    <use xlink:href="#chrome-tab-geometry-left" width="214" height="29" class="chrome-tab-background" />
                                    <use xlink:href="#chrome-tab-geometry-left" width="214" height="29" class="chrome-tab-shadow" />
                                </svg>
                                <g transform="scale(-1, 1)">
                                    <svg width="50%" height="100%" x="-100%" y="0">
                                        <use xlink:href="#chrome-tab-geometry-right" width="214" height="29" class="chrome-tab-background" />
                                        <use xlink:href="#chrome-tab-geometry-right" width="214" height="29" class="chrome-tab-shadow" />
                                    </svg>
                                </g>
                            </svg>
                        </div>
                        <div class="chrome-tab-favicon"></div>
                        <div class="chrome-tab-title">Dataset</div>
                        <div class="chrome-tab-close"></div>
                    </div>
                </div>
                <div class="chrome-tabs-bottom-bar"></div>
            </div>
            <div style="background-color: rgb(242, 242, 242); position: absolute; height: calc(100% - 55px); width: 100%;">
                <div ng-repeat="graph in graphs" ng-attr-id="{{graph.divId}}" ng-show="graph.show" style="width: 100%; height: 100%;">hallo id-{{graph.id}}</div>
                <!--      
                    <div id="tesGraph">hallo</div>
                -->
            </div>
        </div>
        `
    })