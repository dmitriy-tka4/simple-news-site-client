import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toastrService: ToastrService,
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

  delete() {
    this.articleService.delete(this.article).subscribe(() => {
      this.toastrService.success('Статья удалена');
      this.router.navigate(['/articles']);
    });
  }
}
