import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { Tasks } from './mock-tasks';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { isNull } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'savedTasks';
  private localStorageCounter = 'counterkey';
  private counter = this.loadCounter();
  constructor() { }
  public getTasks(): Observable<Task[]> {
    return of(this.loadTasks());
  }
/**
 * fügt Task dem Array hinzu
 * @param title Titel des Tasks des Tasks
 */
  public addTask(title: string): void {
    if (this.counter && this.counter > 0) {
      this.counter = this.counter + 1;
    }
    else{
      this.counter = 1;
    }
    let tasks = this.loadTasks();
    if (tasks && tasks.length > 0) {
      tasks.push({
        id: this.counter,
        task: title,
        done: false
      });
    }
    else {
      tasks = [{ id: this.counter, task: title, done: false }];
    }
    console.log(this.counter);
    this.saveTasks(tasks);
  }
/**
 * Speichert die Tasks in den lokalen Speicher
 * @param tasks gibt das Taks-Array mit, in welchem sich alle Tasks befinden.
 */
  private saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
    localStorage.setItem(this.localStorageCounter, JSON.stringify(this.counter));
  }
/**
 * gibt die lokal gespeicherten Tasks zurück
 */
  private loadTasks(): Task[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey));
  }
/**
 * gibt den lokal gespeicherten Counter zurück
 */
  private loadCounter(): number {
    return JSON.parse(localStorage.getItem(this.localStorageCounter));
  }
/**
 * löscht den Task aus dem Array und speicher das neue Array anschliessend wieder ab
 * @param id Id des Tasks, welcher gelöscht werden soll.
 */
  public deleteTask(id : number) : void{
    if (this.counter && this.counter > 0) {
      this.counter = this.counter - 1;
    }
    else{
      this.counter = 0;
    }
    let tasks = this.loadTasks();
    tasks.splice(id - 1, 1);
    tasks.forEach(task => {
    if (task.id > id){
      task.id = task.id - 1;
    }
  });
    console.log(id);
    this.saveTasks(tasks);
}

}


