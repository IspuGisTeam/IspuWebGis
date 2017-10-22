export class GeocodeParams {
    location: string;
    format: string;

    constructor(location: string, respType: string = "pjson") {
        this.location = location;
        this.format = respType;
    }
}