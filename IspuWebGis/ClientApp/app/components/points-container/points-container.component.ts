import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { Point } from "../../classes/point";
import { AppComponent } from '../app/app.component';
import {GeocoderService} from "../../services/geocoder.service";

import {GeocodeParams} from "../../classes/geocode-params";


@Component({
    selector: 'points-container',
    templateUrl: './points-container.component.html',
    styleUrls: ['./points-container.component.css']
})

export class PointsContainerComponent  {
    @Input() points: Array<Point>; // here array of markers
    @Output() onMakeWay = new EventEmitter<any>();
    constructor(private esriMap: EsriMapService, private appComp: AppComponent, private geocodeService: GeocoderService) { }
        
    makeWay() {
        this.onMakeWay.emit();
    }

    getPointsReverseGeoCode(points: Point[]): Point[] {
        console.log(points.length);
        for (var i = 0; i < points.length; i++) {
            let loc = points[i].latitude + "," + points[i].longitude;
            let param = new GeocodeParams(loc);
            let index = i;
            this.geocodeService.getReverseGeocode(param).subscribe((data) => {
                if (data.address)
                    points[index].address = data.address.ShortLabel;
            });

        }
        return points;
    }

    onRedrawAsked(point: Point) {
        for (var i = 0, l = this.points.length; i < l; i++) {
            if (this.points[i].id == point.id) {               
                this.points[i] = point;
                this.esriMap.updateMarkers(this.points);
                break;
            }
        }
            //this.esriMap.updateMarkers(this.points);
            //this.points = this.getPointsReverseGeoCode(this.points);
        
    }

}