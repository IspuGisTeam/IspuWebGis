import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { EsriLoaderService } from 'angular-esri-loader';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Point } from "../../classes/point";

@Injectable()
export class EsriMapService {
    private readonly arcgisJSAPIUrl = 'https://js.arcgis.com/4.5/';
    private _mapView: __esri.MapView;

    constructor(private esriLoaderService: EsriLoaderService, private _zone: NgZone) { }

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
                console.log("add");
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

    addMarkers(x: number, y: number): Promise<Point[]> { // method creates three random markers within Ivanovo       
        return this.esriLoaderService
            .load({ url: this.arcgisJSAPIUrl })
            .then(() => {
                return this.esriLoaderService
                    .loadModules([
                        'esri/symbols/SimpleMarkerSymbol',
                        "esri/Graphic",
                    ])
                    .then(([SimpleMarkerSymbol, Graphic]) => {
                        var arrayOfMarkers = new Array<Point>();
                        this._mapView.graphics.removeAll();                      
                        var new_x = x, new_y = y;
                        for (var i = 0; i < 3; i++) {
                            new_x = Math.random() * ((x + 0.021) - (x - 0.027)) + (x - 0.027);
                            new_y = Math.random() * ((y + 0.021) - (y - 0.027)) + (y - 0.027);
                            var p = new Point(100, new_x, new_y);
                            var point = {
                                type: "point", // autocasts as new Point()
                                longitude: new_x,
                                latitude: new_y,
                            };
                            var pointGraphic = new Graphic({
                                geometry: point,
                                symbol: {
                                    type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                                    style: "circle",
                                    color: "#D41F67",
                                    size: 16,

                                    // Причина бага с неверным отображением точек
                                    //xoffset: new_x,
                                    //yoffset: new_y,
                                }
                            });
                            this._mapView.graphics.add(pointGraphic);
                            arrayOfMarkers[i] = p;
                            new_x = x;
                            new_y = y;
                        }
                        return arrayOfMarkers;
                    });
            });
    }

    connectMarkers(points: Point[]): Promise<any> {
        return this.esriLoaderService
            .load({ url: this.arcgisJSAPIUrl })
            .then(() => {
                return this.esriLoaderService
                    .loadModules([
                        "esri/geometry/Polyline",
                        "esri/symbols/SimpleLineSymbol",
                        "esri/Graphic"
                    ])
                    .then(([Polyline, SimpleLineSymbol, Graphic]) => {
                        if (points == null || points.length == 0) {
                            return;
                        }
                        let vertices = new Array<number[]>();
                        points.forEach(point => {
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

                        this._mapView.graphics.add(graphic)

                        return;
                    });
            });
    }
}