import { Component , DoCheck } from '@angular/core';

@Component({
  selector: 'my-taverns',
  templateUrl: './taverns.service.html'
//   styleUrls: [ './app.component.css' ]
})
export class TavernsComponent {
  name = 'Angular 5';
  Taverns = [{
    Id:1,
    Name:"John's Tavern"
  },
  {
    Id:2,
    Name:"Moe's Tavern"
  },
  {
   Id:3,
    Name:"Kate's Tavern"
  }];
  selected:any ;

}