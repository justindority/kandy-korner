import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"



export const NavBar = () => {
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/locations">Locations</Link>
            </li>
            {
                kandyUserObject.staff 
                
                ?
                <>
                <li className="navbar__item active">
                <Link className="navbar__link" to="/products">Products</Link>
                </li>
                <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employee List</Link>
                </li>
                <li className="navbar__item active">
                <Link className="navbar__link" to="/hiringForm">Hire an Employee</Link>
                </li>
                <li className="navbar__item active">
                <Link className="navbar__link" to="/customers">Customers</Link>
                </li>
                </>
            :
                
                <li className="navbar__item active">
                <Link className="navbar__link" to="/candySearch">Find Candy</Link>
                </li>

            }

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}

