import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './post';
import { Observable, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private urlPosts: string = 'https://jsonplaceholder.typicode.com/posts/';
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.urlPosts);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.urlPosts}/${id}`);
  }

  edit(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.urlPosts}/${post.id}`, post, {
      headers: this.httpHeaders,
    });
  }

  delete(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.urlPosts}/${id}`, {
      headers: this.httpHeaders,
    });
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.urlPosts, post, {
      headers: this.httpHeaders,
    });
  }
}
