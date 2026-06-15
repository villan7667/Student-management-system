package com.crudAPI.example.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import jakarta.validation.constraints.*;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(
name="students",

uniqueConstraints={

@UniqueConstraint(
columnNames="email"
),

@UniqueConstraint(
columnNames="phone"
)

}

)

public class Students {

@Id

@GeneratedValue(
strategy=
GenerationType.IDENTITY
)

private int id;



@NotBlank(
message=
"Name is required"
)

private String name;



@Min(
value=18,
message=
"Age must be minimum 18"
)

@Max(
value=60,
message=
"Age must be maximum 60"
)

private int age;



@NotBlank(
message=
"Department required"
)

private String dept;



@Email(
message=
"Enter valid email"
)

@NotBlank(
message=
"Email required"
)

@Column(
nullable=false,
unique=true
)

private String email;



@Pattern(

regexp="^[0-9]{10}$",

message=
"Phone must contain 10 digits"

)

@Column(
nullable=false,
unique=true
)

private String phone;



@NotBlank(
message=
"Gender required"
)

private String gender;



@Min(
value=1
)

@Max(
value=8
)

private int semester;



@DecimalMin(
value="0.0"
)

@DecimalMax(
value="10.0"
)

private double cgpa;



@NotBlank(
message=
"Address required"
)

private String address;



private String linkedin;



private String github;



@CreationTimestamp

@Column(
updatable=false
)

private LocalDateTime createdAt;



public Students(){

}



public Students(

int id,

String name,

int age,

String dept,

String email,

String phone,

String gender,

int semester,

double cgpa,

String address,

String linkedin,

String github

){

this.id=id;

this.name=name;

this.age=age;

this.dept=dept;

this.email=email;

this.phone=phone;

this.gender=gender;

this.semester=semester;

this.cgpa=cgpa;

this.address=address;

this.linkedin=linkedin;

this.github=github;

}



public int getId(){
return id;
}

public void setId(
int id
){
this.id=id;
}



public String getName(){
return name;
}

public void setName(
String name
){
this.name=name;
}



public int getAge(){
return age;
}

public void setAge(
int age
){
this.age=age;
}



public String getDept(){
return dept;
}

public void setDept(
String dept
){
this.dept=dept;
}



public String getEmail(){
return email;
}

public void setEmail(
String email
){
this.email=email;
}



public String getPhone(){
return phone;
}

public void setPhone(
String phone
){
this.phone=phone;
}



public String getGender(){
return gender;
}

public void setGender(
String gender
){
this.gender=gender;
}



public int getSemester(){
return semester;
}

public void setSemester(
int semester
){
this.semester=semester;
}



public double getCgpa(){
return cgpa;
}

public void setCgpa(
double cgpa
){
this.cgpa=cgpa;
}



public String getAddress(){
return address;
}

public void setAddress(
String address
){
this.address=address;
}



public String getLinkedin(){
return linkedin;
}

public void setLinkedin(
String linkedin
){
this.linkedin=linkedin;
}



public String getGithub(){
return github;
}

public void setGithub(
String github
){
this.github=github;
}



public LocalDateTime getCreatedAt(){
return createdAt;
}

public void setCreatedAt(
LocalDateTime createdAt
){
this.createdAt=createdAt;
}

}