import { Component, OnInit } from '@angular/core';

import { User, AuthService } from '../../services/auth.service';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  posts:Post[] = [];

  constructor(
    private authSvc: AuthService,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.user = this.authSvc.getUser();
    this.postService.getPosts()
    .then((posts:Post[]) => {
      this.posts = posts;
    });
  }

  getPostPath(post:Post): string[] {
    let path = ['post'];
    return path.concat(post.path.split('_'));
  }

}