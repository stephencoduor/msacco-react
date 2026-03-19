import type { ClientStatus, ClientTimeline } from './client';

export interface GroupSummary {
  id: number;
  accountNo: string;
  name: string;
  externalId?: string;
  status: ClientStatus;
  active: boolean;
  activationDate?: number[];
  officeId: number;
  officeName: string;
  hierarchy?: string;
  groupLevel?: string;
  timeline: ClientTimeline;
}

export interface GroupDetail extends GroupSummary {
  staffId?: number;
  staffName?: string;
  clientMembers?: GroupClientMember[];
  activeClientMembers?: GroupClientMember[];
}

export interface GroupClientMember {
  id: number;
  accountNo: string;
  displayName: string;
  officeId: number;
  officeName: string;
  status: ClientStatus;
  active: boolean;
}

export interface GroupSearchResponse {
  totalFilteredRecords: number;
  pageItems: GroupSummary[];
}

export interface GroupNote {
  id: number;
  groupId: number;
  note: string;
  createdById: number;
  createdByUsername: string;
  createdOn: number[];
  updatedById: number;
  updatedByUsername: string;
  updatedOn: number[];
}
