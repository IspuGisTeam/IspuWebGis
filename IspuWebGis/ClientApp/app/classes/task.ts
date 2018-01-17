import { Point } from "./point";
import { ClientPoint } from "./clientPoint";

export class Task {
    //time: Date;
    //route: geometry;
    //isFavorite: boolean;
    //mode: string;

    constructor(public taskId: number, public UserId: number, public name: string,
        public time: Date, public points: Point[]) {
    }
}