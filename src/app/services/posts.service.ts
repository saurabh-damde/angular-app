import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl = 'https://angular-app-5f276-default-rtdb.firebaseio.com/posts.json';
  requestConfig: object = {
    headers: new HttpHeaders({}),
    params: new HttpParams().set('print', 'pretty'),
  };
  err = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(this.apiUrl, this.requestConfig)
      .pipe(
        map((postData) => {
          const posts: Post[] = [];
          for (const key in postData) {
            if (postData.hasOwnProperty(key)) {
              posts.push({ ...postData[key], id: key });
            }
          }
          return posts;
        }),
        catchError((err) => throwError(err))
      );
  }

  createPost(post: Post) {
    this.http
      .post<{ name: string }>(this.apiUrl, post, { observe: 'response' })
      .subscribe({
        next: (res) => console.log(res),
        error: (err) => this.err.next(err.message),
      });
  }

  deletePosts() {
    return this.http
      .delete(this.apiUrl, { observe: 'events', responseType: 'json' })
      .pipe(tap((event) => console.log(event)));
  }
}
