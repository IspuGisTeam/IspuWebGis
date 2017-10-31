import { Component, Input } from '@angular/core';
import { EsriMapService } from '../esri-map/esri-map.service';
import { Point } from "../../classes/point";
import { AppComponent } from '../app/app.component';

@Component({
    selector: 'points-container',
    templateUrl: './points-container.component.html',
    styleUrls: ['./points-container.component.css']
})

export class PointsContainerComponent {
    @Input() points: Array<Point>; // here array of markers
    constructor(private esriMap: EsriMapService, private appComp: AppComponent) { }

    async addPoint() { 
        var x = <number>this.appComp.center.longitude;
        var y = <number>this.appComp.center.latitude;
        this.points = await this.esriMap.addMarkers(x, y); // array of three markers` points (type: Point)
    }
}