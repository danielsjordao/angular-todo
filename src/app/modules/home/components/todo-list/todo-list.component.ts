import { Component, DoCheck } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() {}

  //qdo o item receber checked vai p o final da lista
  ngDoCheck() {
    this.setLocalStorage();        
  }

  //Adicionar item na Task
  public setEmitTaskList(event: string){
    this.taskList.push({task: event, checked: false})
  }

  //Deleter item da task
  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  //Deletar todos os itens
  public deleteAllTaskList () {
    const confirm = window.confirm("Deseja Deletar Todas Tasks?");
    if (confirm) {
      this.taskList = []
    }    
  }

  //PopUp questionando sobre deletar Task vazia
  public validationInput (event: string, index: number){

    if (!event.length){
      const confirm = window.confirm ("Task está vazia, deseja Deletar?");

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  //Sintetizar o ngDoCheck
  public setLocalStorage () {
    if(this.taskList){
      this.taskList.sort((first, last) => Number (first.checked) - Number (last.checked));
      localStorage.setItem("list", JSON.stringify (this.taskList))
      }
  }
}
