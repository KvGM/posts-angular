import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  post: Post = new Post();

  autoResize: boolean = true;

  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      if (typeof param['id'] !== 'undefined') {
        if (+param['id'] > 100) {
          let posts = this.localStorageService.get('posts');
          this.post = posts.find((p: any) => p.id === +param['id']);
        } else {
          this.postService.getPost(param['id']).subscribe((res) => {
            //Res fake result
            let posts = this.localStorageService.get('posts');
            this.post = posts.find((p: any) => p.id === +param['id']);
          });
        }
      }
    });
  }

  save(post: Post) {
    this.postService.create(post).subscribe((res) => {
      //Fake result response: res
      let posts = this.localStorageService.get('posts');
      res.id = posts.at(-1).id + 1;
      posts.push(res);
      this.localStorageService.remove('posts');
      this.localStorageService.set('posts', posts);
      Swal.fire(
        'New post',
        `Post with title: ${this.post.title} created!`,
        'success'
      );
      this.router.navigate(['/posts']);
    });
  }

  edit(post: Post) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        post.userId = +post.userId;
        if (post.id > 100) {
          //Fake result response: res
          let posts = this.localStorageService.get('posts');
          posts.splice(
            posts.findIndex((p: any) => p.id === post.id),
            1,
            post
          );
          this.localStorageService.remove('posts');
          this.localStorageService.set('posts', posts);
          this.router.navigate(['/posts']);
        } else {
          this.postService.edit(post).subscribe((res) => {
            //Fake result response: res
            let posts = this.localStorageService.get('posts');
            posts.splice(
              posts.findIndex((p: any) => p.id === post.id),
              1,
              post
            );
            this.localStorageService.remove('posts');
            this.localStorageService.set('posts', posts);
            this.router.navigate(['/posts']);
          });
        }

        Swal.fire('Edited!', 'Your post has been edited.', 'success');
      }
    });
  }

  cancel() {
    this.router.navigate(['/posts']);
  }
}
