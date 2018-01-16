import { Component, OnInit, HostListener } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { CoordinatesService } from '../../services/coordinates.service';
import { Point } from "../../classes/point";
import { Task } from "../../classes/task";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    points: Array<Point> = [];
    task: Task;

    mapInnerHeight: string;
    pointsContainer: HTMLElement | null;

    center: __esri.PointProperties = {
        longitude: 40.971,
        latitude: 56.997,
    };


    centerChange(point: __esri.Point) {
        console.log('Center of map was changed: ' + '[longitude: ' + point.longitude + ', latitude: ' + point.latitude + ']');
    }

    addPoint(point: Point) {
        var id = 0;
        this.points.map(p => id = Math.max(p.id, id));
        point.id = id + 1
        this.points.push(point);
        console.log("Added point");
        //console.log(this.points.length);
        //this.mapService.updateMarkers(this.points);
        //this.mapService.connectMarkers(this.points);
    }

    /**
     * Setting with fakes
     */
    ngOnInit() {
        this.points = [];
        this.points.push(new Point(0, 40.971, 56.997));
        this.points.push(new Point(1, 41.071, 57.097));
        this.points.push(new Point(2, 40.871, 56.897));

        let footer = document.getElementById("points-container");
        if (footer != null) this.pointsContainer = <HTMLElement | null>(footer.firstChild);

        window.onresize = this.onWindowResize;
        this.onWindowResize();
    }

    constructor(
        private mapService: EsriMapService,
        private coordinatesService: CoordinatesService) {
    }

    private onWindowResize() {
        if (this.pointsContainer != null) {
            let footerHeight = +this.pointsContainer.clientHeight;
            this.mapInnerHeight = (window.innerHeight - footerHeight).toString();
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        if (this.pointsContainer != null) {
            let footerHeight = +this.pointsContainer.clientHeight;
            this.mapInnerHeight = (window.innerHeight - footerHeight).toString();
            if (+this.mapInnerHeight > window.innerHeight) {
                this.mapInnerHeight = window.innerHeight.toString();
            }
        }
    }

    onTaskChanged(task: Task) {
        this.points = task.points;
        this.mapService.connectClientPoints(task.checkpoints)
            .then(() => {
                this.coordinatesService.convert(task.points);
            });
    }
}