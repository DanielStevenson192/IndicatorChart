import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import {RouterModule,Route} from '@angular/router';
import { ChartsModule } from 'ng2-charts';



import { AppComponent } from './app.component';
import { I01Component } from './inversion/i01/i01.component';
import { HttpService } from './servicios/http.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Route[]=[
  {path:"i01",component: I01Component}
]

@NgModule({
  declarations: [
    AppComponent,
    I01Component
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ChartsModule,
    RouterModule.forRoot(routes),
  ],  
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
