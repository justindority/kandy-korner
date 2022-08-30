import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/Locations"
import { ProductForm } from "../products/productForm"
import { ProductList } from "../products/Products"

export const ApplicationViews = () => {
	return (<Routes>


		<Route path="locations" element={ <LocationList /> } />
		<Route path="products" element={ <ProductList /> } />
		<Route path="product/create" element={ <ProductForm /> } />
	</Routes>
	)
}
