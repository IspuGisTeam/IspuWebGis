export class GeocodeParams {
    location: string;
    format: string;

    constructor(location: string, respType: string = "pjson") {
        this.location = location;
        this.format = respType;
    }
}

export class ReverseGeocodeParams {
    public spatialReference: Object;
    constructor(public x: number, public y: number) {
        this.spatialReference = { "wkid": 3857 };
    }
}