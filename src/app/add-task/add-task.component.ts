import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../task.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
/**
 * TaskAdd Variable wird erstellt, diese fungiert als EventEmitter.
 */
  public taskAdd: EventEmitter<void> = new EventEmitter();
/**
 * taskService wird im Constructor benötigt, um Funktionen zu nutzen.
 * @param taskService TaskService Instanz
 */
  constructor(private taskService: TaskService) { }
/**
 * Fügt Task via Service hinzu
 */
  public addTask(input: string): void{
    this.taskService.addTask(input);
    this.taskAdd.emit();
  }
}
