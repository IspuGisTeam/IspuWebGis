import { Component, Input, OnInit } from '@angular/core';

import { GeocoderService } from "../../services/geocoder.service";
import { Point } from "../../classes/point";
import { GeocodeParams } from "../../classes/geocode-params";

@Component({
    selector: 'point-item',
    templateUrl: './point-item.component.html',
    styleUrls: ['./point-item.component.css']
})
export class PointItemComponent implements OnInit {
    @Input() point: Point;

    constructor(private _geocodeService: GeocoderService) {    
    }

    ngOnInit() {
    }

    solveGeocoding() {
        let params = new GeocodeParams(this.point.address);
        this._geocodeService.getGeocode(params).subscribe((resp: any) => {
            let res = JSON.parse(resp["_body"]);

            /// TODO: do real business
        });
    }
}