import React, {useState,useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { IconContext } from 'react-icons/lib';
import * as CONSTANT from '../Helper/Constant';
import * as AiIcons from 'react-icons/ai';
import { useHistory } from 'react-router';
import TestImage from '../Images/testimage.jpeg';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
       TableHead, TableRow, Paper, Grid, TablePagination,Dialog,Button,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import { ApiHelper } from '../Helper/APIHelper';
import Printbarcode from '../Print/Printbarcode';
import Loader from 'react-loader-spinner';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
[`&.${tableCellClasses.head}`]: {
    backgroundColor: "#32BDEA",
    color: theme.palette.common.white,
},
[`&.${tableCellClasses.body}`]: {
    fontSize: 14,
},
}));

const styles={
    active:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    notActive:{
        display: "none",
    },
    barCodeClose:{
        
      }
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Productlist = () => {

    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [loader, setLoader] = useState(false)
    const [productListArray, setProductListArray] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [toDeleteCode, setDeleteCode] = React.useState("");
    const [showPrintDiv, setPrintDiv] = useState(false);
    const [barcode, setBarcode] =useState({
       code:'',
       mrp:'',
       doe:''
    })
    const [formData,setFormData] = useState()

    function handle(e){
        setFormData(e.target.value)
        console.log(formData)
    }

    const handleClickOpen = (e,data) => {
        setOpen(true);
        setDeleteCode(data)
    };
    
    const handleClose = () => {
        setOpen(false);
        setDeleteCode('')
    };

    const handleAgreeClose = () => {
        const requestBody = {request: {id:toDeleteCode}}
        let url = "delete-product";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setPage(0)
        })
        setOpen(false);
    };


    useEffect(() => {
        setLoader(true)
        const requestBody = {request: {no_of_records:CONSTANT.NUMBEROFITEMS,page_number:page + 1,query:formData}}
        console.log(requestBody);
        let url = "get-products";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setProductListArray(resposnse.data.product_list)
            setTotalRecord(resposnse.data.total_records);
            setLoader(false)
        })
    }, [page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
       
    };

    function hidePrintDiv(){
        setPrintDiv(false);
    }

    function printData(barcode,mrp,doe){
        const newData  = ({
            code: barcode,
            mrp: mrp,
            doe: doe
         })
        setBarcode(newData)
        setPrintDiv(true);
    }

    function handleEditOption(e,data){
        localStorage.setItem('editId', data);
        history.push("/Editproduct");
    }

    function navigate(){
        history.push("/Addproduct");
    }

    function submit(){
        setLoader(true)
        const requestBody = {request: {no_of_records:CONSTANT.NUMBEROFITEMS,page_number:page + 1,query:formData}}
        console.log(requestBody);
        let url = "get-products";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setProductListArray(resposnse.data.product_list)
            setTotalRecord(resposnse.data.total_records);
            setLoader(false)
        })
        setLoader(false)
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this product? This operation will lead to permanent deletion of the selected product.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgreeClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
                </Dialog>
            <div className='content-page'>
                <div className='flex'>
                    <div>
                            <h4>Product List</h4>
                            <p>The product list effectively dictates product presentation and provides space <br/> 
                            to list your products and offering in the most appealing way.</p>
                    </div>
                    <div className='flex flex-gap10'>
                        <button className='btn' onClick={()=>navigate()}>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>Add Product</span>
                        </button>
                        <div>
                           <AiIcons.AiOutlineFilter></AiIcons.AiOutlineFilter>
                           <input type="text" className="form-control unset-margin" placeholder="Filter / Search" onChange={(e) => handle(e)} value={formData}/>
                        </div>
                        <button className='btn' onClick={()=>submit()}>
                            <AiIcons.AiOutlineSearch></AiIcons.AiOutlineSearch>
                            <span>Search / Filter</span>
                        </button>
                    </div>
                </div>
                {
                    showPrintDiv === false ? <></> :  
                    <div style = {showPrintDiv === false ? styles.notActive : styles.active} className='print-barcode-div'>
                        <Printbarcode barcodeData={barcode.code} mrp = {barcode.mrp} doe={barcode.doe} ></Printbarcode>
                        <button style={styles.barCodeClose} onClick={(e) => hidePrintDiv()}>Close</button>
                    </div>
                }
                {
                    showPrintDiv === true ? <></> :  
                    <div className='table-container'>
                        <TableContainer component={Paper} sx={{ maxHeight:550 }}>
                        { loader ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                            <Table sx={{ minWidth: 700 }} stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Product</StyledTableCell>
                                        <StyledTableCell align="center">Product Code</StyledTableCell>
                                        <StyledTableCell align="center">Price</StyledTableCell>
                                        <StyledTableCell align="center">Brand Name</StyledTableCell>
                                        <StyledTableCell align="center">HSN Code</StyledTableCell>
                                        <StyledTableCell align="center">Quantity</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {productListArray.map((row,key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell align="center">
                                            <Grid container gap="10px">
                                                <Grid item>
                                                    <img src= {row.file_path === null ? TestImage :row.file_path } alt='imageicon' />
                                                </Grid>
                                                <Grid item >
                                                    {row.product_name}
                                                </Grid>
                                            </Grid>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{row.barcode}</StyledTableCell>
                                        <StyledTableCell align="center">{row.cost}</StyledTableCell>
                                        <StyledTableCell align="center">{row.brand_name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.hsn_code}</StyledTableCell>
                                        <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className='flex'>
                                                <button className='cardsBoxShadow btn' onClick={(e) => handleEditOption(e,row.id)}>
                                                    <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                                </button>
                                                <button className='cardsBoxShadow btn' onClick={(e) => handleClickOpen(e,row.id)}>
                                                    <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
                                                </button>
                                                <button className='cardsBoxShadow btn'>
                                                    <AiIcons.AiOutlinePrinter onClick={(e) => printData(row.barcode,row.cost,row.expiry_date)}></AiIcons.AiOutlinePrinter>
                                                </button>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                </TableBody>
                            </Table>
                        }
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            component="div"
                            count={totalRecord}
                            rowsPerPage={10}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                }
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Productlist;