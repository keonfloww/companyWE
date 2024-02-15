export interface FireBaseMailCredentials {
  access_token: string;
  email: string;
  expiry_date: number;
  id_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface FireBaseMailCredentialUpdated extends FireBaseMailCredentials {
  // UI state
  next_page_token?: string | null;
}
