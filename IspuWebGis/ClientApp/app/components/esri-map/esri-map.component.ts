import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { EsriMapService } from '../../services/esri-map.service';
import { Subscription } from "rxjs/Subscription";
import { Point } from "../../classes/point";

@Component({
    selector: 'esri-map',
    templateUrl: './esri-map.component.html',
    styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

    @ViewChild('map') mapRef: ElementRef;
    @Input() center: __esri.PointProperties;
    @Output() centerChange: EventEmitter<__esri.Point> = new EventEmitter<__esri.Point>();
    @Output() addPoint: EventEmitter<Point> = new EventEmitter<Point>();

    @Input() points: Array<Point>;

    private _mapViewProperties: __esri.MapViewProperties;
    private _observableSubscriptions: Subscription[] = [];

    constructor(private esriMapService: EsriMapService) { }

    ngOnInit() {
        this._initializeMap();
    }

    ngOnDestroy() {
        this._observableSubscriptions.forEach((s) => s.unsubscribe());
    }

    private _initializeMap() {
        this._mapViewProperties = {
            container: this.mapRef.nativeElement,
            center: this.center
        };

        this.esriMapService.createMap(this._mapViewProperties)
            .then(() => {
                console.log('MapView is loaded');
                this._handleMapCenterChange();
            })
            .then(() => {
                this.esriMapService
                    .subscribeToMapEvent<__esri.MapViewClickEvent>('click')
                    .subscribe((e: __esri.MapViewClickEvent) => {
                        this.esriMapService.addMarker(e.mapPoint.latitude, e.mapPoint.longitude)
                            .then((p) => {
                                this.addPoint.emit(p);
                            })
                    });
            });
    }

    private _handleMapCenterChange() {
        const subscribe = this.esriMapService.subscribeToMapEvent<__esri.MapViewDragEvent>('drag').subscribe(() => {
            this.esriMapService.getCenter().then((center: __esri.Point) => {
                this.center = center;
                this.centerChange.emit(center);
            });
        });
        this._observableSubscriptions.push(subscribe);
    }
}