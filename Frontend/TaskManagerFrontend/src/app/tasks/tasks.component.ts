import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { Task } from '../models/Task';
import { AuthService } from '../services/auth.service';
import { MatTableModule } from '@angular/material/table'  
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'status', 'dueDate', 'actions'];

  constructor(private authService: AuthService, private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res.data);
          this.tasks = res.data.map((item: { id: number; title: string; description: string; status: number; dueDate: string; }) => new Task(item.id, item.title, item.description, item.status, item.dueDate));
          console.log(this.tasks);
              
        }
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      }
    });
  }

  public getStatusLabel(statusNum: number): string{
    switch (statusNum) {
      case 0:
        return "To do"  
      case 1:
        return "In progress" 
      case 2:
        return "Complete"  
      case 3:
        return "Blocked"
      case 4:
        return "Cancelled"    
      default:
        return "N/A"
    }
  }

  logout() {
    this.authService.logout();
  }

  addTask() {
    console.log('Add Task Clicked');
  }



}


  
