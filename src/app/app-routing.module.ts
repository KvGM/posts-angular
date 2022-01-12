import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/form/insert', component: PostFormComponent },
  { path: 'posts/form/edit/:id', component: PostFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
