/**
 * Serviço Kadok OCR
 * Extração de dados de documentos médicos e carteirinhas
 */

import { API_CONFIG, getDefaultHeaders } from './config';

export interface HealthInsuranceCard {
  beneficiary_name: string;
  card_number: string;
  provider_name: string;
  plan_name: string;
  validity?: string;
  valid_file: boolean;
}

export interface MedicalOrder {
  patient_name: string;
  requesting_physician: string;
  request_date?: string;
  clinical_indication?: string;
  referral_number?: string;
  items: Array<{
    extracted_text: string;
    requested_quantity?: string;
    identified_items?: Array<{
      code: string;
      description: string;
      similarity_score: number;
    }>;
  }>;
  valid_file: boolean;
}

export interface DocumentIntegrity {
  missing_patient_name: boolean;
  patient_name_mismatch: boolean;
  cropped_document: boolean;
  unsigned_or_missing_credentials: boolean;
  illegible_or_low_quality: boolean;
  invalid_document_type: boolean;
}

/**
 * Extrai dados de carteirinha de saúde
 */
export async function extractHealthInsuranceCard(
  file: File,
  patientName?: string
): Promise<{
  status: string;
  message: string;
  file_name: string;
  file_type: string;
  extracted_data: HealthInsuranceCard;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (patientName) {
      formData.append('patient_name', patientName);
    }

    const headers = getDefaultHeaders();
    delete headers['Content-Type']; // FormData define automaticamente

    const response = await fetch(
      `${API_CONFIG.KADOK_API}/api/v3/health-insurance-card/extract/multipart`,
      {
        method: 'POST',
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Kadok API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error extracting health insurance card:', error);
    throw error;
  }
}

/**
 * Extrai dados de pedido médico
 */
export async function extractMedicalOrder(
  file: File,
  patientName?: string
): Promise<{
  status: string;
  message: string;
  file_name: string;
  file_type: string;
  extracted_data: MedicalOrder & {
    document_integrity: DocumentIntegrity;
  };
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (patientName) {
      formData.append('patient_name', patientName);
    }

    const headers = getDefaultHeaders();
    delete headers['Content-Type'];

    const response = await fetch(
      `${API_CONFIG.KADOK_API}/api/v3/medical-order/extract/multipart`,
      {
        method: 'POST',
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Kadok API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error extracting medical order:', error);
    throw error;
  }
}

/**
 * Verifica integridade de documento médico
 */
export async function verifyDocumentIntegrity(
  file: File,
  patientName?: string
): Promise<{
  status: string;
  message: string;
  integrity: DocumentIntegrity;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    if (patientName) {
      formData.append('patient_name', patientName);
    }

    const headers = getDefaultHeaders();
    delete headers['Content-Type'];

    const response = await fetch(
      `${API_CONFIG.KADOK_API}/api/v3/medical-order/verify-integrity/multipart`,
      {
        method: 'POST',
        headers,
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Kadok API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying document integrity:', error);
    throw error;
  }
}
