import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const [productTypes, setProductTypes] = useState([])
    const [product, update] = useState({
        name: "",
        type: "",
        price: ""
    })

    const navigate = useNavigate()


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject= JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
        const productToSendToAPI = {
            name: product.name,
            productTypesId: product.type,
            price: product.price
        }
        
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })

    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productTypes)=>{
                setProductTypes(productTypes)
            })
            console.log("Initial state of productTypes", productTypes)
        },[]
    )

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={product.description}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="text"
                    className="form-control"
                    placeholder="Product Price per Unit (in USD)"
                        value={product.price}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.price = parseInt(event.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Product Type">Price:</label>
                    <select
                    className="form-control"
                        value={product.type}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.type = parseInt(event.target.value)
                                update(copy)
                            }
                        }>
                            <option
                            value={0}
                            >Choose Product Type</option>
                            {
                                productTypes.map(p => <option key={p.id} value={p.id}>{p.type}</option>)
                            }

                        </select>
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}