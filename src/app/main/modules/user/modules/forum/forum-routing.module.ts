import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddForumComponent } from './components/add-forum/add-forum.component';
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { ForumListComponent } from './components/forum-list/forum-list.component';

const routes: Routes = [
  {
    path: '',
    component: ForumListComponent,
  },
  {
    path: 'detail/:id',
    component: ForumDetailComponent,
  },
  {
    path: 'add',
    component: AddForumComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
