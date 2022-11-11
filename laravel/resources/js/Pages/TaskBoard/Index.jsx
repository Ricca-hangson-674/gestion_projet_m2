import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useForm } from "@inertiajs/inertia-react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
    console.log("==> dest", destination);

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    const resultArray = [];
    resultArray.push(sourceClone);
    resultArray.push(destClone);

    return resultArray;

    // return result;
};

const ITEMS = [
    {
        id: uuid(),
        content: "Headline",
    },
    {
        id: uuid(),
        content: "Copy",
    },
    {
        id: uuid(),
        content: "Image",
    },
    {
        id: uuid(),
        content: "Slideshow",
    },
    {
        id: uuid(),
        content: "Quote",
    },
];

const Task = ({ task, provided, style, dragHandleProps, draggableProps }) => {
    return (
        <li
            {...dragHandleProps}
            {...draggableProps}
            ref={provided}
            style={style}
            className="list-group-item d-flex justify-content-between my-1 nrh_item"
        >
            <h5>{task.name}</h5>
        </li>
    );
};

const Tasks = ({ column, tasks, provided }) => {
    if (!tasks) return;
    return (
        <ul className="list-group" ref={provided}>
            {tasks.length
                ? tasks.map((task, i) => (
                      <Draggable
                          key={task.id}
                          draggableId={`${column.name}-${column.id}-${task.name}-${task.id}`}
                          index={i}
                      >
                          {(provided, snapshot) => (
                              <>
                                  <Task
                                      key={task.id}
                                      provided={provided.innerRef}
                                      draggableProps={provided.draggableProps}
                                      dragHandleProps={provided.dragHandleProps}
                                      style={provided.draggableProps.style}
                                      task={task}
                                  />
                                  {snapshot.isDragging && <p>{task.name}</p>}
                              </>
                          )}
                      </Draggable>
                  ))
                : null}
        </ul>
    );
};

const Column = ({
    column,
    provided,
    style,
    dragHandleProps,
    draggableProps,
}) => {
    return (
        <div
            className="col-md-3 nrh_item"
            ref={provided}
            {...draggableProps}
            {...dragHandleProps}
            style={style}
        >
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <div>{column.name}</div>
                </div>
                <div className="card-body">
                    <Droppable droppableId="COLUMNS" type="TASK">
                        {(provided, snapshot) => (
                            <>
                                <Tasks
                                    column={column}
                                    tasks={column.tasks}
                                    provided={provided.innerRef}
                                />
                                {provided.placeholder}
                            </>
                        )}
                    </Droppable>
                </div>
            </div>
        </div>
    );
};

const Columns = ({ columnsState, provided }) => {
    return (
        <div
            ref={provided}
            className="row px-4 taskboard d-flex justify-content-start"
        >
            {columnsState.length
                ? columnsState.map((column, index) => (
                      <Draggable
                          key={column.id}
                          draggableId={column.name}
                          index={index}
                      >
                          {(provided, snapshot) => (
                              <>
                                  <Column
                                      column={column}
                                      provided={provided.innerRef}
                                      draggableProps={provided.draggableProps}
                                      dragHandleProps={provided.dragHandleProps}
                                      style={provided.draggableProps.style}
                                  />
                                  {snapshot.isDragging && <p>{column.name}</p>}
                              </>
                          )}
                      </Draggable>
                  ))
                : null}
        </div>
    );
};

export default function TaskBoard(props) {
    const { auth, columns, flash } = props;

    const [form, setForm] = useState(false);

    const [columnsState, setColumnsState] = useState([...columns]);

    const [alert, setAlert] = useState(true);

    /** Form */
    const { data, setData, post, errors, reset } = useForm({
        name: "",
    });

    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        const url = route("column.store");

        post(url);

        if (!Object.keys(errors).length) reset();

        console.log("submit", data, errors);
    };

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleCloseForm = () => setForm(false);
    const handleShowForm = () => {
        setForm(true);
    };

    const onDragEnd = (result) => {
        const { source, destination, type, draggableId } = result;

        console.log("==> result", result);

        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
                console.log("source", type);
                switch (type) {
                    case "COLUMN":
                        console.log("COLUMN");
                        setColumnsState(
                            reorder(
                                columnsState,
                                source.index,
                                destination.index
                            )
                        );

                        break;
                    case "TASK":
                        console.log(
                            "TASK",
                            draggableId,
                            source.index,
                            draggableId.split("-")
                        );
                        const column = columnsState.find(
                            (c) => c.name === draggableId.split("-")[0]
                        );

                        const order = reorder(
                            column.tasks,
                            source.index,
                            destination.index
                        );
                        const columnsStateCopy = [...columnsState];

                        const index = columnsStateCopy.indexOf(column);
                        if (index !== -1) {
                            columnsStateCopy[index] = {
                                id: column.id,
                                name: column.name,
                                tasks: [...order],
                            };
                        }
                        setColumnsState(columnsStateCopy);
                        break;

                    default:
                        break;
                }
                break;
            case "TASKS":
                console.log("copy", "TASKS", source.droppableId);
                break;
            default:
                console.log(
                    "move",
                    destination.droppableId,
                    source.droppableId
                );
                break;
        }

        /**
         * {
  "draggableId": "Do",
  "type": "DEFAULT",
  "source": {
    "index": 1,
    "droppableId": "COLUMNS"
  },
  "reason": "DROP",
  "mode": "FLUID",
  "destination": null,
  "combine": null
}
         */

        return;
    };

    console.log(columns);

    return (
        <>
            <AdminLayout auth={auth}>
                <div className=" my-2 d-flex justify-content-between">
                    <h1>TASKBOARD</h1>
                    {auth.user.roles !== "ROLE_EXECUTOR" ? (
                        <button
                            onClick={handleShowForm}
                            className="btn btn-primary"
                        >
                            Creer un colonne
                        </button>
                    ) : null}
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

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="COLUMNS" type="COLUMN">
                        {(provided, snapshot) => (
                            <>
                                <Columns
                                    provided={provided.innerRef}
                                    columnsState={columnsState}
                                />
                                {provided.placeholder}
                            </>
                        )}
                    </Droppable>
                </DragDropContext>
            </AdminLayout>

            {/* Create */}
            <Modal show={form} onHide={handleCloseForm}>
                <form onSubmit={submit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Column</Modal.Title>
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
