package com.crd.carrental;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.crd.carrental.exception.CarNotAvailableException;
import com.crd.carrental.model.Car;
import com.crd.carrental.model.Reservation;
import com.crd.carrental.repository.CarRepository;
import com.crd.carrental.repository.ReservationRepository;
import com.crd.carrental.service.ReservationService;

@ExtendWith(MockitoExtension.class)
public class ReservationServiceTest {

    @Mock
    private CarRepository carRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Car testCar;
    private Reservation testReservation;

    @BeforeEach
    void setUp() {
        testCar = new Car();
        testCar.setId(1L);
        testCar.setType(Car.CarType.SEDAN);
        testCar.setAvailable(true);

        testReservation = new Reservation();
        testReservation.setId(1L);
        testReservation.setCar(testCar);
        testReservation.setUserId(1L);
        testReservation.setStatus(Reservation.ReservationStatus.ACTIVE);
    }

    @Test
    public void testCreateReservation_Success() {
        // Arrange
        when(carRepository.findByTypeAndIsAvailableTrue(Car.CarType.SEDAN)).thenReturn(List.of(testCar));
        when(carRepository.saveAndFlush(any(Car.class))).thenReturn(testCar);
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Act
        Reservation reservation = reservationService.createReservation(1L, Car.CarType.SEDAN, LocalDateTime.now(), 5);

        // Assert
        assertNotNull(reservation);
        assertFalse(reservation.getCar().isAvailable());
        assertEquals(Reservation.ReservationStatus.ACTIVE, reservation.getStatus());
        verify(carRepository, times(1)).findByTypeAndIsAvailableTrue(Car.CarType.SEDAN);
        verify(carRepository, times(1)).saveAndFlush(testCar);
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }

    @Test
    public void testCreateReservation_CarNotAvailable() {
        // Arrange
        when(carRepository.findByTypeAndIsAvailableTrue(Car.CarType.VAN)).thenReturn(Collections.emptyList());

        // Act & Assert
        assertThrows(CarNotAvailableException.class, () -> {
            reservationService.createReservation(1L, Car.CarType.VAN, LocalDateTime.now(), 5);
        });

        verify(carRepository, times(1)).findByTypeAndIsAvailableTrue(Car.CarType.VAN);
        verify(carRepository, never()).saveAndFlush(any());
        verify(reservationRepository, never()).save(any());
    }

    @Test
    public void testGetReservationsByUser() {
        // Arrange
        Reservation anotherReservation = new Reservation();
        anotherReservation.setUserId(2L); // Different user
        when(reservationRepository.findAll()).thenReturn(List.of(testReservation, anotherReservation));

        // Act
        List<Reservation> result = reservationService.getReservationsByUser(1L);

        // Assert
        assertEquals(1, result.size());
        assertEquals(1L, result.get(0).getUserId());
        verify(reservationRepository, times(1)).findAll();
    }
}
