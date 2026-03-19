export interface CodeValue {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ClientStatus {
  id: number;
  code: string;
  value: string;
}

export interface ClientTimeline {
  submittedOnDate: number[];
  submittedByUsername: string;
  submittedByFirstname: string;
  submittedByLastname: string;
  activatedOnDate?: number[];
  activatedByUsername?: string;
  activatedByFirstname?: string;
  activatedByLastname?: string;
}

export interface ClientSummary {
  id: number;
  accountNo: string;
  externalId?: string;
  status: ClientStatus;
  active: boolean;
  activationDate?: number[];
  firstname?: string;
  middlename?: string;
  lastname?: string;
  displayName: string;
  officeId: number;
  officeName: string;
  staffId?: number;
  staffName?: string;
  gender?: CodeValue;
  clientType?: CodeValue;
  clientClassification?: CodeValue;
  groups?: Array<{ id: number; name: string }>;
}

export interface ClientDetail extends ClientSummary {
  timeline: ClientTimeline;
  dateOfBirth?: number[];
  mobileNo?: string;
  emailAddress?: string;
  legalForm?: CodeValue;
  isStaff: boolean;
  savingsProductId?: number;
  savingsProductName?: string;
  savingsAccountId?: number;
}

export interface ClientIdentifier {
  id: number;
  clientId: number;
  documentType: CodeValue;
  documentKey: string;
  description?: string;
  status: string;
}

export interface FamilyMember {
  id: number;
  clientId: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  qualification?: string;
  mobileNumber?: string;
  age: number;
  isDependent: boolean;
  relationship: CodeValue;
  gender: CodeValue;
  profession?: CodeValue;
  maritalStatus?: CodeValue;
  dateOfBirth?: number[];
}

export interface ClientDocument {
  id: number;
  parentEntityType: string;
  parentEntityId: number;
  name: string;
  fileName?: string;
  size?: number;
  type?: string;
  description?: string;
  location?: string;
  storageType?: number;
}

export interface ClientNote {
  id: number;
  clientId: number;
  note: string;
  createdById: number;
  createdByUsername: string;
  createdOn: number[];
  updatedById: number;
  updatedByUsername: string;
  updatedOn: number[];
}

export interface ClientSearchRequest {
  searchText?: string;
  exactMatch?: boolean;
  page?: number;
  size?: number;
}

export interface ClientSearchResponse {
  totalFilteredRecords: number;
  pageItems: ClientSummary[];
}
