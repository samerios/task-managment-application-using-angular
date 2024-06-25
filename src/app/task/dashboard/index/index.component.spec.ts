import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDashboardIndexComponent } from './index.component';

describe('TasksDashboardIndexComponent', () => {
  let component: TasksDashboardIndexComponent;
  let fixture: ComponentFixture<TasksDashboardIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksDashboardIndexComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TasksDashboardIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
