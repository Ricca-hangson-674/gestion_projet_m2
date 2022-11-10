import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useForm } from "@inertiajs/inertia-react";
import Accordion from "react-bootstrap/Accordion";
import { Inertia } from '@inertiajs/inertia'

import DateTimePicker from "react-datetime-picker";
import Select from "react-select";

import { format, formatMoment } from "@/Utils/date.js";

export default function Backlog(props) {
    const {
        auth,
        errors,
        projectSelected,
        flash,
        users,
        tasks,
        sprints,
        options,
    } = props;

    /** State */
    const [type, setType] = useState(null);
    const [current, setCurrent] = useState(null);
    const [sprint, setSprint] = useState(null);

    const [form, setForm] = useState(false);
    const [detail, setDetail] = useState(false);

    const [affectations, setAffectations] = useState([]);

    const [alert, setAlert] = useState(true);

    /** Form */
    const {
        data,
        setData,
        post,
        errors: errorsForm,
        reset,
    } = useForm({
        pointStory: "",
        name: "",
        description: "",
        responsible: "",
        responsibles: [],
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

        setAlert(true);

        let url = null;

        switch (type) {
            case "TASK":
                url = route("task.store");
                break;
            case "SPRINT":
                url = route("sprint.store");

                break;
        }

        post(url);

        if (!Object.keys(errors).length) reset();

        console.log("submit");
    };

    const handleCloseForm = () => setForm(false);
    const handleShowForm = (type) => {
        setType(type);

        setForm(true);
    };

    const handleCloseDetail = () => setDetail(false);
    const handleShowDetail = (type, data) => {
        setType(type);

        setCurrent(data);

        setDetail(true);
    };

    const affectTask = () => {
        console.log("affectTask", affectations);

        const body = {affectations, task: current.id}

        const url = route("task.affectations");

        Inertia.post(url, body)
    };

    console.log(tasks);
    // console.log(errors);
    // console.log("projectSelected", projectSelected);
    // console.log("type", type);

    return (
        <>
            <AdminLayout auth={auth}>
                <div className="container-fluid px-4">
                    <div className=" my-2 d-flex justify-content-between">
                        <h1>WORKSPACE</h1>

                        <Button
                            variant="primary"
                            onClick={() => handleShowForm("SPRINT")}
                        >
                            Creer un sprint
                        </Button>
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
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div>Taches</div>

                                    <Button
                                        variant="secondary"
                                        onClick={() => handleShowForm("TASK")}
                                    >
                                        Creer
                                    </Button>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        {tasks.length
                                            ? tasks.map((task) => (
                                                  <li
                                                      key={task.id}
                                                      className="list-group-item d-flex justify-content-between mb-2"
                                                      onClick={() =>
                                                          handleShowDetail(
                                                              "TASK",
                                                              task
                                                          )
                                                      }
                                                  >
                                                      <h5>{task.name}</h5>
                                                      <ul className="list-unstyled team-info">
                                                          {task.attributions
                                                              .length
                                                              ? task.attributions.map(
                                                                    (a) => (
                                                                        <li
                                                                            key={
                                                                                a.id
                                                                            }
                                                                        >
                                                                            <img
                                                                                src="/images/avatar1.jpg"
                                                                                alt={
                                                                                    a.firstname
                                                                                }
                                                                            />
                                                                        </li>
                                                                    )
                                                                )
                                                              : null}
                                                      </ul>
                                                  </li>
                                              ))
                                            : "AUCUN"}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    Sprint [encours]
                                </div>
                                <div className="card-body sprint-list">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5>Name</h5>
                                            <ul className="list-unstyled team-info">
                                                <li>
                                                    <img
                                                        src="/images/avatar1.jpg"
                                                        alt="Avatar"
                                                    />
                                                </li>
                                                <li>
                                                    <img
                                                        src="/images/avatar2.jpg"
                                                        alt="Avatar"
                                                    />
                                                </li>
                                                <li>
                                                    <img
                                                        src="/images/avatar3.jpg"
                                                        alt="Avatar"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <Accordion className=" mt-4 ">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Liste des sprints
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {sprints.length ? (
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nom</th>
                                                        <th scope="col">
                                                            Date de debut
                                                        </th>
                                                        <th scope="col">
                                                            Date de Fin
                                                        </th>
                                                        <th scope="col">
                                                            Status
                                                        </th>
                                                        <th scope="col">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sprints.map((sprint) => (
                                                        <tr key={sprint.id}>
                                                            <th scope="row">
                                                                {sprint.name}
                                                            </th>
                                                            <td>
                                                                {sprint.beginAt}
                                                            </td>
                                                            <td>
                                                                {sprint.endAt}
                                                            </td>
                                                            <td>
                                                                {sprint.status}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-secondary btn-sm"
                                                                    onClick={() =>
                                                                        handleShowDetail(
                                                                            "SPRINT",
                                                                            sprint
                                                                        )
                                                                    }
                                                                >
                                                                    voir
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            "AUCUN"
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>

                            <div className="card mt-4">
                                <div className="card-header d-flex justify-content-between">
                                    <div>Sprint</div>
                                    <ul className="nav">
                                        <li className="nav-item me-1">
                                            <span className="badge rounded-pill bg-danger">
                                                990
                                            </span>
                                            StoryPoint
                                        </li>
                                        <li className="nav-item">
                                            <span className="badge rounded-pill bg-danger">
                                                10
                                            </span>
                                            Contributeurs
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between">
                                            <h5>Name</h5>
                                            <div className="d-flex justify-content-end">
                                                <span className="badge rounded-pill bg-secondary m-auto">
                                                    10
                                                </span>
                                                <ul className="list-unstyled team-info ps-2">
                                                    <li>
                                                        <img
                                                            src="/images/avatar1.jpg"
                                                            alt="Avatar"
                                                        />
                                                    </li>
                                                    <li>
                                                        <img
                                                            src="/images/avatar2.jpg"
                                                            alt="Avatar"
                                                        />
                                                    </li>
                                                    <li>
                                                        <img
                                                            src="/images/avatar3.jpg"
                                                            alt="Avatar"
                                                        />
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>

            {/* Create */}
            <Modal show={form} onHide={handleCloseForm}>
                <form onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{type}</Modal.Title>
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
                        {type === "TASK" ? (
                            <div className="mb-3">
                                <label
                                    htmlFor="pointStory"
                                    className="form-label"
                                >
                                    Point Story
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pointStory"
                                    name="pointStory"
                                    value={data.pointStory}
                                    onChange={onHandleChange}
                                />
                                <div>{errors.pointStory}</div>
                            </div>
                        ) : null}

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

            {/* Detail Project */}
            {current ? (
                <Modal show={detail} onHide={handleCloseDetail}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {type} #{current.id}
                        </Modal.Title>
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
                            {current.status ? (
                                <>
                                    <dt className="col-sm-3">Status</dt>
                                    <dd className="col-sm-9">
                                        {current.status}
                                    </dd>
                                </>
                            ) : null}
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
                        {current.attributions ? (
                            <div className="row mt-2">
                                <div className="card col-12">
                                    <div className="card-header">
                                        Attributions
                                    </div>
                                    <div className="card-body">
                                        {current.attributions.length
                                            ? current.attributions.map((a) => (
                                                  <span
                                                      key={a.id}
                                                      className="badge bg-secondary m-2"
                                                  >
                                                      {a.firstname}
                                                  </span>
                                              ))
                                            : "AUCUN"}
                                        <div
                                            className="alert alert-secondary"
                                            role="alert"
                                        >
                                            Ajout
                                            <Select
                                                options={options}
                                                isMulti
                                                defaultValue={
                                                    current.attributionsOptions
                                                }
                                                onChange={(e) => {
                                                    setAffectations((o) => [
                                                        ...o,
                                                        ...e,
                                                    ]);
                                                    console.log(
                                                        "Select onChange",
                                                        e
                                                    );
                                                }}
                                            />
                                            <Button
                                                onClick={affectTask}
                                                variant="primary"
                                                className="mt-1"
                                            >
                                                Affecter
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetail}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </>
    );
}
