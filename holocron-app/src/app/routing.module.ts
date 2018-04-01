import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { PostViewerComponent } from './components/post-viewer/post-viewer.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'post-editor/:id', component: PostEditorComponent },
  { path: 'post/:month/:day/:year/:name', component: PostViewerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}