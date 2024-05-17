import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrains, toggleWaterLevel, toggleRains } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Search from '@mui/icons-material/Search';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { ArrowRepeat, CaretDown, Display, Justify, Plus } from 'react-bootstrap-icons';
import { ClearAll, Message, Restore } from '@mui/icons-material';

import bgLogo from '../assets/images/bgLogo.jpg'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import ForecastChart from "./ForecastChart";
import { ForecastData } from "../utils/ForecastData";
import ComparisonChart from "./ComparisonChart";
import { ComparisonData } from "../utils/ComparisonData";

Chart.register(CategoryScale);

function Dashboard({latitude, longitude}) {
  const dispatch = useDispatch()

  const isLightMode = useSelector((state) => state.isLightMode)
  //const networks = useSelector((state) => state.drains.networks)
  const [isActive, setIsActive] = useState(false)

  //Config forecastChart
  const [forecastChartData, setForecastChartData] = useState({
    labels: ForecastData.map((data) => data.day),

    datasets: [
      {
        label: "",
        data: ForecastData.map((data) => data.predict),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      },
      {
        label: "",
        data: ForecastData.map((data) => data.real),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "blue",
        borderWidth: 1
      }
    ]
  });

  //Config comparisonChart
  const [comparisonChartData, setComparisonChartData] = useState({
    labels: ComparisonData.map((data) => data.id),

    datasets: [
      {
        label: "",
        data: ComparisonData.map((data) => data.predict),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 1
      },
      {
        label: "",
        data: ComparisonData.map((data) => data.real),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#f0331a",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "blue",
        borderWidth: 1
      }
    ]
  });

  const SideBar = () => {  
    return (
      <>      
        <div className="sidebar border-end">
          <div className="sidebar-header">
            <div className="row">
              <div className="col">
                <Search/>
              </div>
              <div className="col">
                Tìm kiếm vị trí
              </div>
              <div className="col text-right">
                <Button><Justify/></Button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                Chọn từ ngày
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Control type="date" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                Chọn đến ngày
              </div>
            </div>
            <div className="row">
              <div className="col">
                  <Form.Control type="date" />
              </div>
            </div>
            <div className="row">
              <div className="col actionButtonGroup">
                <Button className='actionButton mr-2' variant="success"><ArrowRepeat/> Run</Button>
              
                <Button className='actionButton mr-2' variant="secondary"><ClearAll/>Clear</Button>
              
                <Button className='actionButton' variant="secondary"><Restore/>Reset</Button>
              </div>
            </div>
          </div>
          <div className="row">
              <div className="col">
                Chọn loại trạm dữ liệu
              </div>
          </div>
          <ul className="sidebar-nav">
            <li className="nav-item">
              <Button className='navLeft' variant="link" onClick={() => {dispatch(toggleDrains())}}><Message/> Trạm cống</Button>
            </li>
            <li className="nav-item">
              <Button className='navLeft' variant="link" onClick={() => {dispatch(toggleWaterLevel())}}><Message/> Trạm mực nước</Button>
            </li>
            <li className="nav-item">
              <Button className='navLeft' variant="link" onClick={() => {dispatch(toggleRains())}}><Message/> Trạm mưa</Button>
            </li>
            <li className="nav-item nav-group show">
              <CaretDown/> Hiện thêm
            </li>
          </ul>
          
          <div className="row">
              <div className="col">
                <ForecastChart title="Forecast" chartData={forecastChartData}/>
                <ComparisonChart height="100px" title="Comparison" chartData={comparisonChartData} />
              </div>
          </div>
          <div className="sidebar-footer border-top d-flex">
            <div className="row">
                <div className="col-sm-2">
                  <img src={bgLogo} width={50} height={50}/>
                </div>
                <div className='col'>
                  <font size='5' color='#969696'> eWater</font><br/>
                  @2004 DSS Water. All rights reserved.
                </div>
            </div>
            <button className="sidebar-toggler" type="button"></button>
          </div>
        </div>
      </>
    );
  }
  
  const handleSideBar = () => {
    setIsActive(!isActive)
  }

  return (
        <div className={isActive ? 'dashboard' : 'dashboard inactive'}>
           <SideBar></SideBar>
      
          <div onClick={handleSideBar} className='dashboard-arrow d-flex align-items-center justify-content-center'>
            {isActive ? <ArrowRightIcon /> : <ArrowLeftIcon/>}
          </div>
        </div>
  )
}

export default Dashboard