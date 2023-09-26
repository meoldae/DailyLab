export type TodoType = {
    todoId: number;
    check: boolean;
    content: string;
    categoryId: number;
    large: string;
    medium: string;
    small: string;
    system: boolean;
    deleted: boolean;
    updateStatus?: boolean;
    todoDate?: string;
    checkedDate?: string;
    memberId?: number;
}

export type TodoParamType = {
    todoId? : number;
    checkedDate?: string;
    categoryId? : number;
    content? : string;
    todoDate? : string;
    isSystem? : number;
}