import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// // for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// // for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// // for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { SelecaoEstadoComponent } from './components/selecao-estado/selecao-estado.component'; // Importar o componente

import { LoginComponent } from './auth/login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        SelecaoEstadoComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        FormsModule,
        NgSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        OverlayModule,
        SharedModule,
        AppRoutingModule,
        NgbModule,
        //     // for HttpClient use:
        LoadingBarHttpClientModule,
        //     // for Router use:
        LoadingBarRouterModule,
        //     // for Core use:
        LoadingBarModule], providers: [CookieService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
