import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostEditorComponent } from './components/post-editor/post-editor.component';
import { PostViewerComponent } from './components/post-viewer/post-viewer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post-editor/:id', component: PostEditorComponent },
  { path: 'post/:id', component: PostViewerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}