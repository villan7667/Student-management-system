package com.crudAPI.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crudAPI.example.entity.Students;

public interface StudentRepo
extends JpaRepository<
Students,
Integer
>{

Optional<Students>
findByEmail(
String email
);

Optional<Students>
findByPhone(
String phone
);

}