import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateFlightDto, UpdateFlightDto } from './dtos';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FlightMSG, PassengerMSG } from 'src/common/constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flights')
@UseGuards(JwtAuthGuard)
@Controller('flights')
export class FlightsController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyFlight = this.clientProxy.clientProxyFlights();
  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() createFlightDto: CreateFlightDto): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.CREATE, createFlightDto);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Observable<IFlight> {
    return this.clientProxyFlight.send(FlightMSG.UPDATE, {
      id,
      updateFlightDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<string> {
    return this.clientProxyFlight.send(FlightMSG.DELETE, id);
  }

  @Post(':id/passenger/:passengerId')
  async addPassenger(
    @Param('id') id: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.clientProxyPassenger
      .send(PassengerMSG.FIND_ONE, passengerId)
      .toPromise();
    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return this.clientProxyFlight.send(FlightMSG.ADD_PASSENGER, {
      id,
      passengerId,
    });
  }
}
