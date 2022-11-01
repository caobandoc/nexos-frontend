import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  myCard: Card = {
    pan: '',
    titular: '',
    cedula: '',
    telefono: '',
    estado: ''
  }

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit(): void {
    this.cardService.card$.subscribe(
      card => {
        this.myCard = card;
      }
    );
  }

}
