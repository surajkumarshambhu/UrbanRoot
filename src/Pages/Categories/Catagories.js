import React, { useEffect,useState } from 'react'
import { styled } from '@mui/material/styles';
import { IconContext } from 'react-icons/lib';
import * as AiIcons from 'react-icons/ai';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
       TableHead, TableRow, Paper, Grid, TablePagination} from '@mui/material';
import Loader from 'react-loader-spinner';
import { ApiHelper } from '../../Helper/APIHelper';
import * as CONSTANT from '../../Helper/Constant';


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

const Catagories = () => {

    const [page, setPage] = React.useState(0);
    const [loader, setLoader] = useState(false)
    const [productListArray, setProductListArray] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);

    useEffect(() => {
        setLoader(true)
        const requestBody = {request: {no_of_records:CONSTANT.NUMBEROFITEMS,page_number:page + 1}}
        let url = "get-categories";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setProductListArray(resposnse.data.categories_list)
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
                            <h4>Catagory List</h4>
                            <p>Use category list as to describe your overall core business from the provided list.<br/> 
                            Click Add Category to add more categories.</p>
                    </div>
                    <div className='flex flex-gap10'>
                        <button className='btn'>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>Add Catagory</span>
                        </button>
                        <button className='btn'>
                            <AiIcons.AiOutlineFilter></AiIcons.AiOutlineFilter>
                            <span>Filter / Search</span>
                        </button>
                    </div>
                </div>
                <div className='table-container'>
                    <TableContainer component={Paper} sx={{ maxHeight:550 }}>
                    { loader ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                        <Table sx={{ minWidth: 700 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Catagories</StyledTableCell>
                                    <StyledTableCell >Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {productListArray.map((row,key) => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell align="left">{row.category}</StyledTableCell>
                                    <StyledTableCell >
                                        <div className='flex unset-justify-content flex-gap10'>
                                            <button className='cardsBoxShadow btn'>
                                                <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                            </button>
                                            <button className='cardsBoxShadow btn'>
                                                <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
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


export default Catagories;