import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightsService } from './flights.service';
import { CreateFlightDto, UpdateFlightDto } from './dtos';
import { FlightMSG } from 'src/common/constants';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @MessagePattern(FlightMSG.CREATE)
  create(@Payload() createFlightDto: CreateFlightDto) {
    return this.flightsService.create(createFlightDto);
  }

  @MessagePattern(FlightMSG.FIND_ALL)
  findAll() {
    return this.flightsService.findAll();
  }

  @MessagePattern(FlightMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.flightsService.findOne(id);
  }

  @MessagePattern(FlightMSG.UPDATE)
  update(
    @Payload()
    { id, updateFlightDto }: { id: string; updateFlightDto: UpdateFlightDto },
  ) {
    return this.flightsService.update(id, updateFlightDto);
  }

  @MessagePattern(FlightMSG.DELETE)
  remove(@Payload() id: string) {
    return this.flightsService.remove(id);
  }

  @MessagePattern(FlightMSG.ADD_PASSENGER)
  addPassenger(
    @Payload() { id, passengerId }: { id: string; passengerId: string },
  ) {
    return this.flightsService.addPassenger(id, passengerId);
  }
}
