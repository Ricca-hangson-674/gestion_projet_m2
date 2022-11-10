import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "@inertiajs/inertia-react";

export default function Admin({ children, auth }) {
    console.log("Admin", auth);
    return (
        <div>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                {/* Navbar Brand*/}
                <span className="navbar-brand ps-3">BNM</span>
                {/* Sidebar Toggle*/}
                <button
                    className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
                    id="sidebarToggle"
                    href="#!"
                >
                    <i className="fas fa-bars" />
                </button>
                {/* Navbar*/}
                <ul className="navbar-nav ms-auto">
                    {auth.user ? (
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                <i className="fas fa-user fa-fw" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href={route("project.index")}>
                                    Projects
                                </Dropdown.Item>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <Dropdown.Item href="#/action-1">
                                        Deconnexion
                                    </Dropdown.Item>
                                </Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        "NO Connected"
                    )}
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav
                        className="sb-sidenav accordion sb-sidenav-dark"
                        id="sidenavAccordion"
                    >
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <a
                                    className="nav-link"
                                    href={route("backlog.index")}
                                >
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-solid fa-book" />
                                    </div>
                                    BackLog
                                </a>
                                <a className="nav-link" href={route("chart")}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-chart-area" />
                                    </div>
                                    Reporting
                                </a>
                                <a
                                    className="nav-link"
                                    href={route("taskboard")}
                                >
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-solid fa-clipboard-list" />
                                    </div>
                                    Task Board
                                </a>
                                <a className="nav-link" href={route("roadmap")}>
                                    <div className="sb-nav-link-icon">
                                        <i className="fa-solid fa-road" />
                                    </div>
                                    RoadMap
                                </a>
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Connecte au tant que:</div>
                            Start Bootstrap
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main className="px-2">{children}</main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">
                                    Copyright © Your Website 2022
                                </div>
                                <div>
                                    <a href="#">Privacy Policy</a>·
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
