import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    todos: Todo[];

    constructor(private todoService: TodoService,
                private alertController : AlertController) { }
   
    ngOnInit(){
      this.todoService.getTodos().subscribe(data => {
        this.todos = data;
      });
    }

    deleteTodo(item){ 
      console.log('clicked')
      this.presentConfirm(item);
    //this.todoService.removeTodo(item.id); 
    }
    async presentConfirm(item) {
      const alert = await this.alertController.create({
        header: 'Confirm!',
        message: 'Do you really want to delete ' + item.task + ' ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: ' + item.task);
            }
          }, {
            text: 'Okay',
            handler: () => {
              this.todoService.removeTodo(item.id);
            }
          }
        ]
      });
  
      await alert.present();
    }
    
}
