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
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

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
  displayedColumns: string[] = ['title', 'description', 'status', 'dueDate', 'actions'];

  constructor(private authService: AuthService, private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        if (res.success) {
          this.tasks = res.data.map((item: { id: number; title: string; description: string; status: number; dueDate: string; }) => new Task(item.id, item.title, item.description, item.status, item.dueDate + 'Z'));              
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
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px'
    });
  
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.taskService.createTask(res.title, res.description, Number(res.status), res.dueDate).subscribe({
          next: (res) => {
            if (res.success) {
              this._snackBar.open('Task successfully created!', 'X', { duration: 3000 });          
              this.loadTasks(); 
            }
          },
          error: (error) => {
            this._snackBar.open('There was an issue whilst creating this task', 'X', { duration: 3000 });        
            console.error('Error fetching tasks', error);
          }
        });
      }
    });  
  }

  editTask(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;
  
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        this.taskService.updateTask(taskId, res.title, res.description, Number(res.status), res.dueDate).subscribe({
          next: (res) => {
            if (res.success) {
              this._snackBar.open('Task successfully updated!', 'X', { duration: 3000 });          
              this.loadTasks(); 
            }
          },
          error: (error) => {
            this._snackBar.open('There was an issue whilst updating this task', 'X', { duration: 3000 });        
            console.error('Error fetching tasks', error);
          }
        });
      }
    });
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
              this._snackBar.open('Task successfully deleted!', 'X', { duration: 3000 });          
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


  
