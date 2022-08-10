import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss']
})
export class ArticleCreateComponent implements OnInit {
  isSuccess: boolean;

  createForm = this.formBuilder.group({
    title: '',
    content: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.articleService.create(this.createForm.value as ArticleInterface)
      .subscribe((response) => {
        console.log(response);
        this.isSuccess = true;
        this.createForm.reset();
      });
  }
}
