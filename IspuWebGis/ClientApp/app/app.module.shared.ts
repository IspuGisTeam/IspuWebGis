import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { TasksContainerComponent } from './components/tasks-container/tasks-container.component';
import { PointsContainerComponent } from './components/points-container/points-container.component';
import { PointItemComponent } from './components/point-item/point-item.component';
import { EsriLoaderModule } from 'angular-esri-loader';
import { EsriMapService } from './components/esri-map/esri-map.service';
import { EsriMapComponent } from './components/esri-map/esri-map.component';
import { GeocoderService } from './services/geocoder.service';
import { TaskService } from './services/task.service';

@NgModule({
    declarations: [
        AppComponent,
        EsriMapComponent,
        TasksContainerComponent,
        PointsContainerComponent,
        PointItemComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        EsriLoaderModule,
        RouterModule.forRoot([
            { path: '**', redirectTo: '' },
            { path: '', component: AppComponent }
        ])
    ],
    providers: [
        EsriMapService,
        GeocoderService,
        TaskService
    ]
})
export class AppModuleShared {
}
