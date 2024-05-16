import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MapComponent from './components/MapComponent'
import { configureStore, persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import {Container, Row, Col, Nav, Navbar} from 'react-bootstrap';

import logo from '../src/assets/images/Logo.jpg';
const Header = () => {  
  return (
    <>
      <Navbar expand="lg" className='menu'>
        <Container>
          <Navbar.Brand className='logo' href="#home">                
            <img src={logo} width="50" height="50" />                         
            
            Decision Support System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link activeclassname="active" href="#home">Trang chủ</Nav.Link>
              <Nav.Link activeclassname="active" href="#project">Dự án</Nav.Link>
              <Nav.Link activeclassname="active" href="#training">Đào tạo</Nav.Link>
              <Nav.Link activeclassname="active" href="#study">Nghiên cứu</Nav.Link>
              <Nav.Link activeclassname="active" href="#aboutus">Chúng tôi</Nav.Link>
              <Nav.Link activeclassname="active" href="#contact">Liên hệ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}



const App = () => {
  return (
    <Provider store={configureStore}>
      <PersistGate persistor={persistor} loading={null}>
        <Container fluid={true} className='px-1 overflow-hidden'>
          <BrowserRouter>
           <Row>
              <Header></Header>
           </Row>
           <Row>
             <Col md={12}>
               <Routes>
                 <Route exact path='/' element={<MapComponent />} />
               </Routes>
             </Col>
           </Row>
          </BrowserRouter>
        </Container>
      </PersistGate>
    </Provider>
  );
}

export default App;
