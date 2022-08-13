import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss']
})
export class ArticleEditComponent implements OnInit {
  article: ArticleInterface;
  editForm: FormGroup;

  file: File | null;
  isUploadSuccess: boolean;
  uploadedFileUrl: string;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private uploadService: UploadService
  ) {

  }

  ngOnInit(): void {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = routeParams.get('_id');

    if (id) {
      this.articleService.findOneById(id).subscribe((data) => {
        this.article = data;

        // форму создаем после получения article и заполняем её исходными данными из article
        this.editForm = this.formBuilder.group({
          title: this.article.title,
          content: this.article.content
        });
      });
    }
  }

  onSubmit() {
    const newArticle: ArticleInterface = {
      _id: this.article._id,
      title: this.editForm.value.title,
      content: this.editForm.value.content
    };

    this.articleService.edit(newArticle)
      .subscribe(() => {
        this.toastrService.success('Успешно изменено');
        this.editForm.reset();
        this.router.navigate(['/articles']);
      });
  }

  copyLink(uploadedFileUrl: string): void {
    navigator.clipboard.writeText(uploadedFileUrl)
      .then(() => {
        this.toastrService.success('Ссылка скопирована');
      })
      .catch(err => {
        console.error(err);
        this.toastrService.error('Что-то пошло не так');
      });
  }

  onFileSelected($event: any) {
    this.file = $event.target.files[0];
  }

  upload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.uploadService.upload(formData)
        .subscribe((fileUrl) => {
          this.toastrService.success('Файл успешно загружен');
          this.isUploadSuccess = true;
          this.uploadedFileUrl = fileUrl;
        });
    }
  }

  clear() {
    this.isUploadSuccess = false;
    this.file = null;
  }
}
