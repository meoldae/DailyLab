export type TodoType = {
    todoId: number;
    check: boolean;
    content: string;
    categoryId: number;
    large: string;
    medium: string;
    small: string;
    todoDate?: string;
    checkedDate?: string;
    memberId?: number;
    system: boolean;
    deleted: boolean;
}