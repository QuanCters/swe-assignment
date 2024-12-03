export type Printer = {
  id: string;
  name: string;
  brand?: string;
  model?: string;
  description?: string;
  condition?: string;
  location: string;
  status: "Online" | "Offline";
  isOn?: boolean;
  initialOn?: boolean;
  hasChanged?: boolean;
  delete?: boolean;
};

export const PrinterType = {
  Online: true, // Online gán giá trị boolean true
  Offline: false, // Offline gán giá trị boolean false
};
