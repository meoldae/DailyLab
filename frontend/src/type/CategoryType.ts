export type CategoryType = {
    name: string;
    categoryId? : number;
    list? : CategoryType[];
}

export type CategoryKeywordType = {
    name: string;
    large: string;
    categoryId : number;
}