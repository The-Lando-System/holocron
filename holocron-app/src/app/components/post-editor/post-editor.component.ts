import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent implements OnInit {

  post: Post = new Post();
  
  constructor(
    private router: Router,
    private postService: PostService
  ){}

  ngOnInit(): void {

  }

  submitPost(): void {
    this.post.date = new Date().toLocaleString();
    this.postService.createPost(this.post)
    .then((post:Post) => {
      this.router.navigate(['/'])
    });
  }


}