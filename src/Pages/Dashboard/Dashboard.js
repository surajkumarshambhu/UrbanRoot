import React, {useState,useEffect} from 'react'
import Graph from '../../Graph/graph';
import { ApiHelper } from '../../Helper/APIHelper';
import './Dashboard.css';
import Loader from 'react-loader-spinner';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {

    const [dashboard, setDashboard] = useState({});
    const [lables, setLables] = useState([]);
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        let url = "dashboard";
        ApiHelper(url,[],'POST')
        .then(resposnse => {
            setLoader(false)
            setDashboard(resposnse.data);
            setLables(resposnse.data.graph_data.labels);
            setData(resposnse.data.graph_data.data)
        })
    },[]);

    return (
        <>
            <div className="main-wrapper">
                <div className='top-main'>
                    <div className='top-left-content'>
                        <span>Hi Username, Good Morning</span>
                        <p>Your dashboard gives you views of key<br/> performance or business process <br/>for the current month.</p>
                    </div>
                    <div className='top-right-content'>
                        <div className='card-body bg-1'>
                            <span className='content-header'>Total Sales -</span>
                            <span className='content-text'>{dashboard.total_sale}</span>
                        </div>
                        <div className='card-body bg-2'> 
                            <span className='content-header'>Total Categories -</span>
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
                            <h4>Revenue</h4>
                        </div>
                        <div className='graph-card-body'>
                            { loader ? <div className='loader-class'><Loader type="Circles" color='#32BDEA' height={100} width={100}/></div> : 
                                    <Line
                                    data={{
                                      labels: lables,
                                      datasets: [
                                        {
                                          label: '# Revenue Per Day',
                                          data: data,
                                          backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                          ],
                                          borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                          ],
                                          borderWidth: 1,
                                        },
                                      ],
                                    }}
                                    height={300}
                                    width={600}
                                    options={{
                                      maintainAspectRatio: false,
                                      scales: {
                                        yAxes: [
                                          {
                                            ticks: {
                                              beginAtZero: true,
                                            },
                                          },
                                        ],
                                      },
                                      legend: {
                                        labels: {
                                          fontSize: 25,
                                        },
                                      },
                                    }}
                                  />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
