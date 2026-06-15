package com.crudAPI.example.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.crudAPI.example.entity.Students;

import com.crudAPI.example.service.StudentService;

@CrossOrigin(origins = "*")

@RestController

@RequestMapping("/students")

public class StudentController {

    private final StudentService studentService;

    public StudentController(
            StudentService studentService) {

        this.studentService = studentService;

    }

    @PostMapping

    public ResponseEntity<?> addStudent(

            @Valid

            @RequestBody

            Students students

    ) {

        try {

            Students savedStudent =

                    studentService
                            .addStudent(
                                    students);

            return ResponseEntity
                    .status(
                            HttpStatus.CREATED)
                    .body(
                            savedStudent);

        }

        catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.CONFLICT)
                    .body(
                            e.getMessage());

        }

    }

    @GetMapping

    public ResponseEntity<List<Students>>

            getAllStudents() {

        return ResponseEntity
                .ok(

                        studentService
                                .getAllStudents()

                );

    }

    @PutMapping

    public ResponseEntity<?>

            updateStudent(

                    @Valid

                    @RequestBody

                    Students students

    ) {

        try {

            Students updatedStudent =

                    studentService
                            .updateStudent(
                                    students);

            return ResponseEntity
                    .ok(
                            updatedStudent);

        }

        catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND)
                    .body(
                            e.getMessage());

        }

    }

    @DeleteMapping("/{id}")

    public ResponseEntity<?>

            deleteStudent(

                    @PathVariable

                    int id

    ) {

        boolean deleted =

                studentService
                        .deleteStudent(
                                id);

        if (

        deleted

        ) {

            return ResponseEntity
                    .ok(
                            "Student deleted successfully");

        }

        return ResponseEntity
                .status(
                        HttpStatus.NOT_FOUND)
                .body(
                        "Student not found");

    }

}