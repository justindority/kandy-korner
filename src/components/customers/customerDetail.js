import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetail = () => {
    const {customerId} = useParams()
    const [customer,updateCustomer] = useState()
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
            .then(r => r.json())
            .then((array) => {
                console.log(array)
                const cust = array[0]
                updateCustomer(cust)
            })
        },[customerId]
    )
        
    return <section className="customer">
        <h3>{customer?.user?.name} Details</h3>
        <div>Email: {customer?.email}</div>
        <div>Loyalty Number: {customer?.loyaltyNumber}</div>
    </section>
}