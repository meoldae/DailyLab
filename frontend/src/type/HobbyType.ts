export type HobbyType = {
    hobbyId : number;
    category : string;
    hobbyName : string;
    activeStatus?: boolean;
}

export type HobbyTreeType = {
    category : string;
    list : HobbyType[];
}