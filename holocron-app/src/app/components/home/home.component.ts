import { Component, OnInit } from '@angular/core';

import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts:Post[] = [];

  constructor(
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.postService.getPosts()
    .then((posts:Post[]) => {
      this.posts = posts;
    });
  }

}