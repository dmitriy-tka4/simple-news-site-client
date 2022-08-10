import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { ArticleInterface } from '../inerfaces/article.interface';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {

  }

  findAll(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleInterface[]>('http://localhost:3000/articles')
      .pipe(
        // delay(2000),
        catchError(this.handleError.bind(this))
      );
  }

  findOneById(id: string): Observable<ArticleInterface> {
    return this.http
      .get<ArticleInterface>(`http://localhost:3000/articles/${id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  create(article: ArticleInterface) {
    return this.http
      .post(`http://localhost:3000/articles`, article, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  edit(article: ArticleInterface) {
    return this.http
      .put(`http://localhost:3000/articles/${article._id}`, article, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  delete(article: ArticleInterface) {
    return this.http
      .delete(`http://localhost:3000/articles/${article._id}`)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse) {
    this.errorService.handleError(error.message);

    return throwError(() => { new Error('Запрос завершился с ошибкой') });
  }
}
