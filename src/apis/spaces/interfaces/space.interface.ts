export interface Space {
  id: string;
  name: string;
  streetNameAddress: string;
  lotNumberAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
