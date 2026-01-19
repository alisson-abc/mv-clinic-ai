/**
 * Serviço de Estruturação SOAP
 * Estrutura transcrições clínicas no formato SOAP
 */

import { API_CONFIG, getDefaultHeaders } from './config';

export interface SOAPStructure {
  subjetivo?: string;
  objetivo?: string;
  avaliacao?: string;
  plano?: string;
}

export interface SOAPRequest {
  transcription: string;
  format?: 'SO' | 'SOAP';
  specialty?: string;
  patient_context?: Record<string, any>;
}

export interface SOAPResponse {
  status: 'success' | 'error';
  soap: SOAPStructure;
  raw_transcription?: string;
  metadata?: {
    processing_time?: number;
    confidence?: number;
  };
}

/**
 * Estrutura uma transcrição no formato SOAP
 */
export async function structureSOAP(
  request: SOAPRequest
): Promise<SOAPResponse> {
  try {
    const response = await fetch(`${API_CONFIG.SOAP_API}/structure`, {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`SOAP API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error structuring SOAP:', error);
    throw error;
  }
}

/**
 * Estrutura a partir de arquivo de áudio
 */
export async function structureSOAPFromAudio(
  audioFile: File,
  options?: {
    format?: 'SO' | 'SOAP';
    specialty?: string;
  }
): Promise<SOAPResponse> {
  try {
    const formData = new FormData();
    formData.append('audio', audioFile);
    if (options?.format) {
      formData.append('format', options.format);
    }
    if (options?.specialty) {
      formData.append('specialty', options.specialty);
    }

    const headers = getDefaultHeaders();
    // Remover Content-Type para FormData (browser vai definir automaticamente)
    delete headers['Content-Type'];

    const response = await fetch(`${API_CONFIG.SOAP_API}/structure/audio`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`SOAP API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error structuring SOAP from audio:', error);
    throw error;
  }
}

/**
 * Recupera um atendimento estruturado
 */
export async function getStructuredVisit(visitId: string): Promise<SOAPResponse> {
  try {
    const response = await fetch(`${API_CONFIG.SOAP_API}/visits/${visitId}`, {
      method: 'GET',
      headers: getDefaultHeaders(),
    });

    if (!response.ok) {
      throw new Error(`SOAP API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching structured visit:', error);
    throw error;
  }
}
