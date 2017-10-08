import { Component, Input } from '@angular/core';

@Component({
    selector: 'points-container',
    templateUrl: './points-container.component.html',
    styleUrls: ['./points-container.component.css']
})
export class PointsContainerComponent {
    @Input() points: Array<String>;

    addPoint() {
        this.points.push(`Added point #${this.points.length}`);
    }
}