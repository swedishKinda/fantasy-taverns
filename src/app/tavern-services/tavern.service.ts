import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ITavern {
    ID: number;
    TavernName: string;
}

export interface IMyTavern {
    TavernName: string;
    RoomName: string;
    DailyRate: number;
    ID: number;
    TavernID: number;
    RoomStatus: number;
}

@Injectable({
    providedIn: 'root'
})

export class TavernService {

    constructor(private http: HttpClient) { }

    getTaverns(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>('http://localhost:3000/taverns');
    }
}