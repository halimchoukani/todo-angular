import { Component, Input } from '@angular/core';
import { Task } from '../model/task';
import { TaskService } from '../services/task';

@Component({
  selector: 'app-tasks-edit',
  imports: [],
  templateUrl: './tasks-edit.html',
  styleUrl: './tasks-edit.css',
})
export class TasksEdit {
  @Input() selectedTask!: Task | null;
  updatedTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}
  editTask(taskName: string, taskStatus: string) {
    if (this.selectedTask) {
      const updatedTask = new Task(this.selectedTask.id, taskName, taskStatus);

      this.taskService.editTask(updatedTask);
    }
  }
}
