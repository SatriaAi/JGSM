
export enum Division {
  HR = 'Human Resources',
  FINANCE = 'Finance',
  IT = 'Information Technology',
  MARKETING = 'Marketing',
  OPERATIONS = 'Operations',
}

export enum Category {
  POLICY = 'Policy',
  REPORT = 'Report',
  CONTRACT = 'Contract',
  INVOICE = 'Invoice',
  MANUAL = 'Manual',
}

export enum Status {
  DRAFT = 'Draft',
  IN_REVIEW = 'In Review',
  APPROVED = 'Approved',
  ARCHIVED = 'Archived',
}

export interface Document {
  id: string;
  name: string;
  number: string;
  division: Division;
  category: Category;
  status: Status;
  link: string;
  createdAt: string;
}

export type FilterType = {
  division: string;
  category: string;
  status: string;
  search: string;
};
