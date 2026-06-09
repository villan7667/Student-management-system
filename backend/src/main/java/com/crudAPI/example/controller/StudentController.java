package com.crudAPI.example.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.crudAPI.example.entity.Students;
import com.crudAPI.example.service.StudentService;


@RestController
public class StudentController {

    @Autowired 
    private StudentService studentService;
    
    
    @PostMapping("/addStudent")
    public ResponseEntity<?> addStudent(@RequestBody Students students) {  
        try {
            Students savedStudent = studentService.addStudent(students);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            if (e.getMessage().equals("ID_ALREADY_EXISTS")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("ID already exists");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
    
    @GetMapping("/getStudents")
    public List<Students> getAllStudents() {
        return studentService.getAllStudens();
    }
    
    @PutMapping("/updateStudent")
    public Students updateStudent(@RequestBody Students students) {
        return studentService.updateStudent(students); 
    }
    
    @DeleteMapping("/deleteStudent/{id}")
    public boolean deleteStudent(@PathVariable int id) {
        return studentService.deleteStudent(id);
    }
}