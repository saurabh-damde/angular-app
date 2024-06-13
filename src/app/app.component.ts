import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from './models/post.model';
import { PostsService } from './services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('postForm') postForm: NgForm;
  loadedPosts = [];
  isFetching = false;
  err = null;
  private errSub: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnDestroy(): void {
    this.errSub.unsubscribe();
  }

  ngOnInit() {
    this.errSub = this.postsService.err.subscribe(
      (errMsg) => (this.err = errMsg)
    );
    this.onFetchPosts();
  }

  onCreatePost(post: Post) {
    this.postsService.createPost(post);
    this.postForm.reset();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe({
      next: (posts: Post[]) => (this.loadedPosts = posts),
      error: (err) => (this.err = err.message),
    });
    this.isFetching = false;
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => (this.loadedPosts = []));
  }

  onHandleError() {
    this.err = null;
  }
}
