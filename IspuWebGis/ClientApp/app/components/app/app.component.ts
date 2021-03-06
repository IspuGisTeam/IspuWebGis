import { Component, OnInit, HostListener } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { CoordinatesService } from '../../services/coordinates.service';
import { GeocoderService } from '../../services/geocoder.service';
import { Point } from "../../classes/point";
import { GeocodeParams } from "../../classes/geocode-params";
import { Task } from "../../classes/task";
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {    
    task: Task;
    isModalShown: boolean = false;

    mapInnerHeight: string;
    pointsContainer: HTMLElement | null;

    center: __esri.PointProperties = {
        longitude: 40.971,
        latitude: 56.997,
    };


    centerChange(point: __esri.Point) {
        console.log('Center of map was changed: ' + '[longitude: ' + point.longitude + ', latitude: ' + point.latitude + ']');
    }

    get points(): Array<Point> {
        if (this.task) {
            return this.task.points;
        }
        return new Array<Point>();
    }

    showModal() {
        this.isModalShown = true;
    }

    hideModal() {
        this.isModalShown = false;
    }

    addPoint(point: Point) {
        var id = 0;
        this.points.map(p => id = Math.max(p.id, id));
        point.id = id + 1
        this.points.push(point);
        
        this.geocoderService.getReverseGeocodeByPoint(point)
        .subscribe((data) => {
            if (data.address)
                point.address = data.address.ShortLabel;
        });
    }

    /**
     * Setting with fakes
     */
    ngOnInit() {
        let footer = document.getElementById("points-container");
        if (footer != null) this.pointsContainer = <HTMLElement | null>(footer.firstChild);

        window.onresize = this.onWindowResize;
        this.onWindowResize();
    }

    constructor(
        private mapService: EsriMapService,
        private geocoderService: GeocoderService,
        private coordinatesService: CoordinatesService,
        private taskService: TaskService) {
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
        this.task = task;
        //this.makeWay();
    }

    onMakeWay() {
    };

    
}