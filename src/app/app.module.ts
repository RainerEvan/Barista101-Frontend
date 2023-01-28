import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignupComponent } from './main/components/signup/signup.component';
import { SigninComponent } from './main/components/signin/signin.component';
import { NotFoundComponent } from './main/components/not-found/not-found.component';
import { HeroIconModule, eye, eyeOff } from 'ng-heroicon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './main/utils/jwt-interceptor/jwt.interceptor';
import { ErrorInterceptor } from './main/utils/error-interceptor/error.interceptor';
import { SharedModule } from './main/modules/shared/shared.module';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat/';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HeroIconModule.forRoot(
      {
        eye,
        eyeOff
      },
      {
        defaultHostDisplay:'block',
        attachDefaultDimensionsIfNoneFound:true
      },
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true 
    },
    { 
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true 
    },
    {
      provide: LocationStrategy, useClass:HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
