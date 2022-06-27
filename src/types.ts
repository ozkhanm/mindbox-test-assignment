export const enum FilterName {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed"
};

export interface ITask {
    text: string;
    isFinished: boolean;
    id: number;
};