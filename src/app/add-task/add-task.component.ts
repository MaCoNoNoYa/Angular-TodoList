import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../task.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output()
  @ViewChild('inputnew') input: ElementRef; 
  public taskAdd: EventEmitter<void> = new EventEmitter();
test: TodoListComponent;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }
/**
 * Fügt Task via Service hinzu
 */
  public addTask(){
    this.taskService.addTask(this.input.nativeElement.value);
    this.taskAdd.emit();
  }
}
