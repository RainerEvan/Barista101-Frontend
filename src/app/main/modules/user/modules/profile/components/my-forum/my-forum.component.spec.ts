import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyForumComponent } from './my-forum.component';

describe('MyForumComponent', () => {
  let component: MyForumComponent;
  let fixture: ComponentFixture<MyForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
