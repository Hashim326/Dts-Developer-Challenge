import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-task-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTimepickerModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
  providers:[{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, provideNativeDateAdapter()]
})
export class TaskDialogComponent {
  taskForm: FormGroup;
  isEditMode = false;
  minDate: Date = new Date();
  minTime: Date = new Date();

  statusValues = [
    {value: 0, viewValue: 'To do'},
    {value: 1, viewValue: 'In progress'},
    {value: 2, viewValue: 'Complete'},
    {value: 3, viewValue: 'Blocked'},
    {value: 4, viewValue: 'Cancelled'},
  ]

  selectedStatus = 0;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task },
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data?.task;

    if(data?.task?.status){
      this.selectedStatus = data?.task?.status;
    }

    this.taskForm = this.fb.group({
      title: [data?.task?.title || '', Validators.required],
      description: [data?.task?.description || '', Validators.required],
      status: [this.selectedStatus, Validators.required],
      dueDate: [data?.task?.dueDate ? new Date(data.task.dueDate) : new Date(), Validators.required],
      dueTime: [data?.task?.dueDate ? new Date(data.task.dueDate) : new Date(), Validators.required]
    });

  }

  saveTask() {
    const dueDateObj = this.taskForm.get("dueDate")?.value
    const dueTimeObj = this.taskForm.get("dueTime")?.value

    const newDate = new Date(
      dueDateObj.getFullYear(),
      dueDateObj.getMonth(),
      dueDateObj.getDate(),
      dueTimeObj.getHours(),
      dueTimeObj.getMinutes(),
      dueTimeObj.getSeconds(),
      dueTimeObj.getMilliseconds()
    );

    this.taskForm.patchValue({dueDate: newDate})

    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      this.dialogRef.close({
        ...this.data?.task,
        ...formValue      
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
