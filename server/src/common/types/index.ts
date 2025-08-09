export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  createdAt: Date;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  type: 'PUBLIC' | 'PRIVATE';
  creatorId: string;
  maxParticipants: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
