import React, { useState, useEffect } from 'react'
import { ApiHelper } from '../Helper/APIHelper'
import Loader from 'react-loader-spinner';
import axios from 'axios'
import * as CONSTANT from '../Helper/Constant';

const getProductListRequest = {
    "request":{
        "no_of_records":10,
        "page_number":1
    }
};

const styles={
    addCatagories:{
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
            console.log(resposnse)
            setCategoryListArray(resposnse.data.categories_list)
        })
    }, []);

    const [loader, setLoader] = useState({
        loader: false,
    })

    const [productId,setproductId] = useState()
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

    const [fileData,setFileData] = useState({
        file: '',
        id: '0'
    })

    const [showDiv,setShowDiv] = useState({
        addButton: true,
        uploadImage: false
    })

    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
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
                setproductId(resposnse.data.product_id)
                setLoader({
                   loader: false
                })
                setShowDiv({
                    addButton: false,
                    uploadImage: true
                })
            }
        })
    }

    function reset(e){

    }
    
    function fileUploadHandler(e){
        setLoader({
            loader: true
        })
        let bearer ='';
        if (localStorage.getItem("user") !== null) {
            let usrData = JSON.parse(localStorage.getItem('user') ?? "");
            bearer = 'Bearer '+ usrData.data.user.token ;
        }
        const fd = new FormData()
        fd.append("request[file]",fileData.file,fileData.file.name)
        fd.append("request[product_code]",productId)
        console.log(fd)
        axios.post(CONSTANT.BASEURL + 'upload-doc',fd,{
            headers: {
                'AcceptLanguage': 'en_US',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'clientVersion': 'WEB:1',
                'Authorization': bearer,
            }
        })
        .then(res=>{
            if (res.success === true){
                setLoader({
                    loader: false
                })
            }
            else{
                setLoader({
                    loader: false
                })
            }
        })
    }

    function fileSelectHandler(e){
        setFileData({
            file:e.target.files[0],
            id:'0'
        })
        console.log(fileData);
    }

    useEffect(() => {
        setLoader(true)
        const requestBody = {request: {barcode:"000000200952"}}
        let url = "get-product-details";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.data.product_data.length > 0){
                setFormData({
                    id: resposnse.data.product_data[0].id,
                    category: resposnse.data.product_data[0].categories_id,
                    product_name:resposnse.data.product_data[0].product_name,
                    cost: resposnse.data.product_data[0].cost,
                    tax_method: 'Inclusive',
                    tax: resposnse.data.product_data[0].tax,
                    hsn_code: resposnse.data.product_data[0].hsn_code,
                    quantity: resposnse.data.product_data[0].quantity,
                    document_id: resposnse.data.product_data[0].document_id,
                    description: resposnse.data.product_data[0].description,
                    brand_name: resposnse.data.product_data[0].brand_name,
                    expiry_date: resposnse.data.product_data[0].expiry_date
                })
            }
        })
    },[]);

    return (
        <div className='content-page'>
                <div className='add-Catagories-container-header'>
                    <h4>Add Product</h4>
                </div>
                <div className='add-Catagories-container-body'>
                    <form onSubmit={(e) => submit(e)} onReset={(e) => reset(e)}>
                        <div className='add-Catagories-container-items'>
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
                                <input type="number" className="form-control" placeholder="Enter product cost" required="required" onChange={(e) => handle(e)} id = 'cost' onWheel={(e) => e.target.blur()} value={formData.cost}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Tax Method *</label>
                                <select className="form-control" required="required" id = 'tax_method'  onChange={(e) => handle(e)} >
                                    <option value="Inclusive">Inclusive</option>
                                </select> 
                            </div>
                            <div className='form-group-col'>
                                <label>Tax *</label>
                                <input type="number" className="form-control" placeholder="Enter tax percentage" onChange={(e) => handle(e)} id = 'tax' value={formData.tax} onWheel={(e) => e.target.blur()}/>
                            </div>
                            <div className='form-group-col'>
                                <label>HSN Code *</label>
                                <input type="number" className="form-control" placeholder="Enter HSN code" required="required" onChange={(e) => handle(e)} id = 'hsn_code' value={formData.hsn_code} onWheel={(e) => e.target.blur()}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Quantity *</label>
                                <input type="number" className="form-control" placeholder="Enter product name" required="required" onChange={(e) => handle(e)} id = 'quantity' value={formData.quantity} onWheel={(e) => e.target.blur()}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Product Expiry Date *</label>
                                <input type="date" className="form-control" placeholder="Enter expiry date" onChange={(e) => handle(e)} id = 'expiry_date' value={formData.expiry_date} onWheel={(e) => e.target.blur()}/>
                            </div>
                            <div className='form-group-col'>
                                <label>Description / Product Details *</label>
                                <textarea className="form-control text-area" rows="4" onChange={(e) => handle(e)} id = 'description' value={formData.description}></textarea>
                            </div>
                        </div>
                        {
                            !showDiv.addButton ? <></> : <div className='flex unset-justify-content flex-gap10'>
                                                            <button type="submit" className="btn-primary-style" style={styles.addCatagories} disabled={loader.loader}>
                                                                {
                                                                    loader.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                                                                }
                                                                {
                                                                    (loader.loader) === true ? "Adding" : "Add Product"
                                                                }
                                                            </button>
                                                            <button type="reset" className="btn-primary-style" style={styles.delete}>Reset</button>
                                                        </div>
                        }
                    </form>
                    <br />
                    {
                        !showDiv.uploadImage ? <></> : <div className='form-group-col'>
                                                        <div className='flex unset-justify-content flex-gap10'>
                                                            <input type="file" className="form-control unset-line-height unset-margin" accept="image/*" onChange={(e) => fileSelectHandler(e)}></input>
                                                            <button type="upload" className='btn' onClick={(e) => fileUploadHandler(e)} disabled={!showDiv.uploadImage} >
                                                                {
                                                                    loader.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                                                                }
                                                                {
                                                                    (loader.loader) === true ? "Uploading" : "Upload Image"
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                    }
                </div>
        </div>
    )
}

export default Addproduct
