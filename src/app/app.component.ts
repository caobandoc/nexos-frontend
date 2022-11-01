import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from './services/card.service'
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cardForm!: FormGroup;
  submitted = false;

  constructor(
    private cardService: CardService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      pan: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(19)]]
    });

  }

  get f() {
    return this.cardForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.cardForm.invalid) {
      return;
    }

    this.cardService.searchCard(this.cardForm.value.pan);
    this.transactionService.searchTransactions(this.cardForm.value.pan);
  }
}
