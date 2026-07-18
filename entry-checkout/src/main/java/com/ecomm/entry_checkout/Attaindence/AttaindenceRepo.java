package com.ecomm.entry_checkout.Attaindence;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface AttaindenceRepo extends JpaRepository<AttaindenceE , Long>  {
    List<AttaindenceE>findByEmployeeId(Long employeeId);
    Optional<AttaindenceE> findByEmployeeIdAndDate(Long employeeId,LocalDate date);
    
}
