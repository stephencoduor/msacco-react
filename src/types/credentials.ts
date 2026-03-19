export interface Credentials {
  username: string;
  userId: number;
  base64EncodedAuthenticationKey: string;
  authenticated: boolean;
  officeId: number;
  officeName: string;
  staffId?: number;
  staffDisplayName?: string;
  organisationalRole?: {
    id: number;
    code: string;
    value: string;
  };
  roles: Array<{
    id: number;
    name: string;
    description: string;
    disabled: boolean;
  }>;
  permissions: string[];
  isSelfServiceUser: boolean;
  shouldRenewPassword: boolean;
  isTwoFactorAuthenticationRequired?: boolean;
  accessToken?: string;
}
