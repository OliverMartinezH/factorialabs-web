export interface LeadInput {
  name: string;
  email: string;
  company: string | null;
  currentSystem: string | null;
  message: string;
}

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; errors: Record<string, string[]> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function optional(value: unknown, max: number): string | null {
  const clean = text(value);
  return clean.length === 0 ? null : clean.slice(0, max);
}

/** Valida el cuerpo del formulario de contacto. Función pura: fácil de testear. */
export function validateContact(payload: unknown): ValidationResult {
  const body = (payload ?? {}) as Record<string, unknown>;

  const name = text(body['name']);
  const email = text(body['email']);
  const message = text(body['message']);
  const errors: Record<string, string[]> = {};

  if (name.length < 2) {
    errors['name'] = ['El nombre es obligatorio.'];
  }

  if (!EMAIL.test(email) || email.length > 254) {
    errors['email'] = ['El email no es válido.'];
  }

  if (message.length < 12) {
    errors['message'] = ['El mensaje es demasiado corto.'];
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    lead: {
      name: name.slice(0, 120),
      email: email.toLowerCase(),
      company: optional(body['company'], 160),
      currentSystem: optional(body['currentSystem'], 160),
      message: message.slice(0, 4000),
    },
  };
}
