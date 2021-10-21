import React, { useState, useEffect } from 'react'
import { ApiHelper } from '../Helper/APIHelper'
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import axios from 'axios'
import * as CONSTANT from '../Helper/Constant';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import {Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    flex:{
        display: "flex",
    },
}

function Addproduct() {

    const [categoryListArray, setCategoryListArray] = useState([]);
    useEffect(() => {
        let url = "get-categories-add-screen";
        ApiHelper(url,getProductListRequest,'POST')
        .then(resposnse => {
            setCategoryListArray(resposnse.data.categories_list)
        })
    }, []);

    const [loader, setLoader] = useState({
        loader: false,
    })

    const history = useHistory();
    const [productId,setproductId] = useState()
    const [alertData,setAlertData] = useState({
        message:"",
        type:""
    })
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
    const [barcodeType,setBarcodeType] = useState("2")
    const [barcode,setBarcode] = useState("")
    const [state, setState] = React.useState(true);
    const [fileData,setFileData] = useState({
        file: '',
        id: '0'
    })
    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function handleBarcodeChange(e) {
        setBarcode(e.target.value)
    }

    function handle(e){
        e.preventDefault()
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
        if(e.target.id === 'category'){
            if(e.target.value === "38"){
                setBarcode("")
                setState(false)
                setBarcodeType("1")
            }
            else{
                setState(true)
                setBarcodeType("2")
            }
        }
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
                expiry_date: formData.expiry_date,
                barcode: barcodeType === '1' ? "" : barcode,
                barcode_type: barcodeType,
            }
        }
        if (barcodeType === "2"){
            if (barcode === ""){
                setAlertData({
                    message: "Please scan / Enter the compnay barcode",
                    type:"error"
                })
                setOpen(true);
                setLoader({
                    loader: false
                })
                return
            }
        }
        let url = "add-product";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            if (resposnse.success === false){
                setLoader({
                    loader: false
                 })
            }
            else{
                history.push("/productlist");
                setproductId(resposnse.data.product_id)
                setLoader({
                   loader: false
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
    }
    
    return (
        <div className='content-page padding-10'>
            <Snackbar open={open} 
                autoHideDuration={1500} 
                anchorOrigin={ {
                vertical: 'bottom',
                horizontal: 'right',
                }} onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={alertData.type} sx={{ width: '100%' }}>
                    {alertData.message}
                </Alert>
            </Snackbar>
            <div className='flex unset-justify-content align-items-start flex-gap10'>
                <div className='flex-grow-4 cardboxshadows padding-10'>
                    <h4>Add Product</h4>
                    <form onSubmit={(e) => submit(e)} onReset={(e) => reset(e)} className='flex-grow-4'>
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
                        <div className='flex unset-justify-content flex-gap10'>
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
                    </form>
                </div>
                <div className='flex-grow-3 cardboxshadows padding-10'>
                        <h4>Add / Create Barcode</h4>
                        <div>
                            <div className='flex text-align'>
                                <h2>Create your own barcode</h2>
                                <Switch 
                                    checked={state}
                                    color="secondary"
                                />
                                <h2>Use compnay barcode</h2>
                            </div>
                            <div className='flex padding-10'  style={state == false ? styles.none : styles.flex}>
                                <TextField
                                    onChange={(e) => handleBarcodeChange(e)}
                                    className='flex-grow-1 padding-10'
                                    id="outlined-textarea"
                                    label="Scan / Enter Barcode"
                                    placeholder="Placeholder"
                                    multiline
                                />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Addproduct
