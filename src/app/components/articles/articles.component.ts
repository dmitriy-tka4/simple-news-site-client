import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles$: Observable<ArticleInterface[]>;
  isLoading: boolean = true;

  constructor(
    private articleService: ArticleService,
    private toastrService: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.articles$ = this.articleService.findAll().pipe(
      tap(() => {
        this.isLoading = false;
      }),
      catchError((error) => { // локальный отлов ошибки, чтобы убрать прелоадер и показать пустой массив
        this.isLoading = false;
        console.log('findAll', error);
        return of([]); // return Observable
      })
    );
  }
}
