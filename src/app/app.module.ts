import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//PrimeNG
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';


import { HeaderComponent } from './header/header.component';
import { TabmenuComponent } from './header/tabmenu/tabmenu.component';
import { PostsComponent } from './posts/posts.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostService } from './posts/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabmenuComponent,
    PostsComponent,
    PostFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    CardModule,
    SplitterModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    FormsModule,
    InputNumberModule,
    InputTextareaModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
