import React, {useState,useEffect} from 'react'
import * as CONSTANT from '../Helper/Constant';
import { IconContext } from 'react-icons/lib';
import './Productlist.css';
import { useHistory } from 'react-router';
import * as AiIcons from 'react-icons/ai';
import FilterIcon from '../Images/filter.svg';
import TestImage from '../Images/testimage.jpeg';
import { ApiHelper } from '../Helper/APIHelper';
import Printbarcode from '../Print/Printbarcode';

const getProductListRequest = {
    "request":{
        "no_of_records":CONSTANT.NUMBEROFITEMS,
        "page_number":1
    }
};

const styles={
    active:{
        display: "grid",
        height: "25vh",
        position: "absolute",
        width: "calc(80% - 78px)",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "rgb(0 0 0 / 10%)",
        marginLeft:"10%",
        marginTop:"15%",

    },
    notActive:{
        display: "none",
    },
    barCodeClose:{
        aligItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF9770",
        borderColor: "#FF9770",
        border: "none",
        borderRadius: "10px",
        color: "black",
        fontSize: "larger",
        marginBottom: "10px"
      }
}

const Productlist = () => {

    const history = useHistory();
    const [productListArray, setProductListArray] = useState([]);
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [nextPage, setNextPage] = useState(false);
    const [previousPage, setPreviousPage] = useState(false);
    const [totalRecord, setTotalRecord] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [showPrintDiv, setPrintDiv] = useState(false);
    const [barcode, setBarcode] =useState({
       code:'',
       mrp:''
    })

    useEffect(() => {
        let url = "get-products";
        ApiHelper(url,getProductListRequest,'POST')
        .then(resposnse => {
            setProductListArray(resposnse.data.product_list)
            setProductList(resposnse.data);
            setCurrentPage(resposnse.data.page_number);
            setTotalRecord(resposnse.data.total_records);
            setTotalPage(   
                (((totalRecord/10) % 1) !== 0) ? ~~(totalRecord/10) + 1 : ~~(totalRecord) / 10
            );
            setPreviousPage(
                true
            );
            setNextPage(
                (totalPage > 1 ? false : true)
            );
        })
    }, []);


    function getPrevData() { 
        if (currentPage === totalPage){
            setNextPage(true)
            setPreviousPage(true)
        }
        else{
            setCurrentPage(currentPage + 1);
            if (currentPage === totalPage){
                setNextPage(true)
            }
            else{
                setNextPage(false)
            }
            setPreviousPage(true)
        }
    }

    function getNextData() {
        if (currentPage === totalPage){
            setNextPage(true)
        }
        else{
            setCurrentPage(currentPage + 1);
            setPreviousPage(false)
        }
        console.log(previousPage);
        console.log(nextPage);
    }

    function navigate(){
        history.push("/Addproduct");
    }

    function printData(barcode,mrp){
        const newData  = ({
            code: barcode,
            mrp: mrp
         })
        setBarcode(newData)
        setPrintDiv(true);
    }

    function hidePrintDiv(){
        setPrintDiv(false);
    }

    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            {
                showPrintDiv === false ? <></> :  
                <div style = {showPrintDiv === false ? styles.notActive : styles.active} className='print-barcode-div'>
                    <Printbarcode barcodeData={barcode.code} mrp = {barcode.mrp} ></Printbarcode>
                    <button style={styles.barCodeClose} onClick={(e) => hidePrintDiv()}>Close</button>
                </div>
            }
            <div className='content-page' disabled={showPrintDiv}>
                <div className='product-header-content'>
                    <div className='product-header-right'>
                            <h4>Product List</h4>
                            <p>The product list effectively dictates product presentation and provides space <br/> 
                            to list your products and offering in the most appealing way.</p>
                    </div>
                    <button className='btn' onClick={()=>navigate()}>
                        <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                        <span>Add Product</span>
                    </button>
                </div>
                <div className='product-table-content'>
                    <div className='table-wrapper'>
                        <div>
                            <div className="dataTables_length" id="DataTables_Table_0_length">
                                <label>Show 
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select> entries
                                </label>
                            </div>
                            <div >
                                <button className='cardsBoxShadow btn'>
                                    <img src={FilterIcon} alt='FilterIcon'/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <table className='table-content border'>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Product Code</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Brand Name</th>
                                        <th>HSN Code</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (productListArray || []).map((item, key) => {
                                            return <tr key = {key}>
                                                    <td className="product-name">
                                                        <div className="row">
                                                            <img src={TestImage} alt="" className='table-img'/>
                                                            <div>
                                                                {item.product_name}               
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="">{item.barcode}</td>
                                                    <td className="">{item.category}</td>
                                                    <td className="">{item.cost}</td>
                                                    <td className="">{item.brand_name}</td>
                                                    <td className="">{item.hsn_code}</td>
                                                    <td className="">{item.quantity}</td>
                                                    <td>
                                                        <div className="action-items">
                                                            <button className='cardsBoxShadow'>
                                                                <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                                            </button>
                                                            <button className='cardsBoxShadow'>
                                                                <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
                                                            </button>
                                                            <button className='cardsBoxShadow' onClick={(e) => printData(item.barcode,item.cost)}>
                                                                <AiIcons.AiOutlinePrinter></AiIcons.AiOutlinePrinter>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className='table-footer'>
                                <div className='table-data-count'>
                                    <span>Showing {productListArray.length} of {productList.total_records} Products</span>
                                </div>
                                <div className='table-page-count'>
                                    <button className='cardsBoxShadow' disabled={previousPage} onClick={() => getPrevData()}>Previous</button>
                                    <span>
                                        {
                                            
                                        } 
                                    </span>
                                    <button className='cardsBoxShadow' disabled={nextPage} onClick={() => getNextData()}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Productlist;