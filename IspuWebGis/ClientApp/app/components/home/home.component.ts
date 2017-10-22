import { Component } from '@angular/core';
import { EsriMapService } from '../esri-map/esri-map.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    constructor(private esriMap: EsriMapService) { }

    public center: __esri.PointProperties = {
        longitude: 40.971,
        latitude: 56.997,
    };
  
    centerChange(point: __esri.Point) {
        console.log('Center of map was changed: ' + '[longitude: ' + point.longitude + ', latitude: ' + point.latitude + ']');
    };
    
    createMarkers() {
        var x = <number>this.center.longitude;
        var y = <number>this.center.latitude;
        var arrayOfCoordinates = this.esriMap.addMarkers(x, y); // array of three markers` coordinates (3 x 2)
    }
}


