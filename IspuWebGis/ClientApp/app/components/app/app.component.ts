import { Component, OnInit, HostListener } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    points: Array<String>

    mapInnerHeight: string;
    pointsContainer: HTMLElement | null;

    center: __esri.PointProperties = {
        longitude: 40.971,
        latitude: 56.997,
    };


    centerChange(point: __esri.Point) {
        console.log('Center of map was changed: ' + '[longitude: ' + point.longitude + ', latitude: ' + point.latitude + ']');
    }

    /**
     * Setting with fakes
     */
    ngOnInit() {
        this.points = [];
        for (var i = 0; i < 15; i++) {
            this.points.push(`Point # ${i}`);
        }

        let footer = document.getElementById("points-container");
        if (footer != null) this.pointsContainer = <HTMLElement | null>(footer.firstChild);

        window.onresize = this.onWindowResize;
        this.onWindowResize();
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
}