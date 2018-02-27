import { Injectable, OnInit } from '@angular/core';
import { Globals } from '../globals';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { RequestService } from '../services/request.service';
import { Broadcaster } from '../services/broadcaster';

@Injectable()
export class PostService {

  private postsUrl = Globals.SVC_DOMAIN + '/post';

  private posts:Post[] = [];

  constructor(
      private authSvc: AuthService,
      private notificationSvc: NotificationService,
      private requestService: RequestService,
      private broadcaster: Broadcaster
  ) {}

  ngOnInit(): void {}

  getPosts(): Promise<Post[]> {
    return new Promise<Post[]>((resolve,reject) => {
      this.requestService.get(this.postsUrl, null)
      .then((posts:Post[]) => {
        resolve(this.sortPostsByDate(posts));
      }).catch((error:any) => {
        this.notificationSvc.fail('Error fetching posts!');
        reject();
      });
    }); 
  }

  getPostById(id:string): Promise<Post> {
    return new Promise<Post>((resolve,reject) => {
      this.requestService.get(`${this.postsUrl}/${id}`, null)
      .then((post:Post) => {
        resolve(post);
      }).catch((error:any) => {
        this.notificationSvc.fail(`Error fetching post with id [${id}]!`);
        reject();
      });
    });
  }

  getPostByRelativePath(path:string): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      this.requestService.get(`${this.postsUrl}/${path}`, null)
      .then((post:Post) => {
        resolve(post);
      }).catch((error:string) => {
        this.notificationSvc.fail(error);
        reject();
      });
    });
  }

  createPost(newPost:Post): Promise<Post> {

    return new Promise<Post>((resolve,reject) => {
      this.requestService.post(this.postsUrl, newPost, this.authSvc.createAuthHeaders())
      .then((post:Post) => {
        this.notificationSvc.success(`Created new post!`);
        resolve(post);
      }).catch((error:string) => {
        this.notificationSvc.fail(error);
        reject();
      });
    });
  }

  deletePost(post:Post): Promise<void> {
    return new Promise<void>((resolve,reject) => {
      this.requestService.delete(`${this.postsUrl}/${post.id}`, this.authSvc.createAuthHeaders())
      .then(() => {
        this.notificationSvc.success(`Deleted post`);
        resolve();
      }).catch((error:string) => {
        this.notificationSvc.fail(error);
        reject();
      });
    });
  }

  updatePost(post:Post): Promise<void> {
    return new Promise<void>((resolve,reject) => {
      this.requestService.put(`${this.postsUrl}/${post.id}`, post, this.authSvc.createAuthHeaders())
      .then((post:Post) => {
        this.notificationSvc.success('Updated post!');
        resolve();
      }).catch((error:string) => {
        this.notificationSvc.fail('Encountered error trying to update post!');
        reject();
      });
    });
  }

  private sortPostsByDate(posts:Post[]): Post[] {
    return posts.sort((post1:Post,post2:Post) => {
      let date1 = new Date(post1.date);
      let date2 = new Date(post2.date);
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    });
  }


}

export class Post {
  id:string;
  title:string;
  date:string;
  content:string;
  path:string;
  name:string;
}