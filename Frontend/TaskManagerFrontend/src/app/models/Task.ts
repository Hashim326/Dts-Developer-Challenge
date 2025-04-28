export class Task {
    id: number;
    title: string;
    description: string;
    status: number;
    dueDate: Date;
  
    constructor(id: number, title: string, description: string, status: number, dueDate: string) {
        this.id = id
        this.title = title;
        this.description = description;
        this.status = status;
        this.dueDate = new Date(dueDate);
    }
}