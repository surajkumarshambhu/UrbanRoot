import React, {useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
    TableHead, TableRow, Paper} from '@mui/material';
import './CalculateBill.css';
import Loader from 'react-loader-spinner';
import { ApiHelper } from '../../Helper/APIHelper';
import {Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CalculateBill() {
    const [Order_number,setOrderNumber] = useState("");
    const [loaderPrint, setloaderPrint] = useState({
        loader: false,
    })
    const [saved, setSaved] = useState({
        saved: false,
    })
    const [loader, setLoader] = useState({
        loader: false,
    })
    const [productListArray, setProductListArray] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [loadTable, setLoadTable] = useState(false)
    const [barcodeItems, setBarcodeItems] = useState([]);
    const [orderId, setOrderId] = useState('0');
    const [formData,setFormData] = useState({
        customer_name: "",
        contact_number: "",
    })
    const [totalFormData,setTotalFormData] = useState({
        subtotal:0.0,
        discount:0.0,
        total:0.0,
        ammountRecived:0.0,
        ammountReturned:0.0,
        paymentMethod:"Cash"
    })

    const [open, setOpen] = useState(false);

    const [alertData,setAlertData] = useState({
        message:"",
        type:""
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function handleFormData(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    function handle(e){
        setProductCode(e.target.value)
    }

    function increment(e){
        var newArr = [...productListArray];
        newArr[e].quantity = newArr[e].quantity + 1
        setProductListArray(newArr)
    }

    function decrement(e){
        var newArr = [...productListArray];
        if (newArr[e].quantity === 1){
            return
        }
        newArr[e].quantity = newArr[e].quantity - 1
        setProductListArray(newArr)
    }

    function submit(e){
        e.preventDefault()
        setLoadTable(true)
        const requestBody = {request: {product:[
            {
                barcode:productCode,
                qty:1
            }
        ]}}
        let url = "purchase-products";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setOrderNumber(resposnse.data.invoice_number);
            if(resposnse.data.details.length > 0){
                setLoadTable(false)
                if (productListArray.length !== 0){
                    var found = -1;
                    for(var key in productListArray){
                        if(productListArray[key].id === resposnse.data.details[0].id ){
                            found = key;
                            break;
                        }
                    }
                    if(found >= 0){
                        var newArr = [...productListArray];
                        newArr[found].quantity = newArr[found].quantity + 1;
                        setProductListArray(newArr);
                    }
                    else{
                        setProductListArray(
                            (previousItems) => [...previousItems, {
                                barcode:resposnse.data.details[0].barcode
                                ,quantity:resposnse.data.details[0].quantity,
                                description:resposnse.data.details[0].description
                                ,discount:resposnse.data.details[0].discount
                                ,id:resposnse.data.details[0].id
                                ,item:resposnse.data.details[0].item
                                ,price:resposnse.data.details[0].unit_cost
                                ,total_price:resposnse.data.details[0].total_price
                                ,unit_cost:resposnse.data.details[0].unit_cost
                                ,total:resposnse.data.details[0].unit_cost
                            }]
                        )
                    }
                }
                else{
                    setProductListArray(
                        (previousItems) => [...previousItems, {
                            barcode:resposnse.data.details[0].barcode
                            ,quantity:resposnse.data.details[0].quantity,
                            description:resposnse.data.details[0].description
                            ,discount:resposnse.data.details[0].discount
                            ,id:resposnse.data.details[0].id
                            ,item:resposnse.data.details[0].item
                            ,price:resposnse.data.details[0].unit_cost
                            ,total_price:resposnse.data.details[0].total_price
                            ,unit_cost:resposnse.data.details[0].unit_cost
                            ,total:resposnse.data.details[0].unit_cost
                        }]
                    )
                }
                console.log(productListArray)
            }
            setLoadTable(false)
        })
        setProductCode('')
    }

    useEffect(() => {
        var totalAmount = 0;
        var newArr = [...productListArray];
        for(var key in newArr){
            newArr[key].price = Number(newArr[key].unit_cost * newArr[key].quantity).toFixed(2)
            if(newArr[key].discount > 0){
                var total = newArr[key].unit_cost * newArr[key].quantity * 1.00;
                newArr[key].total = (total - (total * (newArr[key].discount / 100))).toFixed(2)
            }
            else{
                newArr[key].total = (newArr[key].unit_cost * newArr[key].quantity).toFixed(2)
            }
            totalAmount = Number(totalAmount) + Number(newArr[key].total)
        }
        setTotalFormData({
            subtotal:totalAmount.toFixed(0),
            discount:0.00,
            total:totalAmount.toFixed(0),
            ammountRecived:0.00,
            ammountReturned:0.00,
            paymentMethod:totalFormData.paymentMethod
        })
    },[productListArray]);

    function deleteSelectedProduct(barcode){
        const newData = productListArray.filter(product => product.barcode !== barcode);
        setProductListArray(newData)
    }

    function save(){
        var newArr = [...productListArray];
        if (newArr.length !== 0){
            setLoader({
                loader:true
            })

            if(formData.customer_name === ""){
                setAlertData({
                    message: "Please Enter Customer Name",
                    type:"error"
                })
                setLoader({
                    loader: false
                })
                setOpen(true);
                return
            }

            if(formData.contact_number === ""){
                setAlertData({
                    message: "Please Enter Customer Contact Number",
                    type:"error"
                })
                setLoader({
                    loader: false
                })
                setOpen(true);
                return
            }
            const requestBody = {request: {
                customer_name:formData.customer_name,
                customer_contact:formData.contact_number,
                sub_total:totalFormData.subtotal,
                Discount:totalFormData.discount,
                total:totalFormData.total,
                ammountRecived:totalFormData.ammountRecived,
                ammountReturned:totalFormData.ammountReturned,
                payment_method:totalFormData.paymentMethod,
                product:newArr
            }}
            console.log(totalFormData   )
            let url = "save-orders";
            ApiHelper(url,requestBody,'POST')
            .then(resposnse => {
                if(resposnse.success === true){
                    setLoader({
                        loader:false
                    })
                    setSaved({
                        saved: true
                    })
                    setOrderId(resposnse.data.order_id);
                }
                else{
                    setLoader({
                        loader:false
                    })
                }
            })
        }
    }

    function print(){
        if (orderId === '0'){
            return
        }
        setloaderPrint({
            loader:true
        })
        const requestBody = {request: {order_id:orderId}}
        let url = "get-pdfview";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.success === true){
                setloaderPrint({
                    loader:false
                })
                window.open(resposnse.data.url);
            }
            else{
                setloaderPrint({
                    loader:false
                })
            }
        })
    }

    function updateDiscount(e,key){
       console.log(e.target.value)
       var newArr = [...productListArray];
       if(e.target.value > 0){
          newArr[key].discount = e.target.value
       }
       else{
            newArr[key].discount = 0
       }
       setProductListArray(newArr)
    }

    function updateTotalFormData(e,key){
        if(key === "discount"){
            if(e.target.value < 0){
                return
            }
            var totalAmount = 0;
            var newArr = [...productListArray];
            for(var key in newArr){
                totalAmount = Number(totalAmount) + Number(newArr[key].total)
            }
            let finalAmount = Number(totalAmount) - Number(e.target.value)
            setTotalFormData({
                subtotal:totalAmount.toFixed(0),
                discount:e.target.value,
                total:finalAmount.toFixed(0),
                ammountRecived:0.00,
                ammountReturned:0.00,
                paymentMethod:totalFormData.paymentMethod
            })
        }
        if(key==="paymentMethod"){
            setTotalFormData({
                subtotal:totalFormData.subtotal,
                discount:totalFormData.discount,
                total:totalFormData.total,
                ammountRecived:totalFormData.ammountRecived,
                ammountReturned:totalFormData.returnableAmount,
                paymentMethod:e.target.value
            })
            console.log(totalFormData)
        }
        if (key === "ammountRecived"){
            if(e.target.value < 0){
                return
            }
            let returnableAmount = Number(totalFormData.total) - Number(e.target.value)
            if (returnableAmount > totalFormData.total){
                setTotalFormData({
                    subtotal:totalFormData.subtotal,
                    discount:totalFormData.discount,
                    total:totalFormData.total,
                    ammountRecived:e.target.value,
                    ammountReturned:returnableAmount,
                    paymentMethod:totalFormData.paymentMethod
                })
            }
            else{
                setTotalFormData({
                    subtotal:totalFormData.subtotal,
                    discount:totalFormData.discount,
                    total:totalFormData.total,
                    ammountRecived:e.target.value,
                    ammountReturned:returnableAmount * (-1.00),
                    paymentMethod:totalFormData.paymentMethod
                })
            }
        }
    }

    return (
        <>
            <IconContext.Provider value={{ size: '25px' }}>
            <div className='content-page'>
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
                <div className='flex align-items-start'>
                    <div>
                            <h4>#Invoice Number {Order_number}</h4>
                            <p>Urban Roots</p>
                            <p>Ward No. 4</p>
                            <p>Pandu Barabazar</p>
                            <p>Phone: 8876998290</p>
                            <p>GST:- 18AOFPR680IZI</p>
                            <p>Date:- {new Date().toLocaleString()}</p>
                    </div>
                    <form onSubmit={(e) => submit(e)}>
                        <div className='form-group-col'>
                            <label>Customer Name *</label>
                            <input type="text" className="form-control" placeholder="Enter product name" required="required"  id = 'customer_name' value={formData.customer_name} onChange={(e) => handleFormData(e)}/>
                        </div>
                        <div className='form-group-col'>
                            <label>Customer Contact Number *</label>
                            <input type="text" className="form-control" placeholder="Enter product name" required="required"  id = 'contact_number' value={formData.contact_number} onChange={(e) => handleFormData(e)}/>
                        </div>
                    </form>
                    <div className='flex flex-gap10'>
                        <button className='btn' disabled={loader.loader === false ? false : true} onClick={(e) => print()}>
                            {
                                loaderPrint.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                            }
                            {
                                (loaderPrint.loader) === true ? "Getting Pdf" : "Print" 
                            }
                            <AiIcons.AiOutlinePrinter></AiIcons.AiOutlinePrinter>
                        </button>
                        <button className='btn' onClick={(e) => save()} disabled={loader.loader === true ? true : (saved.saved === false ? false : true)}>
                            {
                                loader.loader === true ? <Loader type="Circles" color="#ff" height={20} width={20}  /> : ""
                            }
                            {
                                (loader.loader) === true ? "Saving" : (saved.saved === false ? "Save" : "Saved !")
                            }
                            <AiIcons.AiOutlineSave></AiIcons.AiOutlineSave>
                        </button>
                    </div>
                </div>
                <div className='table-container flex align-items-start flex-gap10 flex-direction'>
                    <div className='enter-barcode' >
                        <form onSubmit={(e) => submit(e)}>
                            <input type="text" className="form-control" placeholder="Enter barcode / Scan barcode" onChange={(e) => handle(e)} id = 'productCode' value={productCode} />
                        </form>
                    </div>
                    <TableContainer component={Paper} sx={{ maxHeight:550 }} >
                    { loadTable ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                        <Table sx={{ minWidth: 900 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item / Description</TableCell>
                                    <TableCell >Unit Cost</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Sub Total</TableCell>
                                    <TableCell align="center">Discount(%)</TableCell>
                                    <TableCell align="center">Total</TableCell>
                                    <TableCell >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {productListArray.map((row,key) => (
                                <TableRow key={key}>
                                    <TableCell align="left">{row.item}</TableCell>
                                    <TableCell align="left">{row.unit_cost}</TableCell>
                                    <TableCell align="center">
                                        <div className='flex'>
                                            <AiIcons.AiOutlinePlusCircle onClick={(e) => increment(key)}></AiIcons.AiOutlinePlusCircle>
                                            {row.quantity}
                                            <AiIcons.AiOutlineMinusCircle onClick={(e) => decrement(key)}></AiIcons.AiOutlineMinusCircle>
                                        </div>
                                    </TableCell>
                                    <TableCell align="center">{row.price}</TableCell>
                                    <TableCell align="center"><input type="number" min={0} max={100} onKeyDown={(event) => {event.preventDefault();}}  value={row.discount} onChange={(e) => updateDiscount(e,key)} className='remove-input-style font-size-30 text-align'/></TableCell>
                                    <TableCell align="center">{row.total}</TableCell>
                                    <TableCell >
                                        <div className='flex unset-justify-content flex-gap10'>
                                            <button className='cardsBoxShadow btn'  onClick={(e) => deleteSelectedProduct(row.barcode)}>
                                                <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    }
                    </TableContainer>
                </div>
                <div className='custom-grid'>
                    <div></div>
                    <TableContainer className='flex'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell >Sub Total</TableCell>
                                    <TableCell><input disabled={true} value={totalFormData.subtotal} className='remove-input-style font-size-20'/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >Discount</TableCell>
                                    <TableCell><input type="number" value={totalFormData.discount} onChange={(e) => updateTotalFormData(e,"discount")} className='remove-input-style font-size-20'/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >Total</TableCell>
                                    <TableCell><input disabled={true} value={totalFormData.total} className='remove-input-style font-size-20'/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >Amount Paid By Customer</TableCell>
                                    <TableCell><input type="number" value={totalFormData.ammountRecived} onChange={(e) => updateTotalFormData(e,"ammountRecived")} className='remove-input-style font-size-20'/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >Returnable Amount To Customer</TableCell>
                                    <TableCell><input disabled={true} value={totalFormData.ammountReturned} className='remove-input-style font-size-20'/></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >Payment Method</TableCell>
                                    <TableCell>
                                        <select className="form-control" required="required" id = 'category' onChange={(e) => updateTotalFormData(e,"paymentMethod")} >
                                            <option value='Cash' selected={true}>Cash Payment</option>
                                            <option value='Upi'>Upi Payment</option>
                                            <option value='Card'>Card Payment</option>
                                        </select>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default CalculateBill
