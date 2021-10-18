import React, {useEffect,useState} from 'react'
import { styled } from '@mui/material/styles';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
    TableHead, TableRow, Paper} from '@mui/material';
import './CalculateBill.css';
import Loader from 'react-loader-spinner';
import { ApiHelper } from '../../Helper/APIHelper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#32BDEA",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    }));
    
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function CalculateBill() {

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
    })
    const [disc,setDisc] = useState(0.0)

    function handleFormData(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    function handle(e){
        setProductCode(e.target.value)
    }

    function submit(e){
        e.preventDefault()
        const requestBody = {request: {product:[
            {
                barcode:productCode,
                qty:1
            }
        ]}}
        let url = "purchase-products";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.data.details.length > 0){
                setBarcodeItems(
                    (previousItems) => [...previousItems, {barcode:productCode,qty:1}]
                )
            }
        })
        setProductCode('')
    }

    useEffect(() => {
        setLoadTable(true)
        const requestBody = {request: {product:barcodeItems}}
        let url = "purchase-products";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.data.details.length > 0){
                setProductListArray(
                    resposnse.data.details
                )
                setTotalFormData({
                    subtotal:resposnse.data.sub_total,
                    discount:0.0,
                    total:resposnse.data.sub_total,
                })
            }
            else if(resposnse.data.details.length === 0){
                setTotalFormData({
                    subtotal:resposnse.data.sub_total,
                    discount:0.0,
                    total:resposnse.data.sub_total,
                }) 
            }
            setLoadTable(false)
        })
    },[barcodeItems]);

    function deleteSelectedProduct(barcode){
        const newData = productListArray.filter(product => product.barcode !== barcode);
        setProductListArray(newData)
        const newData1 = barcodeItems.filter(product => product.barcode !== barcode);
        setBarcodeItems(newData1)
    }

    function save(){
        if (barcodeItems.length !== 0){
            setLoader({
                loader:true
            })
            const requestBody = {request: {
                customer_name:formData.customer_name,
                customer_contact:formData.contact_number,
                sub_total:totalFormData.subtotal,
                Discount:totalFormData.discount,
                total:totalFormData.total,
                product:barcodeItems
            }}
            console.log(requestBody)
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

    function handleDisChange(e){
        setDisc(e.target.value)
        if(disc < 0){
            setDisc(0.0)
        }
    }

    useEffect(() => {
        let total = totalFormData.subtotal - disc
        setTotalFormData({
            subtotal: totalFormData.subtotal,
            discount:disc,
            total: total
        })
    },[disc])

    return (
        <>
            <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <div className='content-page'>
                <div className='flex align-items-start'>
                    <div>
                            <h4>#Invoice Number 00001</h4>
                            <p>Urban Roots</p>
                            <p>Ward No. 4</p>
                            <p>Pnadu Barabazar</p>
                            <p>Phone: 8876998290</p>
                            <p>GST:- 18AOFPR680IZI</p>
                            <p>Date:- {new Date().toLocaleString()}</p>
                    </div>
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
                <div className='table-container flex align-items-start flex-gap10'>
                    <div className='flex'>
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
                    </div>
                    <div>
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
                                        <StyledTableCell>Item / Description</StyledTableCell>
                                        <StyledTableCell >Unit Cost</StyledTableCell>
                                        <StyledTableCell >Quantity</StyledTableCell>
                                        <StyledTableCell >Price</StyledTableCell>
                                        <StyledTableCell >Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {productListArray.map((row,key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell align="left">{row.item}</StyledTableCell>
                                        <StyledTableCell align="left">{row.unit_cost}</StyledTableCell>
                                        <StyledTableCell align="left">{row.quantity}</StyledTableCell>
                                        <StyledTableCell align="left">{row.price}</StyledTableCell>
                                        <StyledTableCell >
                                            <div className='flex unset-justify-content flex-gap10'>
                                                <button className='cardsBoxShadow btn'  onClick={(e) => deleteSelectedProduct(row.barcode)}>
                                                    <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
                                                </button>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} align="right">Subtotal : </TableCell>
                                    <TableCell colSpan={2}  align="center">{totalFormData.subtotal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} align="right">Discount : </TableCell>
                                    <TableCell colSpan={2}  align="center">
                                        <form >
                                            <input type="text" className="form-control" placeholder="" onChange={(e) => handleDisChange(e)} id = 'disc' value={totalFormData.discount} />
                                        </form>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3} align="right">Total : </TableCell>
                                    <TableCell colSpan={2}  align="center">{totalFormData.total}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        }
                        </TableContainer>
                    </div>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default CalculateBill
