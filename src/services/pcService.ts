import { FDroidApp, FDroidResponse } from '../types.ts';

// Cleaned PC service with cleared content per user request
export async function getPcApps(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<FDroidResponse> {
  return {
    total: 0,
    page: 1,
    limit: params?.limit || 24,
    totalPages: 1,
    apps: [],
  };
}

export async function getPcGames(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<FDroidResponse> {
  return {
    total: 0,
    page: 1,
    limit: params?.limit || 24,
    totalPages: 1,
    apps: [],
  };
}

export async function getPcItemById(id: string): Promise<FDroidApp | null> {
  return null;
}
