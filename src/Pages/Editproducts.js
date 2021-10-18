import React, { useState, useEffect } from 'react'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { ApiHelper } from '../Helper/APIHelper'
import Loader from 'react-loader-spinner';
import axios from 'axios'
import * as CONSTANT from '../Helper/Constant';
import {Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    disabledColor:{
        backgroundColor: "#DCDFED"
    },
    flex:{
        display: "flex",
    },
}

function Editproducts() {

    const [showDiv,setShowDiv] = useState({
        addButton: true,
        uploadImage: true
    })
    const [loader, setLoader] = useState({
        loader: false,
    })
    const [fileData,setFileData] = useState({
        file: '',
        id: '0'
    })
    const [showPrintDiv, setPrintDiv] = useState(false);
    const [formData,setFormData] = useState({
        id: '',
        categories_id: '',
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
        expiry_date:'',
        barcode:'',
        barcode_type:''
    })
    const [alertData,setAlertData] = useState({
        message:"",
        type:""
    })
    const [barcodeType,setBarcodeType] = useState("2")
    const [barcode,setBarcode] = useState("")
    const [state, setState] = useState(false);
    
    const [open, setOpen] = useState(false);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function handle(e){ 
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    function handleBarcodeChange(e) {
        setBarcode(e.target.value)
    }

    function submit(e){
        // setLoader({
        //     loader: true
        // })
        e.preventDefault()
        const postData = 
        {
            request: {
                id: formData.id,
                category: formData.categories_id,
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
                barcode: barcodeType === '1' ? formData.barcode : barcode,
                barcode_type: formData.barcode_type
            }
        }
        if (barcodeType === "2"){
            if (barcode === ""){
                setAlertData({
                    message: "Please scan / Enter the compnay barcode",
                    type:"error"
                })
                setOpen(true);
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
                setLoader({
                   loader: false
                })
            }
        })
    }
    
    useEffect(() => {
        setPrintDiv(true);
        if (localStorage.getItem("editId") === null) {
            return
        }
        const requestBody = {request: {barcode: localStorage.getItem("editId")}}
        let url = "get-product-details";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.data.product_data.length > 0){
                setFormData({
                    id: resposnse.data.product_data[0].id,
                    category: resposnse.data.product_data[0].category,
                    categories_id: resposnse.data.product_data[0].categories_id,
                    product_name:resposnse.data.product_data[0].product_name,
                    cost: resposnse.data.product_data[0].cost,
                    tax_method: 'Inclusive',
                    tax: resposnse.data.product_data[0].tax,
                    hsn_code: resposnse.data.product_data[0].hsn_code,
                    quantity: resposnse.data.product_data[0].quantity,
                    document_id: resposnse.data.product_data[0].document_id,
                    description: resposnse.data.product_data[0].description,
                    brand_name: resposnse.data.product_data[0].brand_name,
                    expiry_date: resposnse.data.product_data[0].expiry_date,
                    barcode: resposnse.data.product_data[0].barcode,
                    barcode_type: resposnse.data.product_data[0].barcode_type
                })
                if(resposnse.data.product_data[0].categories_id === 38){
                    setBarcode("")
                    setState(false)
                }
                else{
                    setBarcode(resposnse.data.product_data[0].barcode)
                    setState(true)
                }
                setPrintDiv(false);
            }
            else{
                setPrintDiv(false);
            }
        })
        state == false ? setBarcodeType("1") : setBarcodeType("2")
    },[]);
    
    function fileSelectHandler(e){
        setFileData({
            file:e.target.files[0],
            id:'0'
        })
    }

    function fileUploadHandler(e){
        e.preventDefault();
        setLoader({
            loader: true
        })
        let bearer ='';
        if (localStorage.getItem("user") !== null) {
            let usrData = JSON.parse(localStorage.getItem('user') ?? "");
            bearer = 'Bearer '+ usrData.data.user.token ;
        }
        const fd = new FormData()
        if (fileData.file.length !== 0){
            fd.append("request[file]",fileData.file,fileData.file.name)
        }
        fd.append("request[product_code]",formData.barcode)
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
                    <div className=''>
                        <h4>Edit Product</h4>
                    </div>
                    <div className='add-Catagories-container-body'>
                        {
                            showPrintDiv ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                            <form onSubmit={(e) => submit(e)} >
                            <div className='add-Catagories-container-items'>
                                <div className='form-group-col'>
                                    <label>Category *</label>
                                    <input type="text" className="form-control" disabled={true} style={styles.disabledColor} value={formData.category}/>
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
                                    <input type="number" className="form-control" placeholder="Enter product cost" required="required" min="0"  onWheel={(e) => e.target.blur()} onChange={(e) => handle(e)} id = 'cost' value={formData.cost}/>
                                </div>
                                <div className='form-group-col'>
                                    <label>Tax Method *</label>
                                    <select className="form-control" required="required" id = 'tax_method'  onChange={(e) => handle(e)} >
                                        <option value="Inclusive">Inclusive</option>
                                    </select> 
                                </div>
                                <div className='form-group-col'>
                                    <label>Tax *</label>
                                    <input type="number" className="form-control" placeholder="Enter tax percentage" onChange={(e) => handle(e)} id = 'tax' value={formData.tax} onWheel={(e) => e.target.blur()} />
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
                                        (loader.loader) === true ? "Updating" : "Update Product"
                                    }
                                </button>
                            </div>
                        </form>
                        }
                        <form onSubmit={(e) => fileUploadHandler(e)}>
                            <div className='form-group-col'>
                                <div className='flex unset-justify-content flex-gap10'>
                                    <input type="file" className="form-control unset-line-height unset-margin" accept="image/*" onChange={(e) => fileSelectHandler(e)}></input>
                                    <button type="upload" className='btn' disabled={!showDiv.uploadImage} >
                                        {
                                            loader.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                                        }
                                        {
                                            (loader.loader) === true ? "Uploading" : "Upload Image"
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                        <br />
                    </div>
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
                                    value={barcode}
                                />
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )

}

export default Editproducts