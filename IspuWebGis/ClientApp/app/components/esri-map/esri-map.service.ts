import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { EsriLoaderService } from 'angular-esri-loader';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Injectable()
export class EsriMapService {
    private readonly arcgisJSAPIUrl = 'https://js.arcgis.com/4.5/';
    private _mapView: __esri.MapView;
    public baseMap: __esri.Map;
    constructor(private esriLoaderService: EsriLoaderService, private _zone: NgZone) { }

    createMap(mapViewProperties: __esri.MapViewProperties): Promise<void> {
        return this.esriLoaderService.load({ url: this.arcgisJSAPIUrl }).then(() => {
            return this.esriLoaderService.loadModules([
                'esri/Map',
                'esri/views/MapView',
                "esri/Basemap"
            ]).then(([Map, MapView, Basemap]: [__esri.MapConstructor, __esri.MapViewConstructor, __esri.BasemapConstructor]) => {    

                var mapProperties: __esri.MapProperties = {};
                let basemap: __esri.Basemap = Basemap.fromId('streets');
                mapProperties.basemap = basemap;          
                let createdMap = new Map(mapProperties);
                mapViewProperties.zoom = 16;
                mapViewProperties.map = createdMap;
                this.baseMap = createdMap;
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

    addMarkers(x: number, y: number): number[] {
        var arrayOfMarkers = new Array();
        this.esriLoaderService.load({ url: 'https://js.arcgis.com/3.22/' }).then(() => {
            this.esriLoaderService.loadModules([
                'esri/symbols/SimpleMarkerSymbol',
                'esri/layers/GraphicsLayer',
                'esri/renderers/SimpleRenderer',
                'esri/Map',
                'esri/Color',
                'esri/symbols/SimpleLineSymbol',
                'esri/geometry/Point'
            ]).then(([MarkerSymbol, GraphicsLayer, Renderer, Map, Color, LineSymbol, Point]) => {

                for (var i = 0; i < 3; i++) {
                    var marker = new MarkerSymbol();
                    marker.style = MarkerSymbol.STYLE_CIRCLE;
                    marker.size = 20;
                    marker.xoffset = x + Math.random();
                    marker.yoffset = y + Math.random();
                    marker.color = new Color("blue");
                    marker.outline = new LineSymbol();
                    var layer = new GraphicsLayer();
                    var renderer = new Renderer(marker);
                    //layer.setRenderer(renderer); // !
                    //var map = new Map();
                    //map.addLayer(layer);
                    arrayOfMarkers[i] = new Point(marker.xoffset, marker.yoffset);
                }
                alert("done");
            });
        });
        return arrayOfMarkers;
    }
}

