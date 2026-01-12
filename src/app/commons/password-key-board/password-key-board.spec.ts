import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordKeyBoard } from './password-key-board';

describe('PasswordKeyBoard', () => {
  let component: PasswordKeyBoard;
  let fixture: ComponentFixture<PasswordKeyBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordKeyBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordKeyBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
