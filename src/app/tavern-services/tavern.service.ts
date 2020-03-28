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

export interface IRoom {
    RoomName: string;
    DailyRate: number;
    ID: number;
}

@Injectable({
    providedIn: 'root'
})

export class TavernService {

    constructor(private http: HttpClient) { }

    getTaverns(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>('http://localhost:3000/taverns');
    }

    getTavern(): Observable<IMyTavern[]> {
        return this.http.get<IMyTavern[]>(`http://localhost:3000/mytavern`);
    }

    getById(id: number): Observable<IRoom> {
        return this.http.get<IRoom>(`http://localhost:3000/rooms/${id}`);
    }

    saveRoom(room: IRoom): Observable<IRoom> {
        const isEdit = room.ID > 0;
        if (isEdit) {
            return this.http.put<IRoom>(`http://localhost:3000/rooms/${room.ID}/`, room);
        } else {
            return this.http.post<IRoom>('http://localhost:3000/rooms', room);
        }
    }

}