import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      let postId = params['id'];
      if (postId !== 'new') {
        this.postService.getPostById(postId)
        .then((post:Post) => {
          this.post = post;
        }).catch(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.post = new Post();
      }
    });
  }

  submitPost(): void {
    let date = new Date();

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    this.post.date = new Date().toLocaleString();
    this.post.path = `${month}_${day}_${year}_${this.post.name}`;

    if (this.post.id) {
      this.postService.updatePost(this.post)
      .then(() => {
        this.router.navigate(['/']);
      })
    } else {
      this.postService.createPost(this.post)
      .then((post:Post) => {
        this.router.navigate(['/'])
      });
    }
  }

  deletePost(): void {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }
    this.postService.deletePost(this.post)
    .then(() => {
      this.router.navigate(['/']);
    });
  }

}