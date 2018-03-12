import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];

  constructor(private toDoService: TodoService) { }

  ngOnInit() {
    this.toDoService.getToDoList().snapshotChanges().subscribe( item =>{
      this.toDoListArray = [];
      item.forEach( element => {
        var x = element.payload.toJSON();
        x["$key"] = element.key;
        this.toDoListArray.push(x);
      })
    });
  }

  onAdd(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  toggleCheck($key: string, isChecked){
    this.toDoService.toggleTitle($key, !isChecked);
  }


  onDelete($key: string, event){
    event.stopPropagation()
    this.toDoService.removeTitle($key);
  }

  keyPressListener(event, itemTitle){
    // keyCode == 13 == ENTER KEY
    if(event.keyCode == 13) {
      this.onAdd(itemTitle)
    }
  }

}
