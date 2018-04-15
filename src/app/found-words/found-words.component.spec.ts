import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundWordsComponent } from './found-words.component';

describe('FoundWordsComponent', () => {
  let component: FoundWordsComponent;
  let fixture: ComponentFixture<FoundWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoundWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
