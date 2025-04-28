import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task';
import { AuthService } from '../services/auth.service';
import { MatTableModule } from '@angular/material/table'  
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);

  tasks: Task[] = [];
  displayedColumns: string[] = ['title', 'status', 'dueDate', 'actions'];

  constructor(private authService: AuthService, private taskService: TaskService, private dialog: MatDialog) {}

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
        this._snackBar.open('An error occurred whilst loading your tasks', 'X', { duration: 5000 });        
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

  editTask(taskId: number) {
    console.log('Edit task:');
  }

  deleteTask(taskId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        message: 'Are you sure you want to delete this task?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User confirmed delete', taskId);
        
        this.taskService.deleteTask(taskId).subscribe({
          next: (res) => {
            if (res.success) {
              this._snackBar.open('Task deleted successfully!', 'X', { duration: 3000 });          
              this.loadTasks(); 
            }
          },
          error: (error) => {
            this._snackBar.open('There was an issue whilst deleting this task', 'X', { duration: 3000 });        
            console.error('Error fetching tasks', error);
          }
        });

      }
    });  }

}


  
