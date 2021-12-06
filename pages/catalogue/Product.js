
function Product(props) {
    return (
        <tr>
            <td>{props.product.title}</td>
            <td>{props.product.description}</td>
            <td>
                <button onClick={() => props.onEdit(props.product)}>Edit</button>
                <button onClick={() => props.onDelete(props.product)}>Delete</button>
            </td>
        </tr>
    )  
}

export default Product;