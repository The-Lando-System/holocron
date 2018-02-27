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
    this.postService.getPosts()
    .then((posts:Post[]) => {
      this.posts = this.allPosts = posts;
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

  private filterPosts() {
    this.posts = this.allPosts.filter((t,index) => {
      let lowerBound = ((this.pageIndex-1)*5) + 4;
      let upperBound = (this.pageIndex*5) + 5;
      return (lowerBound < index) && (upperBound > index);
    });
  }
}