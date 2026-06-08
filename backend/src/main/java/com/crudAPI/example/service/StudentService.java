package com.crudAPI.example.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.crudAPI.example.entity.Students;
import com.crudAPI.example.repository.StudentRepo;

@Service
public class StudentService {

    @Autowired 
    private StudentRepo studentRepo;
    
    public Students addStudent(Students student) throws Exception {
        if (studentRepo.existsById(student.getId())) {
            throw new Exception("ID_ALREADY_EXISTS");
        }
        return studentRepo.save(student);
    }
    
    public List<Students> getAllStudens(){
        return studentRepo.findAll();
    }
    
    public Students updateStudent(Students students) {
        Optional<Students> studentOptional = studentRepo.findById(students.getId());
        if (studentOptional.isPresent()) {
            Students existingStudent = studentOptional.get();
            existingStudent.setAge(students.getAge());
            existingStudent.setDept(students.getDept());
            existingStudent.setName(students.getName());
            return studentRepo.save(existingStudent);
        } else {
            throw new RuntimeException("Student not found with id: " + students.getId());
        }
    }
    
    public Boolean deleteStudent(int id) {
        studentRepo.deleteById(id);
        return true;
    }
}