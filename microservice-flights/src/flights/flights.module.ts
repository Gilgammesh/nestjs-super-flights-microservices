/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { Flight, FlightSchema } from './entities/flight.entity';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Flight.name,
        schema: FlightSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
  ],
})
export class FlightsModule {}
