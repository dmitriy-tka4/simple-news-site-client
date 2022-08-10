import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: ArticleInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
  ) {

  }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = routeParams.get('_id');

    if (id) {
      this.articleService.findOneById(id).subscribe((data) => {
        this.article = data;
      });
    }
  }
}
