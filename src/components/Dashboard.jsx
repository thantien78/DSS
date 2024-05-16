import React, { useState } from 'react'
import '../styles/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDrains, toggleWaterLevel, toggleRains } from '../redux/action'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Search from '@mui/icons-material/Search';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { ArrowRepeat, CaretDown, Justify, Plus } from 'react-bootstrap-icons';
import { ClearAll, Message, Restore } from '@mui/icons-material';
import Chart from '../assets/images/Charts.png'
import bgLogo from '../assets/images/bgLogo.jpg'

function Dashboard({latitude, longitude}) {

  const dispatch = useDispatch()

  const isLightMode = useSelector((state) => state.isLightMode)
  //const networks = useSelector((state) => state.drains.networks)
  const [isActive, setIsActive] = useState(false)

  const SideBar = () => {  
    return (
      <>      
        <div class="sidebar border-end">
          <div class="sidebar-header">
            <div class="row">
              <div class="col">
                <Search/>
              </div>
              <div class="col">
                Tìm kiếm vị trí
              </div>
              <div class="col text-right">
                <Button><Justify/></Button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                Chọn từ ngày
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Form.Control type="date" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                Chọn đến ngày
              </div>
            </div>
            <div class="row">
              <div class="col">
                  <Form.Control type="date" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Button className='actionButton' variant="success"><ArrowRepeat/> Run</Button>
              </div>
              <div class="col">
                <Button className='actionButton' variant="secondary"><ClearAll/>Clear</Button>
              </div>
              <div class="col">
                <Button className='actionButton' variant="secondary"><Restore/>Reset</Button>
              </div>
            </div>
          </div>
          <div class="row">
              <div class="col">
                <Button variant="dark"><Plus/> Chọn loại trạm dữ liệu</Button>
              </div>
          </div>
          <div class="row">
              <div class="col">
                Dữ liệu trạm
              </div>
          </div>
          <ul class="sidebar-nav">
            <li class="nav-item">
              <Button className='navLeft' variant="link" onClick={() => {dispatch(toggleDrains())}}><Message/> Trạm cống</Button>
            </li>
            <li class="nav-item">
              <Button className='navLeft' variant="link" onClick={() => {dispatch(toggleWaterLevel())}}><Message/> Trạm mực nước</Button>
            </li>
            <li class="nav-item">
              <Button className='navLeft' variant="link" onClick={() => {dispatch(toggleRains())}}><Message/> Trạm mưa</Button>
            </li>
            <li class="nav-item nav-group show">
              <CaretDown/> Hiện thêm
            </li>
          </ul>
          
          <div class="row">
              <div class="col">
                <img src={Chart} width={300} height={200}/>
              </div>
          </div>
          <div class="sidebar-footer border-top d-flex">
            <div class="row">
                <div class="col-sm-2">
                  <img src={bgLogo} width={50} height={50}/>
                </div>
                <div class='col'>
                  <font size='5' color='#969696'> eWater</font><br/>
                  @2004 DSS Water. All rights reserved.
                </div>
            </div>
            <button class="sidebar-toggler" type="button"></button>
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