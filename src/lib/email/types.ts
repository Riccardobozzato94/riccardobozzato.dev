export interface TemplateInput {
  name: string;
  email: string;
  unsubscribeToken: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  signupDate: string; // ISO date
  lastStepSent: number; // -1 = none sent yet
  unsubscribed: boolean;
  unsubscribeToken: string;
}
