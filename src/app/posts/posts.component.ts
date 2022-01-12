import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  totalRecords!: number;

  loading!: boolean;

  id!: number;

  first = 0;

  rows = 10;

  filterPost = '';

  constructor(
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    if (this.localStorageService.get('posts') === null) {
      this.postService.getPosts().subscribe((res) => {
        this.persist('posts', res);
        this.posts = res;
      });
    } else {
      this.posts = this.localStorageService.get('posts');
    }
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.delete(id).subscribe((res) => {
          //Res fake response
          let posts = this.localStorageService.get('posts');
          posts = posts.splice(
            posts.find((p: any) => p.id === id),
            1
          );
          this.localStorageService.remove('posts');
          this.localStorageService.set('posts', posts);
        });
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
        this.posts = this.posts.filter((p: any) => p.id !== id);
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['/posts/form/edit', id]);
  }

  filter(e: Event) {
    this.filterPost = (e.target as HTMLInputElement).value;
  }

  //Persist
  persist(key: string, value: any) {
    this.localStorageService.set(key, value);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.posts ? this.first === this.posts.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.posts ? this.first === 0 : true;
  }
}
