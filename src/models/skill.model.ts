export interface Skill {
    [index : string] : string | number | undefined
    _id? : string,
    title : string,
    votes : number
}