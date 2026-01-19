/**
 * Serviço Sofya Prescriber API
 * Extrai e estrutura prescrições médicas
 */

import { API_CONFIG, getDefaultHeaders } from './config';

export interface Medication {
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  quantity?: string;
  duration?: string;
}

export interface PrescriptionWarning {
  type: 'warning' | 'danger' | 'info';
  message: string;
  medication?: string;
  interaction_with?: string[];
}

export interface PrescriptionRequest {
  transcription: string;
  patient_context?: {
    age?: number;
    weight?: number;
    allergies?: string[];
    current_medications?: string[];
  };
}

export interface PrescriptionResponse {
  status: 'success' | 'error';
  medications: Medication[];
  warnings?: PrescriptionWarning[];
  metadata?: {
    processing_time?: number;
    confidence?: number;
  };
}

/**
 * Extrai prescrição de uma transcrição
 */
export async function extractPrescription(
  request: PrescriptionRequest
): Promise<PrescriptionResponse> {
  try {
    const response = await fetch(`${API_CONFIG.PRESCRIBER_API}/extract`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Prescriber API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error extracting prescription:', error);
    throw error;
  }
}

/**
 * Valida interações medicamentosas
 */
export async function validateMedicationInteractions(
  medications: Medication[]
): Promise<PrescriptionWarning[]> {
  try {
    const response = await fetch(`${API_CONFIG.PRESCRIBER_API}/validate-interactions`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify({ medications }),
    });

    if (!response.ok) {
      throw new Error(`Prescriber API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.warnings || [];
  } catch (error) {
    console.error('Error validating interactions:', error);
    throw error;
  }
}
