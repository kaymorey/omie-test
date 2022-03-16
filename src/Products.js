import './products.css'
import ProductItem from './ProductItem'

function Products(props) {
    const {products} = props

    return (
        <ul className='products'>
            {products.map((product, index) => (
                <ProductItem index={index} name={product.display_name} />
            ))}
        </ul>
    )
}

export default Products