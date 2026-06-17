package com.crudAPI.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.crudAPI.example.entity.Students;
import com.crudAPI.example.repository.StudentRepo;

@Service
public class StudentService {

        private final StudentRepo studentRepo;
        public StudentService(StudentRepo studentRepo) {
                this.studentRepo = studentRepo;
        }
        public Students addStudent(Students student) 
        throws Exception {
                if (studentRepo.findByEmail(student.getEmail()).isPresent())
                        {throw new Exception("Email already exists");}

                if (studentRepo.findByPhone(student.getPhone()).isPresent())
                        {throw new Exception("Phone already exists");}
                
                return studentRepo.save(student);
        }

        public List<Students> getAllStudents() {
                return studentRepo.findAll();
        }

        public Students updateStudent(

                        Students students

        ) {

                Students existingStudent =

                                studentRepo
                                                .findById(
                                                                students.getId())

                                                .orElseThrow(

                                                                () ->

                                                                new RuntimeException(
                                                                                "Student not found")

                                                );

                Optional<Students>

                email =

                                studentRepo
                                                .findByEmail(
                                                                students.getEmail());

                if (

                email.isPresent()

                                &&

                                email.get()
                                                .getId()

                                                !=

                                                students.getId()

                ) {

                        throw new RuntimeException(
                                        "Email already exists");

                }

                Optional<Students>

                phone =

                                studentRepo
                                                .findByPhone(
                                                                students.getPhone());

                if (

                phone.isPresent()

                                &&

                                phone.get()
                                                .getId()

                                                !=

                                                students.getId()

                ) {

                        throw new RuntimeException(
                                        "Phone already exists");

                }

                existingStudent
                                .setName(
                                                students.getName());

                existingStudent
                                .setAge(
                                                students.getAge());

                existingStudent
                                .setDept(
                                                students.getDept());

                existingStudent
                                .setEmail(
                                                students.getEmail());

                existingStudent
                                .setPhone(
                                                students.getPhone());

                existingStudent
                                .setGender(
                                                students.getGender());

                existingStudent
                                .setSemester(
                                                students.getSemester());

                existingStudent
                                .setCgpa(
                                                students.getCgpa());

                existingStudent
                                .setAddress(
                                                students.getAddress());

                existingStudent
                                .setLinkedin(
                                                students.getLinkedin());

                existingStudent
                                .setGithub(
                                                students.getGithub());

                return studentRepo
                                .save(
                                                existingStudent);

        }

        public Boolean deleteStudent(

                        int id

        ) {

                if (

                studentRepo
                                .existsById(
                                                id)

                ) {

                        studentRepo
                                        .deleteById(
                                                        id);

                        return true;

                }

                return false;

        }

}