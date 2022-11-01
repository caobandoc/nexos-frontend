import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private apiUrl = 'http://localhost:8080/api/card';
  private myCard: Card = {
    pan: '',
    titular: '',
    cedula: '',
    telefono: '',
    estado: ''
  }
  private card = new BehaviorSubject<Card>({
    pan: '',
    titular: '',
    cedula: '',
    telefono: '',
    estado: ''
  });

  card$ = this.card.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  searchCard(pan: string){
    this.getCard(pan).subscribe(
      card => {
        this.myCard = card;
        this.card.next(card);
      },
      error => {
        console.log(error);
      }
    );
  }

  getCard(pan: string){
    return this.http.get<Card>(`${this.apiUrl}/${pan}`);
  }
}
