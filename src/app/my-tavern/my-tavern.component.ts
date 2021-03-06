import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService, IUser } from '../common/auth/auth.service';
import { TavernService, IMyTavern} from '../tavern-services/tavern.service';

@Component({
  selector: 'app-my-tavern',
  templateUrl: './my-tavern.component.html',
})

export class MyTavernComponent implements OnInit {

  tavern: IMyTavern[];
  mytavern: IMyTavern;
  tavernName: string;
  roomName: string;
  dailyRate: number;

  constructor(private tavernService: TavernService, private authService: AuthService) { }

  ngOnInit(): void {
    this.tavernService.getTavern().subscribe((tavernList) => {
      this.tavern = tavernList;
      this.tavernName = this.tavern[0].TavernName;
      this.roomName = this.tavern[0].RoomName;
      this.dailyRate = this.tavern[0].DailyRate;
    });
  }
}
      
