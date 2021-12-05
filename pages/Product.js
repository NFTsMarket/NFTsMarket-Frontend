
function Product(props) {
    return (
        <div>
            <div>Title : {props.product.title}</div>
            <div>Description : {props.product.description}</div>
        </div>
    )  
}

export default Product;