package com.ecomm.entry_checkout;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepository;

    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }
    public Employee updateEmployee(Long id, Employee updatedEmployee){
        Employee existing = getEmployeeById(id);
        existing.setName(updatedEmployee.getName());
        existing.setDept(updatedEmployee.getDept());
        return employeeRepository.save(existing);
    }

    public void deleteEmployee(Long id){
        employeeRepository.deleteById(id);
    }
}
