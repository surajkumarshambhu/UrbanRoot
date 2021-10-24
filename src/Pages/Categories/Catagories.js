import React, { useEffect,useState } from 'react'
import { styled } from '@mui/material/styles';
import { IconContext } from 'react-icons/lib';
import * as AiIcons from 'react-icons/ai';
import {Table, TableBody, TableCell, tableCellClasses ,TableContainer,
       TableHead, TableRow, Paper, TablePagination,Dialog,Button,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import Loader from 'react-loader-spinner';
import { ApiHelper } from '../../Helper/APIHelper';
import { useHistory } from 'react-router';
import * as CONSTANT from '../../Helper/Constant';
import { PermPhoneMsg } from '@mui/icons-material';


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

    const history = useHistory();
    const [page, setPage] = React.useState(0);
    const [loader, setLoader] = useState(false)
    const [productListArray, setProductListArray] = useState([]);
    const [totalRecord, setTotalRecord] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [idToDelete, setToDelete] = React.useState("");

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

    const handleClickOpen = (e,data) => {
        setOpen(true);
        setToDelete(data)
    };
    
    const handleClose = () => {
        setOpen(false);
        setToDelete("");
    };

    const handleAgreeClose = () => {
        const requestBody = {request: {id: idToDelete}} ;console.log(requestBody);
        let url = "delete-category";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setPage(0)
        })
        setOpen(false);
    };

    console.log("entry1 " + page)
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
       
    };

    function handleEditOption(e,data){
        localStorage.setItem('editId', data);
        console.log(data)
        history.push("/Editcatagories");
    }

    function navigate(){
        history.push("/AddCatagories");
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
                {"Are you sure you want to delete this catagory?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this catagory? This operation will lead to permanent deletion of the selected catagory.
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
                            <h4>Category List</h4>
                            <p>Use category list as to describe your overall core business from the provided list.<br/> 
                            Click Add Category to add more categories.</p>
                    </div>
                    <div className='flex flex-gap10'>
                        <button className='btn' onClick={()=>navigate()}>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>Add Category</span>
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
                                    <StyledTableCell>Categories</StyledTableCell>
                                    <StyledTableCell >Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {productListArray.map((row,key) => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell align="left">{row.category}</StyledTableCell>
                                    <StyledTableCell >
                                        <div className='flex unset-justify-content flex-gap10'>
                                            <button className='cardsBoxShadow btn' onClick={(e) => handleEditOption(e,row.id)}>
                                                <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                            </button>
                                            <button className='cardsBoxShadow btn' onClick={(e) => handleClickOpen(e,row.id)}>
                                                <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
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
                        rowsPerPage={20}
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