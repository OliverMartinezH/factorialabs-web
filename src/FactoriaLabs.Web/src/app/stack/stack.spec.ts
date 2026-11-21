import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Stack } from './stack';

describe('Stack', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stack],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renderiza la página de arquitectura', () => {
    const fixture = TestBed.createComponent(Stack);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Arquitectura y stack');
    expect(text).toContain('Migración');
  });
});
