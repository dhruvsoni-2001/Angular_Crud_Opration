export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  taskId: number;
  //projectName: string; // Add a new property to hold project name
  tasks: {
    id: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    projectId: number;
    project?: {
      id: number;
      name: string;
      description: string;
      startDate: Date;
      endDate: Date;
    };
  };
}
