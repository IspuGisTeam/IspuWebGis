 import { Injectable } from '@angular/core';
 import { Http } from '@angular/http';

 import { GeocodeParams } from "../classes/geocode-params";

 import 'rxjs/Rx';

 @Injectable()
 export class GeocoderService {
     private readonly GEOCODE_URL: string = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates";

     constructor(private http: Http) {
     }

     getGeocode(paramsGeocoding: GeocodeParams) {
         let link = this.GEOCODE_URL +
             `?City=Иваново&Region=Ивановская область` +
             `&Address=${paramsGeocoding.location}&f=${paramsGeocoding.format}` +
             `&category=&outFields=*&forStorage=false`;
         return this.http.get(link);
     }

     private handleError(error: any): Promise<any> {
         console.error('Error', error); // for demo purposes only
         return Promise.reject(error.message || error);
     }
 }