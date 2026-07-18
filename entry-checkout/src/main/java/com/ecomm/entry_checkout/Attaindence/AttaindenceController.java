package com.ecomm.entry_checkout.Attaindence;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/attendance")
public class AttaindenceController {

    @Autowired
    private AttaindenceService attaindenceService;

    @PostMapping("/employee/{employeeId}")
    public AttaindenceE markAttaindence(@PathVariable Long employeeId, @RequestBody AttaindenceE Attaindence){
        return attaindenceService.markAttaindence(employeeId, Attaindence);
    }
    @GetMapping
    public List<AttaindenceE> getAttaindences() {
        return attaindenceService.getAllAttaindence();
    }
    @GetMapping("/{id}")
    public AttaindenceE getAttendanceById(@PathVariable Long id) {
        return attaindenceService.getAttaindenceById(id);
    }
    @GetMapping("/employee/{employeeId}")
    public List<AttaindenceE> getAttaindencesByEmployee(@PathVariable Long employeeId){
        return attaindenceService.getAttaindenceByEmployee(employeeId);
    }

    @PutMapping("/{id}")
    public AttaindenceE updateAttaindence(@PathVariable Long id, @RequestBody AttaindenceE attaindence) {
        return attaindenceService.updateAttaindence(id, attaindence);
    }

    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable Long id) {
        attaindenceService.deleteAttaindence(id);
    }

    @PostMapping("/employee/{employeeId}/checkin")
    public AttaindenceE checkIn(@PathVariable Long employeeId){
        return attaindenceService.checkIn(employeeId);
    }

    @PutMapping("/employee/{employeeId}/checkout")
    public AttaindenceE checkout(@PathVariable Long employeeId){
        return attaindenceService.checkOut(employeeId);
    }
}