import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';

const TITLE = 'Método de modernización: fases verificables | FactoriaLabs';
const DESCRIPTION =
  'Cinco fases con verificación explícita: diagnóstico, migración de datos, módulos, puesta en marcha y soporte. La IA acelera el trabajo, no reemplaza la verificación.';

const STEPS = [
  ['Diagnóstico', 'Inventario de pantallas, consultas y reglas escondidas en el código.'],
  ['Datos', 'Migración con limpieza previa de claves y nulos, comparando contra el original.'],
  ['Primer módulo', 'El módulo más crítico en paralelo al sistema antiguo.'],
  ['Resto de módulos', 'Uno a la vez, comparado contra el legacy.'],
  ['Puesta en marcha', 'El sistema anterior queda en solo lectura y el nuevo opera con soporte.'],
];

@Component({
  selector: 'app-metodo',
  imports: [RouterLink],
  templateUrl: './metodo.html',
  styleUrl: './metodo.scss',
})
export class Metodo {
  constructor() {
    inject(Seo).apply({
      title: TITLE,
      description: DESCRIPTION,
      path: '/metodo/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'Método de modernización de software legacy',
        description: DESCRIPTION,
        inLanguage: 'es-CL',
        step: STEPS.map(([name, text]) => ({
          '@type': 'HowToStep',
          name,
          text,
        })),
      },
    });
  }
}
