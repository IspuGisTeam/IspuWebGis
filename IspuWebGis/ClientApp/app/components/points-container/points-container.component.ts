import { Component, Input } from '@angular/core';
import { EsriMapService } from '../esri-map/esri-map.service';
import { Point } from "../../classes/point";
import { AppComponent } from '../app/app.component';
import {GeocoderService} from "../../services/geocoder.service";

import {GeocodeParams} from "../../classes/geocode-params";


@Component({
    selector: 'points-container',
    templateUrl: './points-container.component.html',
    styleUrls: ['./points-container.component.css']
})

export class PointsContainerComponent {
    @Input() points: Array<Point>; // here array of markers
    constructor(private esriMap: EsriMapService, private appComp: AppComponent, private geocodeService: GeocoderService) { }

    async addPoint() { 
        var x = <number>this.appComp.center.longitude;
        var y = <number>this.appComp.center.latitude;
        this.points = await this.esriMap.addMarkers(x, y); // array of three markers` points (type: Point)
        this.points = this.getPointsReverseGeoCode(this.points);
    }

    getPointsReverseGeoCode(points: Point[]): Point[] {
        console.log(points.length);
        for (var i = 0; i < points.length; i++) {
            let loc = points[i].latitude + "," + points[i].longitude;
            let param = new GeocodeParams(loc);
            let index = i;
            this.geocodeService.getReverseGeocode(param).subscribe((data) => {
                //console.log(data.address.ShortLabel);
                if (data.address)

                    points[index].address = data.address.ShortLabel;
                //console.log(data.address.ShortLabel);
            });

        }
        return points;
    }

}