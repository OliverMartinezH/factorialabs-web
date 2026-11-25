import { Component, inject } from '@angular/core';
import { Contact } from '../contact/contact';
import { CONTACT } from '../core/config';
import { Seo } from '../core/seo';

const TITLE = 'Contacto | FactoriaLabs';
const DESCRIPTION =
  'Cuéntanos qué sistema te está frenando. Respondemos con un diagnóstico inicial, no con una cotización a ciegas.';

@Component({
  selector: 'app-contacto-page',
  imports: [Contact],
  templateUrl: './contacto-page.html',
  styleUrl: './contacto-page.scss',
})
export class ContactoPage {
  protected readonly email = CONTACT.email;

  constructor() {
    inject(Seo).apply({
      title: TITLE,
      description: DESCRIPTION,
      path: '/contacto/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: 'es-CL',
      },
    });
  }
}
