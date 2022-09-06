import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./customers.css"


export const Customers = () => {
    const [customers,setCustomers] = useState()

    useEffect(
        ()=>{
            fetch(`http://localhost:8088/customers?_expand=user`)
            .then(response => response.json())
            .then((customersArray)=>{
                setCustomers(customersArray)
            })
            console.log("Initial state of locations", customers)
        },[]
    )

    return <>
    <h2>List of Customers</h2>
    <article className="customers">
    {
        customers?.map(c => {
            return <section className="customer" key={c.id}>
                <Link to={`/customers/${c.id}`}>Name: {c.user.name} </Link>
                <p>Email: {c.user.email} </p>
                <p>Loyalty Number: {c.loyaltyNumber}</p>
            </section>
        })
    }
    </article></>
}