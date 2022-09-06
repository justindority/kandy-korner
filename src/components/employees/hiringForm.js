import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const HiringForm = () => {
    const [newEmp,updateEmp] = useState({
        name: "",
        location: "",
        date: "",
        rate: "",
        email: ""
    })
    const [users, setUsers] = useState()
    const [locations, setLocations] = useState()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationsArray)=>{
                setLocations(locationsArray)
            })
            console.log("Initial state of locations", locations)
    },[])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
            .then(response => response.json())
            .then((usersArray)=>{
                setUsers(usersArray)
            })
            console.log("Initial state of locations", users)
        },[]
    )


    const handleSaveButtonClick = () => {
        if(newEmp.name && newEmp.location && newEmp.date && newEmp.rate){

        const newUser = {
            name: newEmp.name,
            email: newEmp.email,
            isStaff: true
        }

        const newEmployee = {
            startDate: newEmp.date,
            payRate: newEmp.rate,
            locationId: newEmp.location,
            userId: users.length + 1
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then(() => {
                
                return fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEmployee)
                })
                    .then(response => response.json())
                    .then(() => {
                        navigate("/employees")
     
                    })

            })

        } else {

        }
    }


    return (
        <>
        <form className="hiringForm">
        <h2 className="hiringForm__title">New Employee</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Employee Name"
                    value={newEmp?.name}
                    onChange={
                        (event) => {
                            const copy = {...newEmp}
                            copy.name = event.target.value
                            updateEmp(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="Location">Location:</label>
                    <select
                    className="form-control"
                        value={newEmp?.location}
                        onChange={
                            (event) => {
                                const copy = {...newEmp}
                                copy.location = parseInt(event.target.value)
                                updateEmp(copy)
                            }
                        }>
                            <option
                            value={0}
                            >Choose location:</option>
                            {
                                locations?.map(l => <option key={l.id} value={l.id}>{l.address}, {l.city}</option>)
                            }

                        </select>
                </div>
            </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Date:</label>
                <input type="date"
                    value={newEmp?.date}
                    onChange={
                        (event) => {
                            const copy = {...newEmp}
                            copy.date = event.target.value
                            updateEmp(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="rate">Pay Rate:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="0"
                    value={newEmp?.rate}
                    onChange={
                        (event) => {
                            const copy = {...newEmp}
                            copy.rate = event.target.value
                            updateEmp(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    required autoFocus
                    type="email"
                    className="form-control"
                    placeholder=""
                    value={newEmp.email}
                    onChange={
                        (event) => {
                            const copy = {...newEmp}
                            copy.email = event.target.value
                            updateEmp(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button 
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
            Hire Employee
        </button>
    </form>
    </>
)}