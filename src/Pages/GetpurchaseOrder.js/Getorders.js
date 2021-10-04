import React, {useState,useEffect} from 'react'
import { styled } from '@mui/material/styles';
import { IconContext } from 'react-icons/lib';
import * as CONSTANT from '../../Helper/Constant';
import * as AiIcons from 'react-icons/ai';
import TestImage from '../../Images/testimage.jpeg';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
       TableHead, TableRow, Paper, Grid, TablePagination} from '@mui/material';
import { ApiHelper } from '../../Helper/APIHelper';
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


    console.log("entry1 " + page)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
       
    };
    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
        <div className='content-page'>
                <div className='flex'>
                    <div>
                            <h4>Purchase Order</h4>
                            <p>Purchase Order Summary statement gives detailed information on outstanding purchase orders.<br/>
                                 The outstanding orders can be viewed Stock Group wise, Stock Category wise, Stock Item wise,<br/>
                                  account Group wise, Ledger wise or All Orders 
                                  to list your products and offering in the most appealing way.</p>
                    </div>
                    <div className='flex flex-gap10'>
                        <button className='btn'>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>New Order</span>
                        </button>
                        <button className='btn'>
                            <AiIcons.AiOutlineFilter></AiIcons.AiOutlineFilter>
                            <span>Filter / Search Orders</span>
                        </button>
                    </div>
                </div>
                <div className='table-container'>
                    <TableContainer component={Paper} sx={{ maxHeight:550 }}>
                    { loader ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                        <Table sx={{ minWidth: 700 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Order Id / Invoice Number</StyledTableCell>
                                    <StyledTableCell align="center">Purchase Date</StyledTableCell>
                                    <StyledTableCell align="left">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {productListArray.map((row,key) => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.created_at}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className='flex unset-justify-content flex-gap10'>
                                            <button className='cardsBoxShadow btn'>
                                                <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                            </button>
                                            <button className='cardsBoxShadow btn'>
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
