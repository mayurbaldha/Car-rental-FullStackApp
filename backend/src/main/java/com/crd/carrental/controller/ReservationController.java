package com.crd.carrental.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crd.carrental.model.Car;
import com.crd.carrental.model.Reservation;
import com.crd.carrental.service.ReservationService;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public Reservation createReservation(@RequestParam Long userId,@RequestParam Car.CarType carType,@RequestParam String startDateTime,@RequestParam int days) {
        long timestamp = Long.parseLong(startDateTime);
        LocalDateTime dateTime = LocalDateTime.ofInstant(
                java.time.Instant.ofEpochMilli(timestamp),
                java.time.ZoneId.systemDefault()
        );
        return reservationService.createReservation(userId, carType, dateTime,  days);
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getReservations(@PathVariable Long userId) {
        return reservationService.getReservationsByUser(userId);
    }
}
