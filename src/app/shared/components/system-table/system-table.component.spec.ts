import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTableComponent } from './system-table.component';

describe('SystemTableComponent', () => {
  let component: SystemTableComponent;
  let fixture: ComponentFixture<SystemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
