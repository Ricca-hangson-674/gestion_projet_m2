import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useForm } from "@inertiajs/inertia-react";

import DateTimePicker from "react-datetime-picker";

import { format } from "@/Utils/date.js";

export default function Project(props) {
    /** Props */
    const { projects, users, flash } = props;

    /** State */
    const [show, setShow] = useState(false);
    const [form, setForm] = useState(false);
    const [current, setCurrent] = useState(null);

    const [alert, setAlert] = useState(true);

    /** Form */
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        description: "",
        responsible: "",
        estimationBeginAt: new Date(),
        estimationEndAt: new Date(),
        beginAt: new Date(),
        endAt: new Date(),
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const onHandleDateTimeChange = (name, value) => {
        setData(name, format(value, "yyyy-MM-dd hh:mm:ss"));
    };

    const submit = (e) => {
        e.preventDefault();

        const url = route("project.store");

        post(url);

        if (!Object.keys(errors).length) reset();

        console.log("submit", data, errors);
    };

    const getProject = async (project) => {
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
            // setCurrent(null);

            response = await (await fetch(url)).json();

            // setCurrent(response);
        } catch (e) {
            console.error(e);
        }

        return response
    };

    const handleCloseForm = () => setForm(false);
    const handleShowForm = async (project=null) => {

        console.log('handleShowForm', project)

        if(project){ 
            const response = await getProject(project)

            if (response) {
                console.log(response.beginAt, new Date(response.beginAt))

                // 02-11-2022 23:47:13 => YYYY-MM-DD HH:MM:SS

                setData('name', response.name)
                setData('description', response.description)
                setData('responsible', response.responsible)
                setData('estimationBeginAt', new Date(response.estimationBeginAt))
                setData('estimationEndAt', new Date(response.estimationEndAt))
                setData('beginAt', new Date(response.beginAt))
                setData('endAt', new Date(response.endAt))
            }
        }
        
        setForm(true);
    };

    const handleClose = () => setShow(false);
    const handleShow = async (project) => {
        console.log('handleShow', project)

        const response = await getProject(project)
        setCurrent(response);

        setShow(true);
    };



    // console.log(auth, projects, users);

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
                <div className="alert alert-primary mb-1">
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="mb-0">
                            Veuillez selectionner un projet ou creer un projet
                        </p>
                        <Button variant="primary" onClick={handleShowForm}>
                            Creer
                        </Button>
                    </div>
                </div>

                {flash.message ? (
                    <Alert
                        variant="success"
                        show={alert}
                        onClose={() => setAlert(false)}
                        dismissible
                    >
                        {flash.message}
                    </Alert>
                ) : null}

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
                                <Button
                                    as={"a"}
                                    variant="primary"
                                    className="card-link text-decoration-none"
                                    onClick={() => handleShowForm(project.id)}
                                >
                                    Modifier
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
            <Modal show={form} onHide={handleCloseForm}>
                <form onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Projet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {flash.message ? (
                            <Alert
                                variant="success"
                                show={alert}
                                onClose={() => setAlert(false)}
                                dismissible
                            >
                                {flash.message}
                            </Alert>
                        ) : null}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nom
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            <div>{errors.name}</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows={3}
                                value={data.description}
                                onChange={onHandleChange}
                            />
                            <div>{errors.description}</div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-auto">
                                <label className="form-label">
                                    Date de debut [reel]
                                </label>
                                <DateTimePicker
                                    className="form-control"
                                    name="beginAt"
                                    format="dd/MM/yyyy hh:mm:ss"
                                    value={new Date(data.beginAt)}
                                    onChange={(e) =>
                                        onHandleDateTimeChange("beginAt", e)
                                    }
                                />
                            </div>
                            <div className="col-auto">
                                <label className="form-label">
                                    Date de fin [reel]
                                </label>
                                <DateTimePicker
                                    className="form-control"
                                    name="endAt"
                                    format="dd/MM/yyyy hh:mm:ss"
                                    value={new Date(data.endAt)}
                                    onChange={(e) =>
                                        onHandleDateTimeChange("endAt", e)
                                    }
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
                                <DateTimePicker
                                    className="form-control"
                                    name="estimationBeginAt"
                                    format="dd/MM/yyyy hh:mm:ss"
                                    value={new Date(data.estimationBeginAt)}
                                    onChange={(e) =>
                                        onHandleDateTimeChange(
                                            "estimationBeginAt",
                                            e
                                        )
                                    }
                                />
                            </div>
                            <div className="col-auto">
                                <label
                                    htmlFor="inputPassword2"
                                    className="form-label"
                                >
                                    Date de fin [estimation]
                                </label>
                                <DateTimePicker
                                    className="form-control"
                                    name="estimationEndAt"
                                    format="dd/MM/yyyy hh:mm:ss"
                                    value={new Date(data.estimationEndAt)}
                                    onChange={(e) =>
                                        onHandleDateTimeChange(
                                            "estimationEndAt",
                                            e
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="responsible" className="form-label">
                                Responsable
                            </label>
                            <select
                                id="responsible"
                                name="responsible"
                                className="form-select"
                                aria-label="Default select example"
                                value={data.responsible}
                                onChange={onHandleChange}
                            >
                                <option>Open this select menu</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstname} {user.lastname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseForm}>
                            Fermer
                        </Button>
                        <Button variant="primary" type="submit">
                            Valider
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
