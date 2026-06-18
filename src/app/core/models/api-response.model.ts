export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export type PrStatus = 'Draft' | 'Submitted' | 'Approved' | 'Rejected';

export interface PurchaseRequestItem {
  id: string;
  itemName: string;
  quantity: number;
  unit: string | null;
  unitPrice: number | null;
  totalPrice: number | null;
  notes: string | null;
}

export interface PurchaseRequest {
  id: string;
  code: string;
  title: string;
  description: string | null;
  status: PrStatus;
  department: string | null;
  expectedDate: string | null;
  totalAmount: number;
  currency: string;
  items: PurchaseRequestItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  taxCode: string | null;
  contactName: string | null;
  contactEmail: string | null;
  phone: string | null;
  address: string | null;
  status: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalPrs: number;
  draftPrs: number;
  submittedPrs: number;
  approvedPrs: number;
  rejectedPrs: number;
  totalVendors: number;
  planUsage: { prCount: number; vendorCount: number };
}
