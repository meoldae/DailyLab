export type HobbyType = {
    hobbyId : number,
    category : string,
    hobbyName : string,
}

export type HobbyTreeType = {
    category : string,
    list : HobbyType[],
}