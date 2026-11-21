import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renderiza el titular de modernización', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('Modernización de');
    expect(text).toContain('software legacy');
  });

  it('publica el panel de paridad con la diferencia en cero', () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('DIFERENCIA');
    expect(text).toContain('0,00');
  });
});
