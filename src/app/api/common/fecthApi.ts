import axios, { AxiosResponse } from "axios";

export interface FetchOptions {
  url: string; // URL da API
  method?: string; // Método HTTP (GET, POST, PUT, DELETE, etc.)
  headers?: Record<string, string>; // Cabeçalhos da requisição
  body?: any; // Dados do corpo da requisição (para POST, PUT, etc.)
}

export async function fetchApi<T>(options: FetchOptions): Promise<T> {
  const { url, method = "GET", headers = {}, body } = options;

  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      headers,
      data: body,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Erro na requisição");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function fetchApiFile(options: FetchOptions): Promise<Blob> {
  const { url, method = "GET", headers = {}, body } = options;

  try {
    const response: AxiosResponse<Blob> = await axios({
      method,
      url,
      headers,
      data: body,
      responseType: "blob",
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Erro na requisição");
    } else {
      throw new Error(error.message);
    }
  }
}

