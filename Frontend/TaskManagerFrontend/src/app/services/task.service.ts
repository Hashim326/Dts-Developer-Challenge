/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = ' https://localhost:7101/api/task';

  constructor(private http: HttpClient) {}

  public getAllTasks() : Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);
  }

  public getTaskById(taskId: number) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${taskId}`);
  }
  
  public createTask(title: string, description: string, status: number, dueDate: Date ) : Observable<any>{
    const body = {
      title, description, status, dueDate
    }
    return this.http.post<any>(`${this.apiUrl}`, body);
  }

  public updateTask(taskId: number, title: string, description: string, status: number, dueDate: Date ) : Observable<any>{
    const body = {
      title, description, status, dueDate
    }
    return this.http.put<any>(`${this.apiUrl}/${taskId}`, body);
  }

  public deleteTask(taskId: number) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }
}
