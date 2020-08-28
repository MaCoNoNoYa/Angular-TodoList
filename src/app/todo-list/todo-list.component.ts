import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public tasks: Task[];
  constructor(private taskService: TaskService) { }

  public ngOnInit(): void {
    this.updateTasks();
  }
  /**
   * subscribed zur Servicefunktion um die Tasks zu akktualisieren.
   */
  public updateTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
  /**
   * Reagiert sobald der Task als erledigt markiert wurde und streicht es durch falls markiert und nimmt die Markierung weg falls nicht markiert.
   * @param element Gibt das Element mit, von welchem das Event aufgerufen wurde.
   * @param id Id des Listenelementes, in welchem sich der Task befindet
   */
  public checkDone(element: HTMLInputElement, id: string): void {
    if (element.checked) {
      console.log(id);
      document.getElementById(id).style.textDecoration = 'line-through';
    }
    else {
      document.getElementById(id).style.textDecoration = 'none';
    }
  }
  /**
   * gibt dem Service die ID des Elements mit, sodass der dazugehörige Task gelöscht werden kann.
   * @param id Id des zu löschenden Elementes
   */
  public deleteTask(id: number) {
    this.taskService.deleteTask(id);

  }

}
