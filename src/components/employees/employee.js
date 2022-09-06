import { useEffect, useState } from "react"
import "./employee.css"

export const Employees = () => {
    const [employees,updateEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
            .then(response => response.json())
            .then((employeesArray)=>{
                updateEmployees(employeesArray)
            })
            console.log("Initial state of employees", employees)
        }, []
    )

    return employees.map(emp => {
        return <section className="employee" key={emp.id}>
            <header>Employee Name: {emp.user.name}</header>
            <p>Email: {emp.user.email}</p>
            <p>Location: {emp.location.address} {emp.location.city}, {emp.location.state}</p>
        </section>
})
}
