import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Import Pages
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import AboutUsPage from './pages/AboutUsPage';
import AdminPage from './pages/AdminPage';
import ProcessingPage from './pages/ProcessingPage';
import StockPage from './pages/StockPage';
import B2BPage from './pages/B2BPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MyOrdersPage from './pages/MyOrdersPage';
import './App.css';
import Footer from './components/Footer.jsx';
import ProductAddPage from './pages/admin/ProductAddPage';

function App() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) setUserInfo(JSON.parse(storedUserInfo));
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        window.location.href = '/login';
    };

    return (
        <Router>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                    <Container fluid>
                        <LinkContainer to="/">
                            <Navbar.Brand>Pet Food Brand</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <LinkContainer to="/store"><Nav.Link>Store</Nav.Link></LinkContainer>
                                <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                                <LinkContainer to="/b2b"><Nav.Link>B2B</Nav.Link></LinkContainer>
                                {userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/myorders"><NavDropdown.Item>My Orders</NavDropdown.Item></LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <>
                                    <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                                    <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
                                    </>
                                )}
                                {/* A simple way to show admin links if the user has a specific role */}
                                {userInfo && userInfo.isAdmin && (
                                     <NavDropdown title="Admin Panel" id="adminmenu">
                                        <LinkContainer to="/admin"><NavDropdown.Item>Pending Orders</NavDropdown.Item></LinkContainer>
                                        <LinkContainer to="/processing"><NavDropdown.Item>Process Orders</NavDropdown.Item></LinkContainer>
                                        <LinkContainer to="/stock"><NavDropdown.Item>Manage Stock</NavDropdown.Item></LinkContainer>
                                        <NavDropdown.Divider />
                                        <LinkContainer to="/admin/product/add">
                                          <NavDropdown.Item>Add Product</NavDropdown.Item>
                                        </LinkContainer>
                                </NavDropdown>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className="py-3">
                <Container fluid>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/processing" element={<ProcessingPage />} />
                        <Route path="/stock" element={<StockPage />} />
                        <Route path="/b2b" element={<B2BPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/myorders" element={<MyOrdersPage />} />
                        <Route path="/admin/product/add" element={<ProductAddPage />} />
                    </Routes>
                </Container>
            </main>
            <Footer /> {/* <-- ADD THE FOOTER COMPONENT HERE */}
        </Router>
    );
}

export default App;