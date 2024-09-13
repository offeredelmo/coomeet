import { Types } from "mongoose";
declare class Time {
    hours: number;
    minutes: number;
}
export declare class CreateReviewInput {
    user_id: Types.ObjectId;
    recipe_id: Types.ObjectId;
    starst: number;
    time: Time;
}
export {};
