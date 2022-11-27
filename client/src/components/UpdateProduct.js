import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [company, setcompany] = useState("")
    const [category, setcategory] = useState("")
    const [error, seterror] = useState(false)

    useEffect(() => {
        ProductDetails();
    }, [])


    const ProductDetails = async () => {
        let result = await fetch(`http://localhost:8000/products/${params._id}`)
        result = await result.json();
        console.log(result)
        setname(result.name)
        setcategory(result.category)
        setcompany(result.company)
        setprice(result.price)
    }

    const updateDetails = async () => {
        let result = await fetch(`http://localhost:8000/products/${params._id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, company, category }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        result = await result.json();
        console.log(result)
        navigate("/");
    }


    return (
        <div>
            <div className='form-container'>
                Update Product
                <input className='input-text' type="text"
                    value={name} onChange={(e) => setname(e.target.value.toLocaleUpperCase())} placeholder='Enter Name' />
                {error && !name && <span className='warning'>Enter valid name</span>}
                <input className='input-text' type="text"
                    value={price} onChange={(e) => setprice(e.target.value.toLocaleUpperCase())} placeholder='Enter Price' />
                {error && !price && <span className='warning'>Enter valid price</span>}
                <input className='input-text' type="text"
                    value={company} onChange={(e) => setcompany(e.target.value.toLocaleUpperCase())} placeholder='Enter Company' />
                {error && !company && <span className='warning'>Enter valid company</span>}
                <input className='input-text' type="text"
                    value={category} onChange={(e) => setcategory(e.target.value.toLocaleUpperCase())} placeholder='Enter Category' />
                {error && !category && <span className='warning'>Enter valid category</span>}
                <button className='btn-signup' onClick={updateDetails}> Update Product </button>
            </div>
        </div>
    )
}

export default UpdateProduct