import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { EsriLoaderService } from 'angular-esri-loader';

import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { GeocoderService } from '../services/geocoder.service';
import { ReverseGeocodeParams } from "../classes/geocode-params";
import { Point } from '../classes/point';
import { ClientPoint } from '../classes/clientPoint';

@Injectable()
export class CoordinatesService {
    private readonly arcgisJSAPIUrl = 'https://js.arcgis.com/4.5/';

    private WebMercatorUtils: __esri.webMercatorUtils;

    constructor(
        private geocodeService: GeocoderService,
        private esriLoaderService: EsriLoaderService) { }

    loadModule(): Promise<any> {
        if (this.WebMercatorUtils == undefined) {
            return this.esriLoaderService
                .load({ url: this.arcgisJSAPIUrl })
                .then(() => {
                    return this.esriLoaderService
                        .loadModules([
                            "esri/geometry/support/webMercatorUtils"
                        ])
                })
                .then(([webMercatorUtils]) => {
                    this.WebMercatorUtils = webMercatorUtils;
                })
        }
        return new Promise((res, rej) => { res(); });
    }

    public convertToClientPoints(points: Point[]): Promise<ClientPoint[]> {
        return this.loadModule()
            .then(() => {
                let clientPoints = new Array<ClientPoint>();
                points.forEach((point) => {
                    let c = this.WebMercatorUtils
                        .lngLatToXY(point.longitude, point.latitude);
                    clientPoints.push(new ClientPoint(c[0], c[1]));
                });
                return clientPoints;
            });
    }

    public convertToPoints(clientPoints: ClientPoint[]): Promise<Point[]> {
        return this.loadModule()
            .then(() => {
                let points = new Array<Point>();
                clientPoints.forEach((clientPoint, i) => {
                    let c = this.WebMercatorUtils
                        .xyToLngLat(clientPoint.x, clientPoint.y);
                    points.push(new Point(i, c[1], c[0]));
                });
                return points;
            });
    }


    public convert(points: Point[]) {
        let newCoord = this.loadModule().then(() => {
            points.forEach((point: Point, i: number) => {
                let x = point.latitude;
                let y = point.longitude;

                //if (point.isConverted) {
                //    return;
                //}

                let c = this.WebMercatorUtils.xyToLngLat(point.longitude, point.latitude);
                point.longitude = c[0];
                point.latitude = c[1];
                //point.isConverted = true;

                let params: ReverseGeocodeParams = new ReverseGeocodeParams(x, y);
                this.geocodeService.getReverse(params)
                    .subscribe((data: any) => {
                        if (data.address) {
                            point.address = data.address.ShortLabel;
                        }
                    });
            });
        });
    }
}