import React from 'react'
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import logo from '../../Images/logo.png'
import FilterIcon from '../../Images/filter.svg';
import './CalculateBill.css';

function CalculateBill() {
    return (
        <>
            <IconContext.Provider value={{ color: '#666E8A',size: '25px' }}>
            <div className="main-wrapper">
                <div className='top-main background-color'>
                    <div className="bill-header-container">
                         <span>Invoice #123456</span>
                         <div className='bill-header-action'>
                             <button className='btn'>
                                <AiIcons.AiOutlinePrinter></AiIcons.AiOutlinePrinter>
                                Print
                             </button>
                             <button className='btn'>
                                <AiIcons.AiOutlinePrinter></AiIcons.AiOutlinePrinter>
                                Save
                             </button>
                         </div>
                    </div>
                </div>
                <div className='bottom-main'>
                    <div className='company-details'>
                        <div className='bottom-main-company-details'>
                            <p>Chris Coyier</p>
                            <p>123 Appleseed Street</p>
                            <p>Appleville, WI 53719</p>
                            <p>Phone: (555) 555-5555</p>
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
                                <input type="text" className="form-control" placeholder="Enter barcode / Scan barcode" required="required"/>
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
                                     <tr key = '1'>
                                        <td className="">some</td>
                                    </tr> 
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='order-summery'>
                        <p>Subtotal</p>
                        <p>Total</p>
                        <p>Amount Paid</p>
                        <p>Balance Due</p>
                    </div>
                </div>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default CalculateBill
