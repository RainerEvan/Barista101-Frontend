import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { dotsHorizontal, HeroIconModule, trash } from 'ng-heroicon';


@NgModule({
  declarations: [
    ForumListComponent,
    ForumDetailComponent,
    CommentListComponent,
    CommentDetailComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        dotsHorizontal,
        trash
      }
    )
  ]
})
export class ForumModule { }
