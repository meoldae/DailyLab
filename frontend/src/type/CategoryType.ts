export type CategoryType = {
    name: string;
    categoryId? : number;
}

export type CategoryTreeType = {
    name : string;
    list : [{
        name : string;
        list : CategoryType[];
    }]
}