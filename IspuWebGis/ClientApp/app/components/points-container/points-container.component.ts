import { Component, Input, OnChanges } from '@angular/core';
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

export class PointsContainerComponent implements OnChanges  {
    @Input() points: Array<Point>; // here array of markers
    constructor(private esriMap: EsriMapService, private appComp: AppComponent, private geocodeService: GeocoderService) { }

    async generatePoints() { 

        // Deleted!!!
        
        //var x = <number>this.appComp.center.longitude;
        //var y = <number>this.appComp.center.latitude;
        //var points = await this.esriMap.addMarkers(x, y); // array of three markers` points (type: Point)
        //var geocoded_points = this.getPointsReverseGeoCode(points);
        //this.points.length = 0;
        //geocoded_points.forEach(p => this.points.push(p));
    }

    ngOnChanges() {

        //if (this.points) {
        //    var geocoded_points = this.getPointsReverseGeoCode(this.points);
        //    this.points.length = 0;
        //    geocoded_points.forEach(p => this.points.push(p));
        //}
    }

    async makeWay() {
        console.log(this.points.length);
        this.esriMap.connectMarkers(this.points);
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