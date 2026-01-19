/**
 * Serviço Ask Sofya - Chat Assistente Clínico
 * Assistente clínico baseado em evidências científicas
 * 
 * POC: Usa o endpoint direto https://clinical-llm.aiaas.mv.com.br/v1/responses
 */

import { API_CONFIG, getDefaultHeaders, API_KEYS } from './config';

export interface AskSofyaMessage {
  type: 'user' | 'assistant' | 'system';
  text: string;
  references?: Array<{
    title: string;
    page: number;
    category?: string;
  }>;
  timestamp?: string;
}

export interface AskSofyaRequest {
  message: string;
  conversationHistory?: AskSofyaMessage[];
  model?: 'medium-reasoning' | 'small-reasoning' | 'large-reasoning';
  temperature?: number;
  maxOutputTokens?: number;
}

export interface AskSofyaResponse {
  id: string;
  created_at?: number;
  model: string;
  object?: string;
  status: 'completed' | 'processing' | 'failed';
  output: Array<{
    id: string;
    type: 'reasoning' | 'message';
    content: Array<{
      text: string;
      type?: string;
      annotations?: any[];
      logprobs?: any;
    }>;
    role?: string;
    status?: string;
    summary?: any[];
    encrypted_content?: any;
  }>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    input_tokens_details?: {
      cached_tokens?: number;
    };
    output_tokens_details?: {
      reasoning_tokens?: number;
      tool_output_tokens?: number;
    };
  };
  [key: string]: any; // Para campos adicionais que possam existir
}

/**
 * Envia mensagem para Ask Sofya e recebe resposta
 * POC: Usa o endpoint direto https://clinical-llm.aiaas.mv.com.br/v1/responses
 */
export async function sendMessageToSofya(
  request: AskSofyaRequest
): Promise<AskSofyaResponse> {
  try {
    // Construir array de mensagens para o formato da API
    const messages: Array<{ role: string; content: string }> = [];
    
    // Adicionar histórico de conversa se existir
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      request.conversationHistory.forEach((msg) => {
        messages.push({
          role: msg.type === 'user' ? 'user' : msg.type === 'system' ? 'system' : 'assistant',
          content: msg.text,
        });
      });
    }
    
    // Adicionar mensagem atual
    messages.push({
      role: 'user',
      content: request.message,
    });

    // Headers para o endpoint direto
    // Nota: O endpoint direto pode precisar de autenticação diferente
    // Para POC, vamos tentar com os headers padrão + x-model
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'x-model': request.model || 'medium-reasoning',
    };
    
    // Adicionar API key se disponível (pode não ser necessária no endpoint direto)
    if (API_KEYS.MARKETPLACE_API_KEY) {
      headers['x-api-key'] = API_KEYS.MARKETPLACE_API_KEY;
    }

    // Usar endpoint direto da Sofya
    const response = await fetch(API_CONFIG.ASK_SOFYA_API, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        input: messages,
        temperature: request.temperature ?? 0.1,
        max_output_tokens: request.maxOutputTokens ?? 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ask Sofya API error:', response.status, errorText);
      throw new Error(`Ask Sofya API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('🔵 Resposta bruta da API Sofya:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error calling Ask Sofya:', error);
    throw error;
  }
}

/**
 * Extrai o texto da resposta do formato da API
 * A API retorna um array de outputs, onde:
 * - type: "reasoning" contém o raciocínio do modelo
 * - type: "message" contém a resposta final
 */
export function extractResponseText(apiResponse: AskSofyaResponse): string {
  console.log('🔍 Extraindo texto da resposta da API...');
  console.log('📊 Total de outputs:', apiResponse.output?.length || 0);
  
  if (!apiResponse.output || apiResponse.output.length === 0) {
    console.warn('⚠️ Nenhum output encontrado na resposta');
    return 'Desculpe, não foi possível processar a resposta.';
  }

  // Log de todos os outputs
  apiResponse.output.forEach((out, index) => {
    console.log(`📦 Output ${index}:`, {
      type: out.type,
      role: out.role,
      status: out.status,
      contentLength: out.content?.length || 0,
      firstContentPreview: out.content?.[0]?.text?.substring(0, 100) || 'N/A'
    });
  });

  // Buscar o output do tipo 'message' (resposta final)
  const messageOutput = apiResponse.output.find((out) => out.type === 'message');
  if (messageOutput && messageOutput.content && messageOutput.content.length > 0) {
    const text = messageOutput.content[0]?.text;
    if (text) {
      console.log('✅ Texto extraído do output "message":', text.substring(0, 200) + '...');
      return text;
    }
  }
  
  // Fallback: buscar qualquer conteúdo de texto no primeiro output disponível
  for (const output of apiResponse.output) {
    if (output.content && output.content.length > 0) {
      const text = output.content[0]?.text;
      if (text && output.type !== 'reasoning') {
        console.log(`✅ Texto extraído do output "${output.type}":`, text.substring(0, 200) + '...');
        return text;
      }
    }
  }
  
  console.warn('⚠️ Nenhum texto válido encontrado nos outputs');
  return 'Desculpe, não foi possível processar a resposta.';
}

/**
 * Cria uma nova conversa (local, não há endpoint na API)
 * Retorna um ID de conversa local para gerenciar histórico
 */
export function createConversation(): { conversation_id: string } {
  // Gerar ID único local
  const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return { conversation_id: conversationId };
}

/**
 * Busca histórico de conversa (local, mantido no estado do componente)
 * Não há endpoint na API para buscar histórico, então retornamos array vazio
 */
export async function getConversationHistory(
  conversationId: string
): Promise<AskSofyaMessage[]> {
  // A API não tem endpoint de histórico, então retornamos array vazio
  // O histórico é mantido localmente no componente
  return [];
}
