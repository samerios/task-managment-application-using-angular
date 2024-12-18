import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModelFormComponent } from './task-model-form.component';

describe('TaskModelFormComponent', () => {
  let component: TaskModelFormComponent;
  let fixture: ComponentFixture<TaskModelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModelFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskModelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
