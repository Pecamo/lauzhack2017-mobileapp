export interface KeyValuePair {
  key: string;
  value: any;
}

// ------------- Business

export interface Coordinates {
  address: string;
  x: number;
  y: number;
}

export interface BusinessInfo {
  name: string;
  logo: string;
  website: string;
  description: string;
  coordinates: Coordinates[];
}

export interface FidelityCard {
  name: string;
  description: string;
  articles: KeyValuePair[];
  promos: KeyValuePair[];
}

export interface Business {
  infos: BusinessInfo;
  FCs: FidelityCard[];
}


// ---------------- User


export interface Transaction {
  date: Date;
  pts: number;
}

export interface FcEntry {
  business_id: string;
  fc_id: string;
  transactions: Transaction[];
}


export interface User {
  _id: string;
  FCs: FcEntry[];
}
