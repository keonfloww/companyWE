export interface Email {
  metadata_id: string;
  metadata_thread_id: string;
  subject: string;
  sender_name: string;
  sender_email: string;
  received_on: string;
  received_on_unix: number;
  body: Body;
  short_body: string;
  categories: any[];
  images: Image[];
  picture: string | null;

  //UI first
  isRead?: boolean;
}

export interface Body {
  attachmentId?: string;
  size: number;
  data?: string;
}

export interface Image {
  src: string;
  format: Format;
}

export enum Format {
  PNG = 'png',
}

export interface ExecutionTime {
  mailMetadataExtractionTime: number;
  apiExecutionTime: number;
  mailContentExtractionTime: number;
}

export interface MailInfo {
  start_date: number;
  end_date: number;
}

export interface TokenInfo {
  is_expired: boolean;
  access_token: string;
  expiry_date: number;
}
