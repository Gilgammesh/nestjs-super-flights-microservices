import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { PassengerMSG } from 'src/common/constants';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { CreatePassengerDto, UpdatePassengerDto } from './dtos';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Passengers')
@UseGuards(JwtAuthGuard)
@Controller('passengers')
export class PassengersController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}

  private clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(
    @Body() createPassengerDto: CreatePassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassenger.send(
      PassengerMSG.CREATE,
      createPassengerDto,
    );
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this.clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Observable<IPassenger> {
    return this.clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      updatePassengerDto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string): Observable<string> {
    return this.clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }
}
