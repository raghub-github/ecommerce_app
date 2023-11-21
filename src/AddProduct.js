import React, { useState } from 'react';

const AddProductForm = () => {
    const [productData, setProductData] = useState({
        name: '',
        image: [],
        colors: [],
        price: 0,
        featured: false,
        rating: 4.3,
        category: '',
        description: '',
        stock: 0,
        reviews: 99,
        company: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const { value } = e.target;
        setProductData({
            ...productData,
            image: value.split(',').map((link) => link.trim()), // Split by commas and trim whitespace
        });
    };
    const handleColorChange = (e) => {
        const { value } = e.target;
        setProductData({
            ...productData,
            colors: value.split(',').map((link) => link.trim()), // Split by commas and trim whitespace
        });
    };


    const handleFeaturedToggle = () => {
        setProductData({
            ...productData,
            featured: !productData.featured,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/addproduct/addproducts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });
            if (response.status === 201) {
                alert("Product added successfully");
                // Reset the form or perform any other necessary action
                setProductData({
                    name: '',
                    image: [],
                    colors: [],
                    price: 0,
                    featured: false,
                    rating: 4.3,
                    category: '',
                    description: '',
                    stock: 0,
                    reviews: 99,
                    company: '',
                });
            } else {
                console.error('Failed to add the product');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const formStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        marginTop: '15px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f4f4f4',
    };

    const labelStyle = {
        display: 'block',
        margin: '10px 0',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        textTransform: 'none'
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const checkboxStyle = {
        margin: '0 15px 5px',
        transform: 'scale(1.5)', 
      };

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2>Add your new product here</h2>
            <label style={labelStyle}>
                <h3>Name:</h3>
                <div><input style={inputStyle} type="text" name="name" value={productData.name} onChange={handleInputChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Images (comma-separated links):</h3>
                <div><input style={inputStyle} type="text" name="image" value={productData.image.join(', ')} onChange={handleImageChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Colors (comma-separated links):</h3>
                <div><input style={inputStyle} type="text" name="colors" value={productData.colors.join(', ')} onChange={handleColorChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Price:</h3>
                <div><input style={inputStyle} type="number" name="price" value={productData.price} onChange={handleInputChange} required /></div>
            </label>

            <label style={labelStyle}>
                <h3>Category:</h3>
                <div><input style={inputStyle} type="text" name="category" value={productData.category} onChange={handleInputChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Description:</h3>
                <div><textarea name="description" style={inputStyle} value={productData.description} onChange={handleInputChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Stock:</h3>
                <div><input style={inputStyle} type="number" name="stock" value={productData.stock} onChange={handleInputChange} required /></div>
            </label>
            <label style={labelStyle}>
                <h3>Reviews:</h3>
                <div><input style={inputStyle} type="number" name="reviews" value={productData.reviews} onChange={handleInputChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Company:</h3>
                <div><input style={inputStyle} type="text" name="company" value={productData.company} onChange={handleInputChange} /></div>
            </label>
            <label style={labelStyle}>
                <h3>Featured:
                    <input type="checkbox" style={checkboxStyle} checked={productData.featured} onChange={handleFeaturedToggle} />
                </h3>
            </label>
            <div><button style={buttonStyle} type="submit">Add Product</button></div>
        </form>
    );
};

export default AddProductForm;
