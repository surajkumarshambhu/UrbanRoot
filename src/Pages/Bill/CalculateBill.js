import React, {useEffect,useState} from 'react'
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import logo from '../../Images/logo.png'
import './CalculateBill.css';
import Loader from 'react-loader-spinner';
import { ApiHelper } from '../../Helper/APIHelper';

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

function CalculateBill() {

    const [loader, setLoader] = useState({
        loader: false,
    })
    const [loaderPrint, setloaderPrint] = useState({
        loader: false,
    })
    const [saved, setSaved] = useState({
        saved: false,
    })
    const [itemList, setItemList] = useState({});
    const [orderId, setOrderId] = useState('0');
    const [productCode, setProductCode] = useState('');
    const [itemListArray, setItemListArray] = useState([]);
    const [barcodeItems, setBarcodeItems] = useState([]);

    function handle(e){
        setProductCode(e.target.value)
    }

    function submit(e){
        e.preventDefault()
        setBarcodeItems(
            (previousItems) => [...previousItems, {barcode:productCode,qty:1}]
        )
        setProductCode('')
    }

    useEffect(() => {
        const requestBody = {request: {product:barcodeItems}}
        let url = "purchase-products";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.data.details.length > 0){
                setItemList(resposnse.data)
                setItemListArray(resposnse.data.details)
            }
        })
    },[barcodeItems]);

    function save(){
        if (barcodeItems.length != 0){
            setLoader({
                loader:true
            })
            const requestBody = {request: {product:barcodeItems}}
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
        setloaderPrint({
            loader:true
        })
        if (orderId === '0'){
            return
        }
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

    return (
        <>
            <IconContext.Provider value={{ color: '#666E8A',size: '25px' }}>
            <div className="main-wrapper">
                <div className='top-main background-color'>
                    <div className="bill-header-container">
                         <span>Invoice #123456</span>
                         <div className='bill-header-action'>
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
                </div>
                <div className='bottom-main'>
                    <div className='company-details'>
                        <div className='bottom-main-company-details'>
                            <p>Urban Roots</p>
                            <p>Ward No. 4</p>
                            <p>Pnadu Barabazar</p>
                            <p>Phone: 7002321056</p>
                            <p>GST:- 18AOFPR680IZI</p>
                            <p>Date:- 19th may 2020</p>
                        </div>
                        <div className='bottom-main-company-logo'>
                            <img src={logo} alt='logo'></img>
                        </div>
                    </div>
                    <div className='product-table-content'>
                    <div className='table-wrapper'>
                        <div>
                            <div className="dataTables_length" id="DataTables_Table_0_length">

                            </div>
                            <div className='enter-barcode' >
                                <form onSubmit={(e) => submit(e)}>
                                    <input type="text" className="form-control" placeholder="Enter barcode / Scan barcode" onChange={(e) => handle(e)} id = 'productCode' value={productCode}/>
                                </form>
                            </div>
                        </div>
                        <div>
                            <table className='table-content border'>
                                <thead className='align-items-center'>
                                    <tr>
                                        <th>Item</th>
                                        <th>Description</th>
                                        <th>Unit Cost</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (itemListArray).map((item, key) => {
                                            return  <tr key = {key}>
                                                        <td className="">{item.item}</td>
                                                        <td className="">{item.description}</td>
                                                        <td className="">{item.unit_cost}</td>
                                                        <td className="">
                                                              {item.quantity}
                                                        </td>
                                                        <td className="">{item.total_price}</td>
                                                    </tr> 
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='order-summery'>
                        <p>Subtotal :-  {itemList.sub_total} </p>
                    </div>
                </div>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default CalculateBill
