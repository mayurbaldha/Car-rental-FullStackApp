package com.crd.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crd.carrental.model.Car;
import com.crd.carrental.repository.CarRepository;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    @Autowired
    private CarRepository carRepository;

    @GetMapping("/available")
    public List<Car> getAvailableCars() {
            return carRepository.findByIsAvailableTrue();
       
    }
}
