import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetail } from "../customers/customerDetail"
import { Customers } from "../customers/customers"
import { Employees } from "../employees/employee"
import { HiringForm } from "../employees/hiringForm"
import { LocationList } from "../locations/Locations"
import { ProductForm } from "../products/productForm"
import { ProductList } from "../products/Products"
import { ProductSearch } from "../products/productSearch"

export const ApplicationViews = () => {
	return (<Routes>


		<Route path="locations" element={ <LocationList /> } />
		<Route path="products" element={ <ProductList /> } />
		<Route path="product/create" element={ <ProductForm /> } />
		<Route path="candySearch" element={ <ProductSearch /> } />
		<Route path="hiringForm" element={ <HiringForm /> } />
		<Route path="employees" element={ <Employees /> } />
		<Route path="customers" element={ <Customers /> } />
		<Route path="customers/:customerId" element={ <CustomerDetail /> } />


	</Routes>
	)
}