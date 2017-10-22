import { Component, Input } from '@angular/core';

import { Point } from "../../classes/point";

@Component({
    selector: 'points-container',
    templateUrl: './points-container.component.html',
    styleUrls: ['./points-container.component.css']
})
export class PointsContainerComponent {
    @Input() points: Array<Point>;

    addPoint() {
    }
}