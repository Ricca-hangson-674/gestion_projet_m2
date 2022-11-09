import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "@inertiajs/inertia-react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DateTimePicker from 'react-datetime-picker';

const load = async (url) => {
    let obj = null;

    try {
        obj = await (await fetch(url)).json();
    } catch (e) {
        console.log("error", e);
    }

    // console.log(obj);
};

export default function Project(props) {
    const [show, setShow] = useState(false);
    const [create, setCreate] = useState(false);
    const [current, setCurrent] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [value, onChange] = useState(new Date());
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        const url = route("project.store");
        post(url);
    };

    const handleCloseCreate = () => setCreate(false);
    const handleShowCreate = () => setCreate(true);

    const handleClose = () => setShow(false);
    const handleShow = async (project) => {
        const options = {
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({}),
        };
        const url = route("project.show", { project });

        let response = null;

        try {
            response = await (await fetch(url)).json();

            setCurrent(response);

            // console.log("response", response);
        } catch (e) {
            console.error(e);
        }

        // const response = Inertia.get(url, data, options)
        setShow(true);
    };

    const { auth, projects } = props;

    // console.log(auth, projects);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid justify-content-center">
                    <span className="navbar-brand">
                        Bureau de Norme de Madagascar
                    </span>
                </div>
            </nav>
            <div className="container my-2">
                <div className="alert alert-primary">
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0">
                            Veuillez selectionner un projet ou creer un projet
                        </p>
                        <Button variant="primary" onClick={handleShowCreate}>
                            Creer
                        </Button>
                    </div>
                </div>
                <div className="row">
                    {projects.map((project) => (
                        <div key={project.id} className="card col-5 m-1">
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Cree par{" "}
                                    <strong>{project.createdBy}</strong> le{" "}
                                    {project.created_at}
                                </h6>
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Responsable par{" "}
                                    <strong>{project.responsible}</strong>
                                </h6>
                                <p className="card-text">
                                    {project.description}
                                </p>
                                <Button
                                    as={"a"}
                                    variant="primary"
                                    className="card-link text-decoration-none"
                                    onClick={() => handleShow(project.id)}
                                >
                                    Plus d'info
                                </Button>
                                <a
                                    href="#"
                                    className="card-link text-decoration-none"
                                >
                                    Selectionner
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Detail Project */}
            {current ? (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Projet #{current.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <dl className="row">
                            <dt className="col-sm-3">Nom</dt>
                            <dd className="col-sm-9">
                                {current.name} #{current.id}
                            </dd>
                            <dt className="col-sm-3">Description</dt>
                            <dd className="col-sm-9">{current.description}</dd>
                            <dt className="col-sm-3">Responsable</dt>
                            <dd className="col-sm-9">{current.responsible}</dd>
                            <dt className="col-sm-3">Cree par</dt>
                            <dd className="col-sm-9">{current.createdBy}</dd>
                            <dt className="col-sm-3">Cree le</dt>
                            <dd className="col-sm-9">{current.created_at}</dd>
                        </dl>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">date de debut</th>
                                    <th scope="col">date de fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Reel</th>
                                    <td>{current.beginAt}</td>
                                    <td>{current.endAt}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Estimation</th>
                                    <td>{current.estimationBeginAt}</td>
                                    <td>{current.estimationEndAt}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : null}

            {/* Create */}
            <Modal show={create} onHide={handleCloseCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Creer un projet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                        >
                            Nom
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={""}
                        />
                    </div>
                    <div className="row mb-3">
                        <div className="col-auto">
                            <label
                                htmlFor="staticEmail2"
                                className="form-label"
                            >
                                Date de debut [reel]
                            </label>
                            <DateTimePicker onChange={onChange} value={value} />
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="dd/MM/yyyy" />
                            <input
                                type="text"
                                className="form-control"
                                id="staticEmail2"
                                defaultValue="email@example.com"
                            />
                        </div>
                        <div className="col-auto">
                            <label
                                htmlFor="inputPassword2"
                                className="form-label"
                            >
                                Date de fin [reel]
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPassword2"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-auto">
                            <label
                                htmlFor="staticEmail2"
                                className="form-label"
                            >
                                Date de debut [estimation]
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="staticEmail2"
                                defaultValue="email@example.com"
                            />
                        </div>
                        <div className="col-auto">
                            <label
                                htmlFor="inputPassword2"
                                className="form-label"
                            >
                                Date de fin [estimation]
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPassword2"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                        >
                            Responsable
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option selected>Open this select menu</option>
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCreate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseCreate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
