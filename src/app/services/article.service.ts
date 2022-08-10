import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArticleInterface } from '../inerfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) {

  }

  findAll(): Observable<ArticleInterface[]> {
    return this.http
      .get<ArticleInterface[]>(`${environment.backendUrl}/articles`);
  }

  findOneById(id: string): Observable<ArticleInterface> {
    return this.http
      .get<ArticleInterface>(`${environment.backendUrl}/articles/${id}`);
  }

  create(article: ArticleInterface) {
    return this.http
      .post(`${environment.backendUrl}/articles`, article, { observe: 'response', responseType: 'text' });
  }

  edit(article: ArticleInterface) {
    return this.http
      .put(`${environment.backendUrl}/articles/${article._id}`, article, { observe: 'response', responseType: 'text' });
  }

  delete(article: ArticleInterface) {
    return this.http
      .delete(`${environment.backendUrl}/articles/${article._id}`, { observe: 'response', responseType: 'text' });
  }
}
