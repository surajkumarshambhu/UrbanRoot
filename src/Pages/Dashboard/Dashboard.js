import React, { Component } from 'react'
import Graph from '../../Graph/graph';
import Printbarcode from '../../Print/Printbarcode';
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
                            <div className='card-body bg-1'>
                                <span className='content-header'>Total Sales -</span>
                                <span className='content-text'>31.50</span>
                            </div>
                            <div className='card-body bg-2'> 
                                <span className='content-header'>Total Categories -</span>
                                <span className='content-text'>31</span>
                            </div>
                            <div className='card-body bg-3'>
                                <span className='content-header'>Total Product -</span>
                                <span className='content-text'>3100</span>
                            </div>
                        </div>
                    </div>
                    <div className='graph-container'>
                        <div className='graph-card'>
                            <div className='graph-card-header'>
                                <h4>Products</h4>
                            </div>
                            <div className='graph-card-body'>
                                <Graph></Graph>
                            </div>
                        </div>
                        <div className='graph-card'>
                            <div className='graph-card-header'>
                                <h4>Revenue</h4>
                            </div>
                            <div className='graph-card-body'>
                                <Printbarcode></Printbarcode>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
