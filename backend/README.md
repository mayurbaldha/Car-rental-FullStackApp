## Overview
This application simulates a car rental system using object-oriented principles and Spring Boot. It allows users to reserve cars of specific types for a given period, manages car availability, and enforces inventory limits.

---

## Architecture

- **Models**
  - `Car`: Represents a car, with type (`SEDAN`, `SUV`, `VAN`), license plate, and availability.
  - `Reservation`: Represents a reservation, linking a user to a car for a time period.
  - `User`: Represents a customer.

- **Repositories**
  - `CarRepository`: Data access for cars.
  - `ReservationRepository`: Data access for reservations.

- **Services**
  - `ReservationService`: Business logic for creating, cancelling, and querying reservations.

- **Controllers**
  - `ReservationController`: REST API for reservation operations.

---

## Key Features

- Reserve a car of a specific type for a given date/time and duration.
- Only available cars can be reserved; inventory is limited.
- Cancel reservations and release cars back to inventory.
- Query reservations by user.

---

## API Usage

### 1. Create Reservation
**Endpoint:** `POST /api/reservations`
**Parameters:**
- `userId` (Long)
- `carType` (SEDAN, SUV, VAN)
- `startDateTime` (timestamp in ms)
- `days` (int)

**Example:**
```
POST /api/reservations?userId=1&carType=SEDAN&startDateTime=1756210240231&days=5
```


### 2. Get Reservations by User
**Endpoint:** `GET /api/reservations/user/{userId}`

---

## How to Run

1. Ensure Java and Gradle are installed.
2. Start the application:
   ```sh
   ./gradlew bootRun
   ```
3. Access the API using tools like Postman or curl.

---

## How to Test

Run unit tests:
```sh
./gradlew test
```
Tests are located in `src/test/java/com/crd/carrental/ReservationServiceTest.java`.

---

## Maintenance Guidelines

- Keep model and database schema in sync.
- Update unit tests when business logic changes.
- Document new endpoints and features in this file.
