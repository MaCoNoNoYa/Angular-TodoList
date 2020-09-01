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
  private loaded = false;
  constructor(private taskService: TaskService) { }

  public ngOnInit(): void {
    if (this.taskService.subsVar === undefined) {
      this.taskService.subsVar = this.taskService.
        invokeFirstComponentFunction.subscribe((name: string) => {
          this.updateTasks();
        });
    }
    this.updateTasks();
  }

  public ngAfterViewInit(): void {
    this.checkOffDoneTasks();
  }
  /**
   * Tested ob die Tasks als Done markiert wurden.
   */
  public checkOffDoneTasks(): void {
    this.tasks.forEach(task => {
      console.log(task.done);
      console.log(task.task);
      if (task.done) {
        const id = (task.id).toString();
        document.getElementById(id).style.textDecoration = 'line-through';
        document.getElementById(task.task).click();
      }
    });
    this.loaded = true;
  }
  /**
   * subscribed zur Servicefunktion um die Tasks zu akktualisieren.
   */
  public async updateTasks(): Promise<void> {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
    if (this.loaded) {
      await this.delay(1);
      this.checkOffDoneTasks();
    }
    console.log(this.tasks);
  }
/**
 * Verzögert Ablauf um bestimmte Zeitdauer
 * @param ms Anzahl der ms um welche das Programm verzögert wird
 */
  delay(ms: number): Promise<string>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  /**
   * Reagiert sobald der Task als erledigt markiert wurde,
   * streicht es durch falls markiert,
   * nimmt die Markierung weg falls nicht markiert.
   * @param element Gibt das Element mit, von welchem das Event aufgerufen wurde.
   * @param id Id des Listenelementes, in welchem sich der Task befindet
   */
  public checkDone(element: HTMLInputElement, id: string): void {
    var idNum = parseInt(id);
    if (element.checked) {
      document.getElementById(id).style.textDecoration = 'line-through';
      this.taskService.markAsDone(idNum);
    }
    else {
      document.getElementById(id).style.textDecoration = 'none';
      this.taskService.markAsToDo(idNum);
    }
  }
  /**
   * gibt dem Service die ID des Elements mit, sodass der dazugehörige Task gelöscht werden kann.
   * @param id Id des zu löschenden Elementes
   */
  public deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks.splice(id - 1, 1);
    this.tasks.forEach(task => {
      if (task.id > id) {
        task.id = task.id - 1;
      }
    });
  }

}
