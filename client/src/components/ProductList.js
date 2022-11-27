import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
const ProductList = () => {

    const [products, setproducts] = useState([]);

    useEffect(() => {
        getproducts();
    }, [])

    const getproducts = async () => {
        let result = await fetch("http://localhost:8000/products");
        result = await result.json();
        setproducts(result)
    }

    const deletefield = async (_id) => {
        let deleteproduct = await fetch(`http://localhost:8000/products/${_id}`, {
            method: "delete"
        })
        deleteproduct = await deleteproduct.json();
        if (deleteproduct)
        {
            alert("Field is been deleted")
            getproducts();
        }


    }

    const searchHandle = async (e) => {
        let key = e.target.value.toUpperCase();
        if (key)
        {
            let result = await fetch(`http://localhost:8000/search/${key}`)
            result = await result.json();
            if (result)
            {
                setproducts(result)
            }
        }
        else
        {
            getproducts();
        }

    }

    return (
        <>
            <div>ProductList</div>
            <input type="text" className='search' placeholder='Search Product' onChange={searchHandle} />
            <div className='product-box'>
                <ul>
                    <li className='head'>
                        S No.
                    </li>
                    <li className='head'>
                        Name
                    </li>
                    <li className='head'>
                        Price
                    </li>
                    <li className='head'>
                        Category
                    </li>
                    <li className='head'>
                        Operations
                    </li>
                </ul>
                {
                    products.length > 0 ?
                        products.map((e, i) =>
                            <ul key={e._id}>
                                <li>
                                    {i + 1}
                                </li>
                                <li>
                                    {e.name}
                                </li>
                                <li>
                                    ₹ {e.price}
                                </li>
                                <li>
                                    {e.category}
                                </li>
                                <li>
                                    <button className='delete' onClick={() => deletefield(e._id)}>Delete</button>
                                    <button className='delete'><Link to={"/update/" + e._id}>Update</Link></button>
                                </li>
                            </ul>
                        )
                        : <button className='add-product'><a href='/add'>Add Products</a></button>
                }


            </div>


        </>
    )
}

export default ProductList