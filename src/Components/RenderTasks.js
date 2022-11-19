import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";
import themeContext from "../Context/Theme";
import Task from "./Task";
import { Link } from "react-router-dom";

// sweet alert
import Swal from "sweetalert2";

// REACT BOOTSTRAP
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const RenderTasks = () => {
    const { tasks } = useContext(tasksContext); // get the tasks array from the context
    const { theme } = useContext(themeContext); // get the theme from the context
    return (
        <div className="tasks">
            {tasks.length > 0 ? ( // if the tasks array is not empty
                <>
                    <Alert variant="success">
                        <Alert.Heading>Tasks waiting for you!</Alert.Heading>
                        <p>You have {tasks.length} tasks to do.</p>
                    </Alert>

                    <Alert variant="warning">
                        <div className="d-flex justify-content-around">
                            <Link to="/pending">
                                <Badge bg="light text-dark" className="p-2">
                                    View{" "}
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.taskCompleted === false
                                        ).length
                                    }{" "}
                                    Pending
                                </Badge>
                            </Link>

                            <Link to="/completed">
                                <Badge bg="info" className="p-2">
                                    View{" "}
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.taskCompleted === true
                                        ).length
                                    }{" "}
                                    Completed
                                </Badge>
                            </Link>
                        </div>
                    </Alert>

                    <hr />
                    <h1 className="text-center">
                        <i className="bi bi-list-task mx-2"></i>Your tasks
                    </h1>
                    <hr />

                    {tasks.length > 0 && // This will render the tasks if the tasks array is not empty
                        tasks.map((task, index) => {
                            return (
                                <Task key={index} task={task} index={index} />
                            );
                        })}

                    {/* The next part is the button to delete all the tasks */}
                    <Dropdown as={ButtonGroup}>
                        <Button variant="danger">Delete Tasks</Button>
                        <Dropdown.Toggle
                            split
                            variant="danger"
                            id="dropdown-split-basic"
                        />
                        <Dropdown.Menu variant={theme}>
                            {/* Button to delete all tasks */}
                            <Dropdown.Item
                                as="button"
                                onClick={() => {
                                    Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Yes, delete it!",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            localStorage.removeItem("tasks");
                                            Swal.fire(
                                                "Deleted!",
                                                "Your tasks have been deleted.",
                                                "success"
                                            );
                                            window.location.reload();
                                        }
                                    });
                                }}>
                                All ({tasks.length})
                            </Dropdown.Item>

                            {/* Button to delete all completed tasks */}
                            {tasks.filter(
                                (task) => task.taskCompleted === false
                            ).length > 0 && (
                                <Dropdown.Item
                                    as="button"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure you want to delete all pending tasks?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText:
                                                "Yes, delete it!",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                localStorage.setItem(
                                                    "tasks",
                                                    JSON.stringify(
                                                        tasks.filter(
                                                            (task) =>
                                                                task.taskCompleted ===
                                                                true
                                                        )
                                                    )
                                                );
                                                Swal.fire(
                                                    "Deleted!",
                                                    "Your pending tasks have been deleted.",
                                                    "success"
                                                );
                                                window.location.reload();
                                            }
                                        });
                                    }}>
                                    Pending (
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.taskCompleted === false
                                        ).length
                                    }
                                    )
                                </Dropdown.Item>
                            )}

                            {/* Button to delete all pending tasks */}
                            {tasks.filter((task) => task.taskCompleted === true)
                                .length > 0 && (
                                <Dropdown.Item
                                    as="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Are you sure you want to delete all completed tasks?",
                                            text: "You won't be able to revert this!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText:
                                                "Yes, delete it!",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                localStorage.setItem(
                                                    "tasks",
                                                    JSON.stringify(
                                                        tasks.filter(
                                                            (task) =>
                                                                task.taskCompleted ===
                                                                false
                                                        )
                                                    )
                                                );
                                                Swal.fire(
                                                    "Deleted!",
                                                    "Your completed tasks have been deleted.",
                                                    "success"
                                                );
                                                window.location.reload();
                                            }
                                        });
                                    }}>
                                    Completed (
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.taskCompleted === true
                                        ).length
                                    }
                                    )
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            ) : (
                <Alert variant="danger">
                    <Alert.Heading>No tasks!</Alert.Heading>
                    <p>You have no tasks to do. That's great!</p>
                </Alert>
            )}
        </div>
    );
};

export default RenderTasks;
