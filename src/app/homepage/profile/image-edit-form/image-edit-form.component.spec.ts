import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditFormComponent } from './image-edit-form.component';

describe('ImageEditFormComponent', () => {
  let component: ImageEditFormComponent;
  let fixture: ComponentFixture<ImageEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditFormComponent]
    });
    fixture = TestBed.createComponent(ImageEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
