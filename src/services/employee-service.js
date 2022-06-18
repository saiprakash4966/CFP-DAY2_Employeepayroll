
import axios from 'axios';
// const axios = require('axios').default;

class EmployeeService {
    baseURL = "http://localhost:8080/employeepayroll";
    addEmployee = (data) => {
        return axios.post(`${this.baseURL}/create`, data);
    }

    getallEmployee = () => {
        return axios.get(`${this.baseURL}/`);
    }
    getEmployee(employeeID) {
        return axios.get(`${this.baseURL}/get/${employeeID}`);
    }
    
    updateEmployee(employeeID,data) {
        return axios.put(`${this.baseURL}/update/${employeeID}`, data);
    }
    
    deleteEmployee(employeeID) {
        return axios.delete(`${this.baseURL}/delete/${employeeID}`);
    }
}

export default new EmployeeService()