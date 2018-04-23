import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material';

import { User, AuthService } from '../../services/auth.service';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator

  pageEvent: PageEvent;
  pageIndex: number = 0;

  user: User;
  posts: Post[] = [];
  allPosts: Post[] = [];

  constructor(
    private authSvc: AuthService,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.user = this.authSvc.getUser();
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts()
    .then((posts:Post[]) => {
      this.allPosts = posts;
      this.filterPublishedPosts();
      this.posts = this.allPosts;
      this.filterPosts();
    });
  }

  getPostPath(post:Post): string[] {
    let path = ['post'];
    return path.concat(post.path.split('_'));
  }

  handlePageClick(pageEvent:PageEvent) {
    this.pageEvent = pageEvent;
    this.pageIndex = pageEvent.pageIndex;
    this.filterPosts();
  }

  publishPost(post:Post) {
    event.preventDefault();
    this.postService.publishPost(post)
    .then(() => {
      this.getPosts();
    });
  }

  private filterPublishedPosts() {
    this.allPosts = this.allPosts.filter((post,index) => {
      return (this.user || post.isPublished);
    });
  }

  private filterPosts() {
    this.posts = this.allPosts.filter((post,index) => {
      let lowerBound = ((this.pageIndex-1)*5) + 4;
      let upperBound = (this.pageIndex*5) + 5;
      return (lowerBound < index) && (upperBound > index);
    });
  }
}