import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task';
import { Task } from '../model/task';
import { TasksAdd } from "../tasks-add/tasks-add";

@Component({
  selector: 'app-tasks-list',
  imports: [TasksAdd],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css'
})
export class TasksList implements OnInit {
  tasks : Task[] = [];
  action = "";

  constructor(private taskService : TaskService){}
  
  setAction(action : string){
    this.action = action;
  }
  
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.taskService.tasksUpdated.subscribe(
      tasks => this.tasks = tasks
    )
  }

}
