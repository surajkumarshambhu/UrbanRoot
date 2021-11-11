import React, {useState,useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { IconContext } from 'react-icons/lib';
import * as CONSTANT from '../../Helper/Constant';
import * as AiIcons from 'react-icons/ai';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
       TableHead, TableRow, Paper, TablePagination} from '@mui/material';
import { ApiHelper } from '../../Helper/APIHelper';
import Loader from 'react-loader-spinner';
import Moment from 'moment';

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

function Getorders() {
    const [page, setPage] = React.useState(0);
    const [loader, setLoader] = useState(false)
    const [productListArray, setProductListArray] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [formData,setFormData] = useState({
        fromDate:"",
        toDate:""
    })

    function handle(e){
        e.preventDefault()
        const newData = {...formData}
        newData[e.target.id] = Moment(e.target.value).format('YYYY-MM-DD')
        setFormData(newData)
    }

    function submit(e){
        e.preventDefault()
        setLoader(true)
        let url = "monthly-report";
        const requestBody = {request: {from: formData.fromDate,to: formData.toDate}}
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.success === true){
                setLoader(false)
                window.open(resposnse.data.url);
            }
            setLoader(false)
        })
    }

    useEffect(() => {
        setLoader(true)
        const requestBody = {request: {no_of_records:CONSTANT.NUMBEROFITEMS,page_number:page + 1}}
        let url = "get-orders";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setProductListArray(resposnse.data.order_details)
            setTotalRecord(resposnse.data.total_records);
            setLoader(false)
        })
    }, [page]);

    function print(id){
        setLoader(true)
        const requestBody = {request: {order_id:id}}
        let url = "get-pdfview";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            if(resposnse.success === true){ 
                setLoader(false)
                window.open(resposnse.data.url);
            }
            else{
                setLoader(false)
            }
        })
        
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
       
    };
    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
        <div className='content-page'>
                <div className='flex flex-gap10'>
                    <div>
                            <h4>Purchase Order</h4>
                            <p>Purchase Order Summary statement gives detailed information on outstanding purchase orders.<br/>
                                 The outstanding orders can be viewed Stock Group wise, Stock Category wise, Stock Item wise,<br/>
                                  account Group wise, Ledger wise or All Orders 
                                  to list your products and offering in the most appealing way.</p>
                    </div>
                    <form className='flex-grow-4' onSubmit={(e) => submit(e)}>
                        <div className='form-group-col'>
                            <input type="date"  min="2021-10-25" onKeyDown={(event) => {event.preventDefault();}} className="form-control" required="required" onChange={(e) => handle(e)} id = 'fromDate' value={formData.fromDate}/>
                        </div>
                        <div className='form-group-col'>
                            <input type="date" min="2021-10-25" max={Moment().format('YYYY-MM-DD')} className="form-control" onKeyDown={(event) => {event.preventDefault();}} required="required" onChange={(e) => handle(e)} id = 'toDate' value={formData.toDate}/>
                        </div>
                        <div className='form-group-col'>
                            <button type="submit" className="btn" >Generate Report</button>
                        </div>
                    </form>
                </div>
                <div className='table-container'>
                    <TableContainer component={Paper} sx={{ maxHeight:550 }}>
                    { loader ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                        <Table sx={{ minWidth: 700 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Order Id / Invoice Number</StyledTableCell>
                                    <StyledTableCell align="center">Customer Name</StyledTableCell>
                                    <StyledTableCell align="center">Contact Number</StyledTableCell>
                                    <StyledTableCell align="center">Total</StyledTableCell>
                                    <StyledTableCell align="center">Purchase Date</StyledTableCell>
                                    <StyledTableCell align="left">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {productListArray.map((row,key) => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.customer_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.customer_contact}</StyledTableCell>
                                    <StyledTableCell align="center">{Number(row.total).toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="center">{row.created_at}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className='flex unset-justify-content flex-gap10'>
                                            <button className='cardsBoxShadow btn'>
                                                <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                            </button>
                                            <button className='cardsBoxShadow btn' onClick={(e) => print(row.id)}>
                                                <AiIcons.AiOutlinePrinter></AiIcons.AiOutlinePrinter>
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
            </div>
            </IconContext.Provider>
        </>
    )
}

export default Getorders
