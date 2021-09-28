import React, { Component , useState} from 'react'
import * as CONSTANT from '../Helper/Constant';
import { IconContext } from 'react-icons/lib';
import './Productlist.css';
import * as AiIcons from 'react-icons/ai';
import FilterIcon from '../Images/filter.svg';
import TestImage from '../Images/testimage.jpeg';
import { ApiHelper } from '../Helper/APIHelper';

const getProductListRequest = {
    "request":{
        "no_of_records":CONSTANT.NUMBEROFITEMS,
        "page_number":0
    }
};

export default class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            productData: []
        }
    }

    componentDidMount() {
        let url = "get-products";
        ApiHelper(url,getProductListRequest,'POST')
        .then(resposnse => {
            this.productData = resposnse;
        });
    }

    render() {
        return (
            <>
            <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <div className='content-page'>
                    <div className='product-header-content'>
                        <div className='product-header-right'>
                                <h4>Product List</h4>
                                <p>The product list effectively dictates product presentation and provides space <br/> 
                                to list your products and offering in the most appealing way.</p>
                        </div>
                        <button className='btn'>
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
                                            <th>Cost</th>
                                            <th>Quantity</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="product-name">
                                                <div class="row">
                                                    <img src={TestImage} alt="" />
                                                    <div>
                                                        Alloy Jewel Set                   
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="">AJS01</td>
                                            <td class="">Jewellery</td>
                                            <td class="">$150.00</td>
                                            <td class="">Jazzin</td>
                                            <td class="">$50.00</td>
                                            <td class="">200.0</td>
                                            <td>
                                                <div className="action-items">
                                                    <button className='cardsBoxShadow'>
                                                        <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                                    </button>
                                                    <button className='cardsBoxShadow'>
                                                        <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
                                                    </button>
                                                    <button className='cardsBoxShadow'>
                                                        <AiIcons.AiOutlinePrinter></AiIcons.AiOutlinePrinter>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
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
}