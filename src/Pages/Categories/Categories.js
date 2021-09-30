import React, { useEffect,useState } from 'react'
import { IconContext } from 'react-icons/lib';
import * as CONSTANT from '../../Helper/Constant';
import * as AiIcons from 'react-icons/ai';
import FilterIcon from '../../Images/filter.svg';
import { useHistory } from 'react-router';
import './Categories.css'
import { ApiHelper } from '../../Helper/APIHelper';

const getProductListRequest = {
    "request":{
        "no_of_records":CONSTANT.NUMBEROFITEMS,
        "page_number":1
    }
};

const Categories = () => {

    const history = useHistory();
    const [categoryListArray, setCategoryListArray] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [nextPage, setNextPage] = useState(false);
    const [previousPage, setPreviousPage] = useState(false);
    const [totalRecord, setTotalRecord] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        let url = "get-categories";
        ApiHelper(url,getProductListRequest,'POST')
        .then(resposnse => {
            setCategoryListArray(resposnse.data.categories_list)
            setCategoryList(resposnse.data);
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
        history.push("/Addcategories");
    }

    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
        <div className='content-page'>
                <div className='product-header-content'>
                    <div className='product-header-right'>
                            <h4>Category List</h4>
                            <p>Use category list as to describe your overall core business from the provided list.<br/> 
                            Click Add Category to add more categories .</p>
                    </div>
                    <button className='btn' onClick={()=>navigate()}>
                        <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                        <span>Add Category</span>
                    </button>
                </div>
                <div className='product-table-content'>
                    <div className='table-wrapper'>
                        <div>
                            <div className="dataTables_length" id="DataTables_Table_0_length">
                                <label>Show 
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="">
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
                                <thead className='align-items-center'>
                                    <tr>
                                        <th>Category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (categoryListArray || []).map((item, key) => {
                                            return <tr key = {key}>
                                                    <td className="">{item.category}</td>
                                                    <td>
                                                        <div className="action-items">
                                                            <button className='cardsBoxShadow'>
                                                                <AiIcons.AiOutlineEdit></AiIcons.AiOutlineEdit>
                                                            </button>
                                                            <button className='cardsBoxShadow'>
                                                                <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
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
                                    <span>Showing 1 to 10 of 10 entries</span>
                                </div>
                                <div className='table-page-count'>
                                    <button className='cardsBoxShadow'>Previous</button>
                                    <span>10</span>
                                    <button className='cardsBoxShadow'>Next</button>
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


export default Categories;