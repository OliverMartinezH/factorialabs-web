import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

export interface Lead {
  name: string;
  email: string;
  company: string | null;
  currentSystem: string | null;
  message: string;
  receivedAt: string;
}

const filePath = process.env['LEADS_FILE'] ?? join(process.cwd(), 'data', 'leads.json');

/** Cola en proceso: una escritura a la vez, sin intercalar archivos. */
let queue: Promise<unknown> = Promise.resolve();

export function leadsFilePath(): string {
  return filePath;
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(filePath, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

export function appendLead(lead: Lead): Promise<Lead[]> {
  const task = queue.then(async () => {
    const leads = await readLeads();
    leads.push(lead);

    await mkdir(dirname(filePath), { recursive: true });

    const temp = `${filePath}.tmp`;
    await writeFile(temp, `${JSON.stringify(leads, null, 2)}\n`, 'utf8');
    await rename(temp, filePath);

    return leads;
  });

  // La cola no se rompe si una escritura falla.
  queue = task.catch(() => undefined);

  return task;
}
