import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transaction';
  private myTransactions: Transaction[] = [];

  private transactions = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactions.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  searchTransactions(pan: string){
    this.getTransactions(pan).subscribe(
      transactions => {
        this.myTransactions = transactions;
        this.transactions.next(transactions);
      },
      error => {
        console.log(error);
      }
    );
  }

  getTransactions(pan: string){
    return this.http.get<Transaction[]>(`${this.apiUrl}/${pan}`);
  }
}
