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

@Injectable()
export class CoordinatesService {
    private readonly arcgisJSAPIUrl = 'https://js.arcgis.com/4.5/';

    private WebMercatorUtils: any;

    constructor(
        private geocodeService: GeocoderService,
        private esriLoaderService: EsriLoaderService) { }

    loadModule(): Promise<Function> {
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
                .then(() => new Promise<Function>((res, rej) => res(this.WebMercatorUtils)));
        } else {
            return new Promise<Function>((res, rej) => res(this.WebMercatorUtils));
        }
    }

    public convert(points: Point[]) {
        let newCoord = this.loadModule().then(() => {
            points.forEach((point: Point, i: number) => {
                let x = point.latitude;
                let y = point.longitude;

                if (point.isConverted) {
                    return;
                }

                let c = this.WebMercatorUtils.xyToLngLat(point.longitude, point.latitude);
                point.longitude = c[0];
                point.latitude = c[1];
                point.isConverted = true;

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