import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./locations.css"


export const LocationList = () => {
    const [locations, setLocations] = useState([])
    const [products, setProducts] = useState([])
    const [topPriced, setTopPriced] = useState([false])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationsArray)=>{
                setLocations(locationsArray)
            })
            console.log("Initial state of locations", locations)
        },[]
    )

    return <>
    
    <h2>List of Locations</h2>
    <article className="locations">
    {
        locations.map(location => {
            return <section className="location">
                <header>Location: {location.address}
                <p>{location.city}, {location.state}</p>
                </header>
                <p>Square Footage:{location.sqFootage}</p>
            </section>
        })
    }
    </article>

    </>


}