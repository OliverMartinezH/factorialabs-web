import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Navegación a secciones por id.
 * No depende del scroll del router: busca el elemento y lo desplaza cuando existe.
 */
@Injectable({ providedIn: 'root' })
export class FragmentNav {
  private readonly router = inject(Router);

  /** Desde un link: evita la navegación por defecto y hace el scroll a mano. */
  go(fragment: string, event?: Event): void {
    event?.preventDefault();

    const current = this.router.url.split('#')[0];

    if (current !== '/' && current !== '') {
      this.router.navigate(['/'], { fragment });
    }

    this.scrollWhenReady(fragment, 0, true);
  }

  /** Hash presente al cargar: salto instantáneo, sin animación. */
  scrollToCurrentHash(): void {
    const fragment = window.location.hash.replace('#', '');
    if (fragment) {
      this.scrollWhenReady(fragment, 0, false);
    }
  }

  private scrollWhenReady(fragment: string, attempt: number, smooth: boolean): void {
    const target = document.getElementById(fragment);

    if (target) {
      target.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'start',
      });

      if (window.location.hash !== `#${fragment}`) {
        history.replaceState(null, '', `#${fragment}`);
      }
      return;
    }

    if (attempt < 30) {
      requestAnimationFrame(() => this.scrollWhenReady(fragment, attempt + 1, smooth));
    }
  }
}
