import './product-item.css'

function ProductItem(props) {
    const {index, name} = props

    return (
        <li key={index} className='product-item'>
            <h2 className='product-item__name'>{name}</h2>
        </li>
    )
}

export default ProductItem