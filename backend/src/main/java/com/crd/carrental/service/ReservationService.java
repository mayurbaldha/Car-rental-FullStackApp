package com.crd.carrental.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crd.carrental.exception.CarNotAvailableException;
import com.crd.carrental.model.Car;
import com.crd.carrental.model.Reservation;
import com.crd.carrental.repository.CarRepository;
import com.crd.carrental.repository.ReservationRepository;

@Service
public class ReservationService {
    @Autowired
    private CarRepository carRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Transactional
    public Reservation createReservation(Long userId, Car.CarType cartype, LocalDateTime startDateTime, int days) {
        // Check if the car is available
        List<Car> availableCars = carRepository.findByTypeAndIsAvailableTrue(cartype);
        if(availableCars.isEmpty()) {
            throw new CarNotAvailableException("No available cars of type: " + cartype);
        }
        // Mark the car as unavailable
        Car car = availableCars.get(0);
        car.setAvailable(false);
        Car savedCar = carRepository.saveAndFlush(car); // Ensure managed entity with id

        // Save the reservation
        Reservation reservation = new Reservation();
        reservation.setCar(savedCar); // Use managed entity
        reservation.setUserId(userId);
        reservation.setStartDateTime(startDateTime);
        reservation.setEndDateTime(startDateTime.plusDays(days)); // Ensure endDateTime is set
        reservation.setStatus(Reservation.ReservationStatus.ACTIVE);
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findAll()
                .stream()
                .filter(reservation -> reservation.getUserId().equals(userId))
                .toList();
    }

}
