import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Product } from "./Product"
import "./products.css"


export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])
    const [topPriced, setTopPriced] = useState([false])
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productTypes`)
            .then(response => response.json())
            .then((productsArray)=>{
                setProducts(productsArray)
                setFiltered(productsArray)
            })
            console.log("Initial state of products", products)
        },[]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productTypesArray)=>{
                setProductTypes(productTypesArray)
            })
            console.log("Initial state of product Types", productTypes)
        },[]
    )

    useEffect(
        () => {
            if(topPriced){
                const topPricedProducts = products.filter(product => product.price >= 2)
                setFiltered(topPricedProducts)
            } else {
                setFiltered(products)
            }
        },[topPriced]
    )

    return <>
    <button onClick={()=>{setTopPriced(true)}}>Top Priced</button>
    <button onClick={()=>{setTopPriced(false)}}>See All</button>
    <h2>List of Products</h2>
    <article className="products">
    <button onClick={() => navigate("/product/create")}>Create Product</button>
    <Product filteredProducts={filteredProducts} />
    </article>

    </>
}