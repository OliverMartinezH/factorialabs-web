import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CONTACT } from '../core/config';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Field = 'name' | 'email' | 'message';

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  currentSystem: string;
  message: string;
  website: string;
  elapsed: number;
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly startedAt = Date.now();

  protected readonly status = signal<Status>('idle');
  protected readonly errorMessage = signal('');

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    currentSystem: [''],
    message: ['', [Validators.required, Validators.minLength(12)]],
    // Campo trampa: invisible para personas, irresistible para bots.
    website: [''],
  });

  protected readonly email = CONTACT.email;

  protected get contactHref(): string {
    if (CONTACT.whatsapp) {
      return `https://wa.me/${CONTACT.whatsapp}`;
    }
    return `mailto:${CONTACT.email}?subject=Consulta%20desde%20factorialabs`;
  }

  protected get contactLabel(): string {
    return CONTACT.whatsapp ? 'Escribir por WhatsApp' : 'Escribir por correo';
  }

  protected invalid(field: Field): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const form = this.form.getRawValue();

    // Si el campo trampa viene relleno, se simula éxito y no se envía nada.
    if (form.website.trim().length > 0) {
      this.status.set('sent');
      this.form.reset();
      return;
    }

    const payload: ContactPayload = {
      ...form,
      elapsed: Date.now() - this.startedAt,
    };

    if (!CONTACT.formEndpoint) {
      this.sendByEmail(payload);
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    // Apps Script no expone cabeceras CORS: se envía en modo no-cors y no se
    // puede leer la respuesta. El éxito se asume igual que cualquier formulario
    // clásico; el antispam y la verificación viven del lado del script.
    fetch(CONTACT.formEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
      .then(() => {
        this.status.set('sent');
        this.form.reset();
      })
      .catch(() => {
        this.status.set('error');
        this.errorMessage.set(
          `No pudimos enviar el formulario. Escríbenos directo a ${this.email}.`,
        );
      });
  }

  /** Sin endpoint configurado, el formulario abre la aplicación de correo. */
  private sendByEmail(payload: ContactPayload): void {
    const lines = [
      `Nombre: ${payload.name}`,
      `Empresa: ${payload.company || '—'}`,
      `Email: ${payload.email}`,
      `Sistema actual: ${payload.currentSystem || '—'}`,
      '',
      payload.message,
    ];

    const subject = encodeURIComponent(`Consulta de ${payload.name}`);
    const body = encodeURIComponent(lines.join('\n'));

    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    this.status.set('sent');
  }
}
