import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginIndexComponent } from './index.component';

describe('LoginIndexComponent', () => {
  let component: LoginIndexComponent;
  let fixture: ComponentFixture<LoginIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
