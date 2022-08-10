import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleCreateComponent } from './components/article-create/article-create.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles', component: ArticlesComponent },
  // TODO: use children routes
  { path: 'articles/create', component: ArticleCreateComponent },
  { path: 'articles/:_id', component: ArticleDetailComponent },
  { path: 'articles/:_id/edit', component: ArticleEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
