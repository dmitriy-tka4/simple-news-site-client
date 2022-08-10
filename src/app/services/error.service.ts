import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage$ = new Subject<string | null>()

  constructor() { }

  handleError(errorMessage: string) {
    this.errorMessage$.next(errorMessage);
  }

  clearError() {
    this.errorMessage$.next(null);
  }
}
