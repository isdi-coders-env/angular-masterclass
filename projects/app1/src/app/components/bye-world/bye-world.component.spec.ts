import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByeWorldComponent } from './bye-world.component';

describe('ByeWorldComponent', () => {
  let component: ByeWorldComponent;
  let fixture: ComponentFixture<ByeWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ByeWorldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByeWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
