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

    potentialAddresses: Point[];

    constructor(private _geocodeService: GeocoderService) {
        this.potentialAddresses = [];
    }

    ngOnInit() {
    }

    /**
     * Returns ID of HTML datalist tag that stores list of potentioal addresses
     */
    collectionId() {
        return `potentialAddresses${this.point.id}`;
    }

    /**
     * Executes forward geocoding
     * @param ev Name of street should be geocoded
     */
    solveGeocoding(ev: any) {
        var selectedIndex = this.potentialAddresses.map(pa => pa.address).findIndex(addr => addr === ev);
        if (selectedIndex !== -1) {
            this.point = this.potentialAddresses[selectedIndex];
        }

        this.potentialAddresses = [];
        let params = new GeocodeParams(this.point.address);
        this._geocodeService.getGeocode(params).subscribe((resp: any) => {
            let res = JSON.parse(resp["_body"]);

            let candidates = res["candidates"];
            for (var i = 0; i < candidates.length; i++) {
                let c: any = candidates[i];
                let p: Point = new Point(this.point.id, c.location.x, c.location.y, c.address);
                let savedAlready: boolean =
                    this.potentialAddresses.findIndex((p1) => p1.address === p.address) !== -1;
                if (!savedAlready) {
                    this.potentialAddresses.push(p);
                }
            }
        });
    }
}