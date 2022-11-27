import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const navigate = useNavigate();
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [company, setcompany] = useState("")
    const [category, setcategory] = useState("")
    const [error, seterror] = useState(false)


    const saveinfo = async () => {

        if (!name || !price || !company || !category)
        {
            seterror(true);
            return false;
        }


        console.log(name, price, company, category)
        let result = await fetch("http://localhost:8000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, company, category }),
            headers: {
                "Content-Type": "application/json"
            },

        })
        result = await result.json();
        if (result)
        {
            navigate("/");
        }
    }


    return (
        <div>
            <div className='form-container'>
                Add Product
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
                <button className='btn-signup' onClick={saveinfo}> Add Product </button>
            </div>
        </div>
    )
}

export default AddProduct