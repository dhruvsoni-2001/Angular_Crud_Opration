export interface Tasks {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    projectId: number;
    project?: 
    { 
        id: number; 
        name: string;
        description: string;
        startDate: Date;
        endDate: Date;
    };
}