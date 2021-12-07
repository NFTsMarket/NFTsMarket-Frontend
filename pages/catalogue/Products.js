import Product from './Product.js';
import Alert from './Alert.js';
import { Fragment, useState } from 'react';

function Products(props) {

    const [message, setMessage] = useState(null);
    function onAlertClose() {
        setMessage(null);
    }

    function onProductEdit(product) {
        setMessage(product.title);
    }

    return (
        <Fragment>
            <Alert message={message} onClose={onAlertClose}/>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map((product)=>
                    // TODO: CHANGE KEY TO ID/SLUG
                        <Product key={product.title} product={product} onEdit={onProductEdit}/>
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Products;