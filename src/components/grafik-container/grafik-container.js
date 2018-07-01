angular.module('myApp')
    .component('grafikContainer', {
        bindings: {
            markers: '<',
            markerIdCount: '<',
            removeMarker: '&'
        },
        controller: class grafikContainer {
            constructor($scope) {
                this.scope = $scope;

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

            addTab(tab) {
                var graph = {
                    id: tab.id,
                    divId: `graph-${tab.id}`,
                    show: false
                };
                this.scope.graphs.push(graph);

                // add tab terakhir agar tidak error di event
                this.chromeTabs.addTab({
                    title: tab.title,
                    id: tab.id
                });
            }

            $onChanges({ markerIdCount }) {
                if (markerIdCount.previousValue.constructor.name !== 'UNINITIALIZED_VALUE') {
                    var lastIdMarker = markerIdCount.previousValue;

                    this.addTab({
                        title: `${lastIdMarker}-tab baru`,
                        id: lastIdMarker
                    });
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
            </div>
        </div>
        `
    })