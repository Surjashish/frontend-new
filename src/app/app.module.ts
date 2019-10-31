import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggedInNavbarComponent } from './logged-in-navbar/logged-in-navbar.component';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatSidenavModule, MatGridListModule, MatStepperModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import { VideoComponent } from './video/video.component';
import { MatVideoModule } from 'mat-video';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import {HttpClientModule} from '@angular/common/http';
import { LoggedOutNavbarComponent } from './logged-out-navbar/logged-out-navbar.component' ;
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { MatJumbotronModule } from '@angular-material-extensions/jumbotron';
import { TrendingvideosComponent } from './trendingvideos/trendingvideos.component';
import {MatDividerModule} from '@angular/material/divider';
import { CarouselComponent } from './carousel/carousel.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {LoginComponent} from './login/login.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import{FooterComponent} from './footer/footer.component';
import{UploadComponent} from './upload/upload.component';

import {MatProgressBarModule} from '@angular/material/progress-bar'; 

@NgModule({
  declarations: [AppComponent, LoggedInNavbarComponent, VideoComponent, DashboardComponent,
     UserRegistrationComponent, LoggedOutNavbarComponent,TrendingvideosComponent, JumbotronComponent,
     CarouselComponent, LandingPageComponent,LoginComponent, MyPostsComponent, FooterComponent,
     UploadComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule,
            MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule,MatListModule,
            FlexLayoutModule,MatIconModule, MatAutocompleteModule, MatInputModule, 
            MatFormFieldModule, MatSidenavModule,MatVideoModule,MatGridListModule, 
            MatTabsModule,MatStepperModule, ReactiveFormsModule,MatDatepickerModule,HttpClientModule,
            MatNativeDateModule,MatJumbotronModule,MatDividerModule,MatProgressBarModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
