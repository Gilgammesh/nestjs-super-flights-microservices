export enum RabbitMQ {
  FLIGHT_QUEUE = 'flights',
}

export enum FlightMSG {
  CREATE = 'createFlight',
  FIND_ALL = 'findAllFlights',
  FIND_ONE = 'findOneFlight',
  UPDATE = 'updateFlight',
  DELETE = 'deleteFlight',
  ADD_PASSENGER = 'addPassenger',
}
