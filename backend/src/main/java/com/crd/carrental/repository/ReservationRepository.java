package com.crd.carrental.repository;

import com.crd.carrental.model.Car;
import com.crd.carrental.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCarIdAndStatus(Long carId, Reservation.ReservationStatus status);
}
