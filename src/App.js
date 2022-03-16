import { useState, useEffect } from 'react'
import './App.css'
import Products from './Products'

function App() {
  const [data, setData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [products, setProducts] = useState([])

  const getData = () => {
    fetch('./data.json',
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(responseJson) {
      console.log(responseJson)
      setData(responseJson.data.allProductReference)
    })
    .catch((error) => {
      console.error(error)
    })    
  }

  useEffect(() => {
    getData()
  },[])

  const cleanString = (string) => {
    const accentsFreeString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const lowerCaseString = accentsFreeString.toLowerCase()

    return lowerCaseString
  }

  const matchesValues = (name, value) => {
    let hasResult = true
    const words = value.split(' ')
    words.forEach(word => {
      if (!cleanString(name).includes(cleanString(word))) {
        hasResult = false
      }
    })

    return hasResult
  }

  const filterResults = (value) => {
    setInputValue(value)
    const results = data.filter(product => matchesValues(product.display_name, value))
    
    setProducts(results)
  }

  return (
    <main>
      <form className='form-banner'>
        <input className='form-banner__input' value={inputValue} onChange={(e) => filterResults(e.target.value)} placeholder='Recherchez un produit' />
      </form>
      {
        products && products.length > 0 && (
          <Products products={products} />
        )
      }
    </main>
  );
}

export default App;
