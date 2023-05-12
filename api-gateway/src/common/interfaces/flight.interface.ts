import { Types } from 'mongoose';

export interface IFlight {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: Types.ObjectId[];
}
