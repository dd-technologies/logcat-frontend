import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadNewProject } from "../../../redux/action/ProjectAction";
import Style from "./AddProjectModal.module.scss";

const AddProjectModal = (props) => {
  const [createProject, setCreateProject] = useState({
    name: "",
    description: "",
  });
  const [chips, setChips] = useState("");
  const [modelType, setModelType] = useState([]);
  const [errorName, setErrorName] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const createNewProjectReducer = useSelector(
    (state) => state.createNewProjectReducer
  );
  const { data, error } = createNewProjectReducer;
  const deleteChips = (type) => {
    setModelType(
      modelType.filter((item) => {
        return item !== type;
      })
    );
  };

  const addChips = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      let inputChips = chips.trim();
      if (inputChips) {
        if (!modelType.includes(inputChips.toLowerCase())) {
          setModelType([...modelType, inputChips]);
        }
        setChips("");
      }
    }
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorName("");
    setErrorMsg("");
    if (!createProject.name.length) {
      setErrorName("Name is required Field.");
    }
    if (!modelType.length) {
      setErrorMsg("Device type is required");
    }
    if (createProject.name.length && modelType.length) {
      setErrorName("");
      setErrorMsg("");
      dispatch(
        uploadNewProject(
          createProject.name,
          modelType,
          createProject.description
        )
      );
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="card CPp">
          <Modal.Title id="contained-modal-title-vcenterv">
            Add New Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="card CPp">
          {error ? (
            <div style={{ fontSize: 12, color: "red" }}>{error}</div>
          ) : (
            ""
          )}
          {data ? (
            <h6 style={{ fontSize: 12, color: "green" }}>
              Porject Created Successfully...
            </h6>
          ) : (
            ""
          )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label
              style={{ float: "left", color: "#212529" }}
              className="CPp"
            >
              Project Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Please Enter Project Name"
              onChange={(e) =>
                setCreateProject({ ...createProject, name: e.target.value })
              }
              required
            />
            {errorName ? (
              <div style={{ fontSize: 12, color: "red" }}>{errorName}</div>
            ) : (
              ""
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label
              style={{ float: "left", color: "#212529" }}
              className="CPp"
            >
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="textarea"
              placeholder="Please Provide Project description"
              onChange={(e) =>
                setCreateProject({
                  ...createProject,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3  " controlId="formBasicPassword">
            <Form.Label
              style={{ float: "left", color: "#212529" }}
              className="CPp"
            >
              Provide Device type
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Device type"
              value={chips}
              onKeyDown={(e) => {
                addChips(e);
              }}
              onChange={(e) => setChips(e.target.value)}
              required
            />
            {errorMsg ? (
              <small style={{ fontSize: 12, color: "red" }}>{errorMsg}</small>
            ) : (
              ""
            )}
          </Form.Group>

          <section className={Style.tagItemsOuter}>
            {modelType.map((type) => (
              <div className={Style.tag_item} key={type}>
                {type}
                <button
                  type="button"
                  onClick={() => {
                    deleteChips(type);
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </section>
        </Modal.Body>
        <Modal.Footer className="card CPp">
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              style={{ backgroundColor: "#1a83ff" }}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Save
            </Button>
            <Button
              onClick={props.onHide}
              style={{ backgroundColor: "#1a83ff", marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </section>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProjectModal;
