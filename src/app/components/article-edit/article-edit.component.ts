import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  article: ArticleInterface;
  isSuccess: boolean;

  editForm: FormGroup;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {

   }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = routeParams.get('_id');

    if (id) {
      this.articleService.findOneById(id).subscribe((data) => {
        this.article = data;

        this.editForm = this.formBuilder.group({
          title: this.article.title,
          content: this.article.content
        });
      });
    }
  }

  onSubmit() {
    console.log(this.editForm.value);

    const newArticle: ArticleInterface = {
      _id: this.article._id,
      title: this.editForm.value.title,
      content: this.editForm.value.content
    };

    this.articleService.edit(newArticle).subscribe((data) => {
      console.log(data);
      this.isSuccess = true;
      this.editForm.reset();
    });
  }

}
