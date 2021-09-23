import React, { Component } from 'react'
import TotalSale from '../Images/totalSale.png'
import cost from '../Images/total_cost.png'
import './Dashboard.css';

export default class Dashboard extends Component {
    render() {
        return (
            <>
                <div className="main-wrapper">
                <div className='top-main'>
                    <div className='top-left-content'>
                        <span>Hi Username, Good Morning</span>
                        <p>Your dashboard gives you views of key<br/> performance or business process.</p>
                    </div>
                    <div className='top-right-content'>
                        <div className='flex-col'>
                            <div className='card-body'>
                                <div><img src={TotalSale} alt='totalSales' className='content-img'/></div>
                                <div>
                                    <span className='content-header'>Total Sales</span>
                                    <span className='content-text'>31.50</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <div className='card-body'> 
                                <div><img src={cost} alt='cost' className='content-img'/></div>
                                <div>
                                    <span className='content-header'>Total Cost</span>
                                    <span className='content-text'>31.50</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex-col'>
                            <div className='card-body'>
                                <div><img src={cost} alt='cost' className='content-img'/></div>
                                <div>
                                    <span className='content-header'>Total Product</span>
                                    <span className='content-text'>31.50</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-main'></div>
                </div>
            </>
        )
    }
}
