import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {
  createForm = this.formBuilder.group({
    title: '',
    content: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.articleService.create(this.createForm.value as ArticleInterface)
      .subscribe(() => {
        this.toastrService.success('Успешно создано');
        this.createForm.reset();
        this.router.navigate(['/articles']);
      });
  }
}
