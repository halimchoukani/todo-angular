import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task';
import { Task } from '../model/task';
import { TasksAdd } from '../tasks-add/tasks-add';
import { TasksEdit } from '../tasks-edit/tasks-edit';

@Component({
  selector: 'app-tasks-list',
  imports: [TasksAdd, TasksEdit],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList implements OnInit {
  tasks: Task[] = [];
  action = '';
  selectedTask: Task | null = null;
  constructor(private taskService: TaskService) {}

  setAction(action: string, taskId?: number) {
    this.action = action;
    if (taskId) {
      const task = this.taskService.getTaskById(taskId);
      if (task) {
        this.selectedTask = task;
      } else {
        this.selectedTask = null;
        this.action = '';
        return;
      }
    }
  }
  deleteTask(id: number) {
    if (this.selectedTask && this.selectedTask.id === id) {
      this.selectedTask = null;
      this.action = '';
    }
    confirm('Are you sure?') && this.taskService.deleteTask(id);
  }
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.taskService.tasksUpdated.subscribe((tasks) => (this.tasks = tasks));
  }
}
