import { Point } from "./point";
import { ClientPoint } from "./clientPoint";

export class Task {
    //time: Date;
    //route: geometry;
    //isFavorite: boolean;
    //mode: string;
    public points: Point[];

    constructor(public taskId: number, public UserId: number, public name: string,
        public time: Date, public checkpoints: ClientPoint[]) {
        this.points = checkpoints.map((cp, ind) => {
            return new Point((ind + 1), cp.x, cp.y, "");
        });
        console.log(this);
    }
}