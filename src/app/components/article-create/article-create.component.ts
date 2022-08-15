import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleInterface } from 'src/app/inerfaces/article.interface';
import { UploadedFileInterface } from 'src/app/inerfaces/uploaded-file.interface';
import { ArticleService } from 'src/app/services/article.service';
import { UploadService } from 'src/app/services/upload.service';

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

  file: File | null;
  isUploadSuccess: boolean;
  uploadedFileUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private toastrService: ToastrService,
    private router: Router,
    private uploadService: UploadService
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

  onFileSelected($event: any) {
    this.file = $event.target.files[0];
  }

  upload() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);

      this.uploadService.upload(formData)
        .subscribe((responseBody) => {
          const data = responseBody as UploadedFileInterface;

          this.toastrService.success('Файл успешно загружен');
          this.isUploadSuccess = true;
          this.uploadedFileUrl = data.fileUrl;
        });
    }
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

  clear() {
    this.isUploadSuccess = false;
    this.file = null;
  }
}
