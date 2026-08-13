export type AdminMode =
  | 'dashboard'
  | 'realtime'
  | 'issues'
  | 'tcheck'
  | 'drivers'
  | 'dock'
  | 'shippers'
  | 'reports'
  | 'settings';

export type Mode = AdminMode;

export type DispatchStatus = 'SEARCHING' | 'DISPATCHED' | 'DOCKING' | 'LOADING' | 'IN_TRANSIT' | 'COMPLETED';

export type TCheckStatus = 'PENDING' | 'IN_PROGRESS' | 'PASSED' | 'FAILED' | 'REJECTED';

export interface DispatchOrder {
  id: string;
  shipper: string;
  pickUp: string;
  dropOff: string;
  cargoType: string;
  tonnage: string;
  weightTon: number;
  fee: number;
  status: DispatchStatus;
  driverName: string | null;
  driverPhone: string | null;
  truckPlate: string | null;
  dockingBay: string | null;
  requestedTime: string;
  distanceKm: number;
  urgent: boolean;
  tCheckStatus: TCheckStatus;
  createdAt: string;
}

export interface GeofenceZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radiusMeter: number;
  activeTrucks: number;
  status: 'NORMAL' | 'CONGESTED' | 'BUSY';
}

export interface DockingBay {
  bayNo: string;
  zone: string;
  truckPlate: string;
  driver: string;
  cargo: string;
  status: 'VACANT' | 'DOCKING' | 'INSPECTION' | 'LOADING_COMPLETE' | 'PASSED' | 'REJECTED';
  weightOk: boolean;
  sealOk: boolean;
  tireOk: boolean;
  progress: number;
}
