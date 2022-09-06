
export const Product = ({filteredProducts}) =>{

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    return filteredProducts.map(product => {
        return <section className="product" key={product.id}>
            <header>Product: {product.name}</header>
            <p>Price: {product.price}</p>
            {
                localKandyUser.isStaff
                ?
                <footer>Type: {product.productTypes.type}</footer>
                : ""
            }
        </section>
    })
}