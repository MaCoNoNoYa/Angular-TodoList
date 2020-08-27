import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
    tasks: Task[];
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void{
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
  checkDone(event, id) {
    if ( event.target.checked ) {
        console.log(id);
        document.getElementById(id).style.textDecoration = 'line-through';
   }
   else{
    document.getElementById(id).style.textDecoration = 'none';
   }
}
deleteTask(id){
  this.tasks.splice(id - 1, 1);
  this.tasks.forEach(task => {
    if(task.id > id){
      task.id = task.id - 1;
    }
  });

  console.log(id);
}

}
