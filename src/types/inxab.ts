export interface User {
  username: string;
  password: string;
}

export interface SecureWord {
  word: string;
  timestamp: number;
}

export interface MfaAttempt {
  code: string;
  attempts: number;
}