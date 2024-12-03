export type Printing = {
  id: number;
  timestamp: Date;
  printerName: string;
  printerId?: string;
  documentName: string;
  documentId?: string;
  pageType: string;
  paperCount?: number;
  studentId?: string;
  paymentAmount?: number;
};
export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  // subRows?: Person[];
};
