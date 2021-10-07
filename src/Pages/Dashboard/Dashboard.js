import React, {useState,useEffect} from 'react'
import Graph from '../../Graph/graph';
import { ApiHelper } from '../../Helper/APIHelper';
import './Dashboard.css';


const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});

    useEffect(() => {
        let url = "dashboard";
        ApiHelper(url,[])
        .then(resposnse => {
            // setDashboard(resposnse.data);
        })
    });

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
                            <span className='content-text'>00.00</span>
                        </div>
                        <div className='card-body bg-2'> 
                            <span className='content-header'>Total Catagories -</span>
                            <span className='content-text'>{dashboard.total_catagories}</span>
                        </div>
                        <div className='card-body bg-3'>
                            <span className='content-header'>Total Product -</span>
                            <span className='content-text'>{dashboard.total_products}</span>
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
                            <Graph></Graph>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
