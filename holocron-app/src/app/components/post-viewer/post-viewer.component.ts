import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Post, PostService } from '../../services/post.service';

@Component({
  selector: 'post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.css']
})
export class PostViewerComponent implements OnInit {

  post: Post;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private postService: PostService
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.forEach((params: Params) => {
      let postId = params['id'];
      this.postService.getPostById(postId)
      .then((post:Post) => {
        this.post = post;
      }).catch(() => {
        this.router.navigate(['/']);
      });
    });

  }

  sanitizeHtml(html:string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}