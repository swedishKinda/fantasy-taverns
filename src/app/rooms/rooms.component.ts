import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService, IUser } from '../common/auth/auth.service';
import { TavernService, IRoom } from '../tavern-services/tavern.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
})
export class RoomsComponent implements OnInit {

  room: IRoom;
  tavernName: string;
  roomName: string;
  dailyRate: number;

  constructor() { }

  ngOnInit() {
  }

}
