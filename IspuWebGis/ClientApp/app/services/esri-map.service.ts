import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { EsriLoaderService } from 'angular-esri-loader';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Point } from "../classes/point";
import { ClientPoint } from "../classes/clientPoint";
import { TaskRequest } from "../classes/taskRequest";

import { TaskService } from "./task.service";
import { CoordinatesService } from "./coordinates.service";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EsriMapService {
    private readonly arcgisJSAPIUrl = 'https://js.arcgis.com/4.5/';
    private _mapView: __esri.MapView;

    constructor(
        private esriLoaderService: EsriLoaderService,
        private _zone: NgZone,
        private taskService: TaskService,
        private coordinatesService: CoordinatesService) { }

    createMap(mapViewProperties: __esri.MapViewProperties): Promise<void> {
        return this.esriLoaderService.load({
            url: this.arcgisJSAPIUrl
        }).then(() => {
            return this.esriLoaderService.loadModules([
                'esri/Map',
                'esri/views/MapView',
                "esri/Basemap"
            ]).then(([Map, MapView, Basemap]: [__esri.MapConstructor, __esri.MapViewConstructor, __esri.BasemapConstructor]) => {

                let mapProperties: __esri.MapProperties = {};
                let basemap: __esri.Basemap = Basemap.fromId('streets');
                mapProperties.basemap = basemap;
                let createdMap = new Map(mapProperties);

                mapViewProperties.zoom = 16;
                mapViewProperties.map = createdMap;

                this._mapView = new MapView(mapViewProperties);

                return;
            });
        });
    }


    getCenter(): Promise<__esri.Point> {
        return new Promise<__esri.Point>((resolve, reject) => {
            resolve(this._mapView.center);
        });
    }

    subscribeToMapEvent<E>(eventName: string): Observable<E> {
        return Observable.create((observer: Observer<E>) => {
            this._mapView.on(eventName, (arg: E) => {
                this._zone.run(() => observer.next(arg));
            });
        });
    }

    updateMarkers(points: Point[]) {
        return this.esriLoaderService
            .load({ url: this.arcgisJSAPIUrl })
            .then(() => {
                return this.esriLoaderService
                    .loadModules([
                        'esri/symbols/SimpleMarkerSymbol',
                        "esri/Graphic",
                    ])
                    .then(([SimpleMarkerSymbol, Graphic]) => {
                        this._mapView.graphics.removeAll();

                        for (var i = 0; i < points.length; i++) {
                            let p: Point = points[i];

                            var point = {
                                type: "point", // autocasts as new Point()
                                longitude: p.latitude,
                                latitude: p.longitude,
                            };
                            var pointGraphic = new Graphic({
                                geometry: point,
                                symbol: {
                                    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                    style: "circle",
                                    color: "#D41F67",
                                    size: 16,
                                }
                            });
                            this._mapView.graphics.add(pointGraphic);
                        }
                    });
            });
    }
    
    /**
     * Add simple marker and delete other things on map(issue!)
     */
    addMarker(point: Point): Promise<any> {
        //alert(longitude+","+latitude);
        return this.esriLoaderService
            .load({ url: this.arcgisJSAPIUrl })
            .then(() => {
                return this.esriLoaderService
                    .loadModules([
                        'esri/symbols/SimpleMarkerSymbol',
                        "esri/Graphic",
                    ])
                    .then(([SimpleMarkerSymbol, Graphic]) => {
                        //this._mapView.graphics.removeAll(); //dunno how to remove single shit.

                        //var p = new Point(0, longitude, latitude);
                        var marker = {
                            type: "point", // autocasts as new Point()
                            longitude: point.longitude,
                            latitude: point.latitude,
                        };
                        var pointGraphic = new Graphic({
                            geometry: marker,
                            symbol: {
                                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                                style: "circle",
                                color: "#D41F67",
                                size: 16,
                            }
                        });
                        this._mapView.graphics.add(pointGraphic);


                        return;
                    });
            });
    }

    connectMarkers(points: Point[]) {
        this.coordinatesService.convertToClientPoints(points)
            .then((clientPoints: ClientPoint[]) => {
                var task = new TaskRequest();
                task.isFavourite = false;
                task.startPoint = clientPoints[0];
                clientPoints.shift();
                task.checkpoints = clientPoints;
                task.name = "Name name";
                task.time = new Date();
                task.userId = 1;
                task.mode = "ShortRoute";

                return this.taskService.makeWay(task);
            })
            .then((resClientPoints: ClientPoint[]) => {
                return this.coordinatesService.convertToPoints(resClientPoints);
            })
            .then((wayPoints) => {
                return this.drawPolyline(wayPoints);
            });
    }

    drawPolyline(points: Point[]): Promise<any> {
        return this.esriLoaderService
            .load({ url: this.arcgisJSAPIUrl })
            .then(() => {
                return this.esriLoaderService
                    .loadModules([
                        "esri/geometry/Polyline",
                        "esri/symbols/SimpleLineSymbol",
                        "esri/Graphic"
                    ])                   
            })
            .then(([Polyline, SimpleLineSymbol, Graphic]) => {
                let vertices = new Array<number[]>();
                points.forEach(point => {
                    vertices.push([point.longitude, point.latitude]);
                });

                let polyline = new Polyline({
                    paths: vertices,
                });

                let symbol = new SimpleLineSymbol({
                    type: "simple-line", // autocasts as SimpleLineSymbol
                    color: "#D41F67",
                    width: "2px"
                });

                let graphic = new Graphic({
                    geometry: polyline,
                    symbol: symbol,
                    cap: "round"
                });

                this._mapView.graphics.add(graphic);

            })
    }

    connectClientPoints(points: ClientPoint[]): Promise<any> {
              

        return this.esriLoaderService
            .load({ url: this.arcgisJSAPIUrl })
            .then(() => {
                return this.esriLoaderService
                    .loadModules([
                        "esri/geometry/Polyline",
                        "esri/symbols/SimpleLineSymbol",
                        "esri/Graphic",
                        "esri/geometry/support/webMercatorUtils"
                    ])
                    .then(([Polyline, SimpleLineSymbol, Graphic, webMercatorUtils]) => {
                        this._mapView.graphics.removeAll();

                        if (points == null || points.length == 0) {
                            return;
                        }

                        let truePoints = points.map(p => {
                            var result = webMercatorUtils.xyToLngLat(p.x, p.y)
                            return new Point(0, result[0], result[1]);
                        });

                        let vertices = new Array<number[]>();
                        truePoints.forEach(point => {
                            vertices.push([point.latitude, point.longitude]);
                        });

                        let polyline = new Polyline({
                            paths: vertices,
                        });

                        let symbol = new SimpleLineSymbol({
                            type: "simple-line", // autocasts as SimpleLineSymbol
                            color: "#D41F67",
                            width: "2px"
                        });

                        let graphic = new Graphic({
                            geometry: polyline,
                            symbol: symbol,
                            cap: "round"
                        });

                        this._mapView.graphics.add(graphic);


                        //for (let p of truePoints) {
                        //    var symb = {
                        //        type: "point", // autocasts as new Point()
                        //        longitude: p.latitude,
                        //        latitude: p.longitude,
                        //    };

                        //    var pointGraphic = new Graphic({
                        //        geometry: symb,
                        //        symbol: {
                        //            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        //            style: "circle",
                        //            color: "#D41F67",
                        //            size: 16,
                        //        }
                        //    });
                        //    this._mapView.graphics.add(pointGraphic);
                        //}

                        return;
                    });
            });
    }
}