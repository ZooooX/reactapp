import { Skill } from "./skill.model";

export interface Wilder {
    _id? : string,
    name : string,
    city : string,
    skills : Skill[]
}