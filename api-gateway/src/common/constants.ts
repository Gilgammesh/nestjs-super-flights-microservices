export enum RabbitMQ {
  USER_QUEUE = 'users',
  PASSENGER_QUEUE = 'passengers',
  FLIGHT_QUEUE = 'flights',
}

export enum UserMSG {
  CREATE = 'createUser',
  FIND_ALL = 'findAllUsers',
  FIND_ONE = 'findOneUser',
  UPDATE = 'updateUser',
  DELETE = 'deleteUser',
  VALID = 'validUser',
}

export enum PassengerMSG {
  CREATE = 'createPassenger',
  FIND_ALL = 'findAllPassengers',
  FIND_ONE = 'findOnePassenger',
  UPDATE = 'updatePassenger',
  DELETE = 'deletePassenger',
}

export enum FlightMSG {
  CREATE = 'createFlight',
  FIND_ALL = 'findAllFlights',
  FIND_ONE = 'findOneFlight',
  UPDATE = 'updateFlight',
  DELETE = 'deleteFlight',
  ADD_PASSENGER = 'addPassenger',
}
