const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export class ApiError extends Error {
  constructor(
    public status: number, 
    message: string, 
    public code?: string, 
    public response?: any,
    public requestDetails?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}, retryCount = 0): Promise<Response> {
  const token = localStorage.getItem('accessToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && retryCount === 0) {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshResponse.ok) {
          const { access_token } = await refreshResponse.json();
          localStorage.setItem('accessToken', access_token);
          return fetchWithAuth(endpoint, options, retryCount + 1);
        }
      }
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new ApiError(401, 'Authentication required', 'authentication_required');
    } catch (error) {
      throw new ApiError(401, 'Authentication failed', 'authentication_failed');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    // Enhanced error logging with backend error details
    const errorDetails = {
      timestamp: new Date().toISOString(),
      endpoint: `${API_BASE_URL}${endpoint}`,
      method: options.method || 'GET',
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      requestBody: options.body,
      backendError: errorData,
      userAgent: navigator.userAgent,
      currentUrl: window.location.href
    };
    
    console.group(`🚨 API ERROR [${response.status}] - ${endpoint}`);
    console.error('❌ Request Failed:', errorDetails.endpoint);
    console.error('📊 Status:', `${errorDetails.status} ${errorDetails.statusText}`);
    console.error('🔍 Backend Error:', errorDetails.backendError);
    console.error('📤 Request Details:', {
      method: errorDetails.method,
      body: errorDetails.requestBody,
      headers: options.headers
    });
    console.error('🌐 Response Headers:', errorDetails.headers);
    console.error('📍 Context:', {
      timestamp: errorDetails.timestamp,
      currentUrl: errorDetails.currentUrl,
      userAgent: errorDetails.userAgent
    });
    console.groupEnd();
    
    throw new ApiError(
      response.status,
      errorData.detail || errorData.message || `HTTP ${response.status}: ${response.statusText}`,
      errorData.code,
      errorData,
      errorDetails
    );
  }

  return response;
}

export const api = {
  async get(endpoint: string) {
    const response = await fetchWithAuth(endpoint);
    return response.json();
  },

  async post(endpoint: string, data?: any) {
    const response = await fetchWithAuth(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  async put(endpoint: string, data?: any) {
    const response = await fetchWithAuth(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  async delete(endpoint: string) {
    const response = await fetchWithAuth(endpoint, {
      method: 'DELETE',
    });
    return response.status === 204 ? null : response.json();
  },
};