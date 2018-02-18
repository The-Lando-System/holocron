import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { RoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { Broadcaster } from './services/broadcaster';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { RequestService } from './services/request.service';

import { StartupService } from './services/startup.service';

export function startupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    Broadcaster,
    AuthService,
    StartupService,
    NotificationService,
    RequestService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [StartupService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
