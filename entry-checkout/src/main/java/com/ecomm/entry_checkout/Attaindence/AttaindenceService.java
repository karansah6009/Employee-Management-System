package com.ecomm.entry_checkout.Attaindence;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecomm.entry_checkout.Employee;
import com.ecomm.entry_checkout.EmployeeService;

@Service
public class AttaindenceService {
    @Autowired
    private AttaindenceRepo attaindenceRepo;
    
    @Autowired
    private EmployeeService employeeService;

    public AttaindenceE markAttaindence(Long employeeId, AttaindenceE attaindence){
        Employee employee = employeeService.getEmployeeById(employeeId);
        attaindence.setEmployee(employee);
        return attaindenceRepo.save(attaindence);
    }

    public List<AttaindenceE> getAllAttaindence() {
        return attaindenceRepo.findAll();
    }
    public AttaindenceE getAttaindenceById(Long id){
        return attaindenceRepo.findById(id).orElseThrow(()-> new RuntimeException("Attendence record not found with id:" + id));
    }
    public List<AttaindenceE> getAttaindenceByEmployee(Long employeeId){
        return attaindenceRepo.findByEmployeeId(employeeId);
    }
    public AttaindenceE updateAttaindence(Long id, AttaindenceE updatedAttaindence){
        AttaindenceE existing = getAttaindenceById(id);
        existing.setDate(updatedAttaindence.getDate());
        existing.setCheckIn(updatedAttaindence.getCheckIn());
        existing.setCheckOut(updatedAttaindence.getCheckOut());
        existing.setStatus(updatedAttaindence.getStatus());
        return attaindenceRepo.save(existing);
    }
    public String deleteAttaindence(Long id){
        attaindenceRepo.deleteById(id);
        return "Attendence record with id: " + id + " has been deleted successfully.";
    }

   public AttaindenceE checkIn (Long employeeId){
        Employee employee = employeeService.getEmployeeById(employeeId);
        LocalDate today = LocalDate.now();
        // Check if the employee has already checked in today
        attaindenceRepo.findByEmployeeIdAndDate(employeeId,today)
        .ifPresent(a ->{throw new RuntimeException("Already checked in today");});
        AttaindenceE attaindence = new AttaindenceE();
        attaindence.setEmployee(employee);
        attaindence.setDate(today);
        attaindence.setCheckIn(LocalTime.now());
        attaindence.setStatus(AttaindenceStatus.PRESENT);
        return attaindenceRepo.save(attaindence);
    }

    public AttaindenceE checkOut(Long employeeId){
       LocalDate today = LocalDate.now();
       AttaindenceE attaindence = attaindenceRepo.findByEmployeeIdAndDate(employeeId,today)
       .orElseThrow(()->new RuntimeException("No check-in record found for today")); 
       attaindence.setCheckOut(LocalTime.now());
       return attaindenceRepo.save(attaindence);
    }
    
} 


