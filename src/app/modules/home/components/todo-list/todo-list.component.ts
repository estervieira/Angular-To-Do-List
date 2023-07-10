import { TaskList } from './../../model/task-list';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck{

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("List") || '[]');

  constructor() {}

  ngDoCheck(): void {
    this.setLocalStorage();
  }

  public setEmitTaskList(event: string){
    this.taskList.push({task: event, checked: false})
  }

  public deleteItemTask(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm("Você deseja realmente Deletar tudo?");
    if(confirm){
      this.taskList = [];
    }
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja Deletar?");

      if(confirm){
        this.deleteItemTask(index);
      }
    }
  }

  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("List", JSON.stringify(this.taskList));
    }
  }

}
