import React, { Component } from 'react'
import { IconContext } from 'react-icons/lib';
import * as AiIcons from 'react-icons/ai';
import FilterIcon from '../../Images/filter.svg';
import './Categories.css'

export default class Categories extends Component {
    render() {
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
                        <button className='btn'>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>Add Category</span>
                        </button>
                    </div>
                    <div className='product-table-content'>
                        <div className='table-wrapper'>
                            <div>
                                <div class="dataTables_length" id="DataTables_Table_0_length">
                                    <label>Show 
                                        <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="">
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
                                        <tr>
                                            <td class="">200.0</td>
                                            <td>
                                                <div class="action-items">
                                                    <button className='cardsBoxShadow'>
                                                        <AiIcons.AiOutlineEdit></AiIcons.AiOutlineEdit>
                                                    </button>
                                                    <button className='cardsBoxShadow'>
                                                        <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
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


