import { Point } from "./point";

export class Task {
    //time: Date;
    //route: geometry;
    //isFavorite: boolean;
    //mode: string;

    constructor(public id: number, public userId: number, public name: string, public points: Point[]) {
    }
}