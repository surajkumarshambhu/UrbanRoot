import React, { useState, useEffect } from 'react'
import { ApiHelper } from '../Helper/APIHelper'
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

const getProductListRequest = {
    "request":{
        "no_of_records":1000,
        "page_number":1
    }
};

const styles={
    addCategories:{
        backgroundColor: '#32BDEA' ,
        borderColor: '#32BDEA'
    },
    delete:{
        backgroundColor: '#E08DB4' ,
        borderColor: '#E08DB4'
    },
    col:{
        maxWidth: '50%'
    },
    display:{
        display: "block",
    },
    none:{
        display: "none",
    },
}

function Addproduct() {

    const [categoryListArray, setCategoryListArray] = useState([]);
    useEffect(() => {
        let url = "get-categories";
        ApiHelper(url,getProductListRequest,'POST')
        .then(resposnse => {
            setCategoryListArray(resposnse.data.categories_list)
        })
    }, []);

    const [loader, setLoader] = useState({
        loader: false,
    })

    const history = useHistory();
    const [formData,setFormData] = useState({
        id: '',
        category: '0',
        product_name:'',
        cost: '',
        tax_method: 'Inclusive',
        tax: '',
        hsn_code: '',
        quantity: '',
        document_id: '',
        description: '',
        brand_name: '',
        expiry_date:''
    })
    
    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
        console.log(formData);
    }

    function submit(e){
        setLoader({
            loader: true
        })
        e.preventDefault()
        const postData = 
        {
            request: {
                id: '',
                category: formData.category,
                product_name: formData.product_name,
                cost: formData.cost,
                tax_method: formData.tax_method,
                tax: formData.tax,
                hsn_code: formData.hsn_code,
                quantity: formData.quantity,
                document_id: formData.document_id,
                description: formData.description,
                brand_name: formData.brand_name,
                expiry_date: formData.expiry_date
            }
        }
        console.log(formData);
        let url = "add-product";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            if (resposnse.success === false){
                console.log("flase");
                setLoader({
                    loader: false
                 })
            }
            else{
                console.log("true");
                history.push("/productlist");
                setLoader({
                   loader: false
                })
            }
        })
    }

    function reset(e){
        e.target.reset();
    }

    return (
        <div className='add-categories-container'>
                <div className='add-categories-container-header'>
                    <h4>Add Product</h4>
                </div>
                <div className='add-categories-container-body'>
                    <form onSubmit={(e) => submit(e)} onReset={(e) => reset(e)}>
                        <div className='add-categories-container-items'>
                            <div className='form-group-col'>
                                <label>Category *</label>
                                <select className="form-control" required="required" id = 'category'  onChange={(e) => handle(e)} >
                                    <option value='N/A'>N/A</option>
                                    {
                                        (categoryListArray || []).map((item, key) => { 
                                            return <option value={item.id} key = {item.id}>{item.category}</option>
                                        })
                                    }
                                </select> 
                            </div>
                            <div className='form-group-col'>
                                <label>Name *</label>
                                <input type="text" className="form-control" placeholder="Enter product name" required="required" onChange={(e) => handle(e)} id = 'product_name' value={formData.product_name}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Brand Name *</label>
                                <input type="text" className="form-control" placeholder="Enter brand name" required="required" onChange={(e) => handle(e)} id = 'brand_name' value={formData.brand_name}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Cost *</label>
                                <input type="number" className="form-control" placeholder="Enter product cost" required="required" onChange={(e) => handle(e)} id = 'cost' value={formData.cost}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Tax Method *</label>
                                <select className="form-control" required="required" id = 'tax_method'  onChange={(e) => handle(e)} >
                                    <option value="Inclusive">Inclusive</option>
                                </select> 
                            </div>
                            <div className='form-group-col'>
                                <label>Tax *</label>
                                <input type="number" className="form-control" placeholder="Enter tax percentage" onChange={(e) => handle(e)} id = 'tax' value={formData.tax} />
                            </div>
                            <div className='form-group-col'>
                                <label>HSN Code *</label>
                                <input type="number" className="form-control" placeholder="Enter HSN code" required="required" onChange={(e) => handle(e)} id = 'hsn_code' value={formData.hsn_code}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Quantity *</label>
                                <input type="number" className="form-control" placeholder="Enter product name" required="required" onChange={(e) => handle(e)} id = 'quantity' value={formData.quantity}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Product Expiry Date *</label>
                                <input type="date" className="form-control" placeholder="Enter expiry date" required="required" onChange={(e) => handle(e)} id = 'expiry_date' value={formData.expiry_date}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Image *</label>
                                <input type="file" className="form-control image-file" name="pic" accept="image/*"></input>
                            </div>
                            <div className='form-group-col'>
                                <label>Description / Product Details *</label>
                                <textarea className="form-control text-area" rows="4" onChange={(e) => handle(e)} id = 'description' value={formData.description}></textarea>
                            </div>
                        </div>
                        <div className='form-group-row'>
                            <button type="submit" className="btn-primary-style" style={styles.addCategories} disabled={loader.loader}>
                                {
                                    loader.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                                }
                                {
                                    (loader.loader) === true ? "Adding" : "Add Product"
                                }
                            </button>
                            <button type="reset" className="btn-primary-style" style={styles.delete}>Reset</button>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Addproduct
