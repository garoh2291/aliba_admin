import { Drawer } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { EditContext } from "../../../context";
import { useDispatch, useSelector } from "react-redux";
import { changeCityThunk, setPortThunk } from "../../../Redux/trackSlice";
import states from "../../../static/states.json";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

export const EditDrawer = () => {
  const { changeEdit, info } = useContext(EditContext);
  const dispatch = useDispatch();
  const { ports } = useSelector((state) => state.track);
  useEffect(() => {
    dispatch(setPortThunk());
  }, []);
  const [inputdata, setInputdata] = useState({
    state: {
      value: info.state,
    },
    city: {
      value: info.city,
    },
    deliveryprice: {
      value: info.deliveryprice,
    },
    activeport: {
      value: info.activeport._id,
    },
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputdata((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
        },
      };
    });
  };
  const onFinish = (e) => {
    e.preventDefault();
    const {
      city: { value: city },
      activeport: { value: activeport },
      deliveryprice: { value: deliveryprice },
      state: { value: state },
    } = inputdata;

    const values = {
      city,
      activeport,
      deliveryprice,
      state,
    };

    dispatch(changeCityThunk({ values, _id: info._id, changeEdit }));
  };
  return (
    <Drawer
      title="Edit City"
      placement="right"
      onClose={changeEdit}
      open={true}
    >
      <div className="drawer_content">
        <Form onSubmit={onFinish}>
          <Col md={12}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                id="state"
                name="state"
                type="select"
                defaultValue={inputdata.state.value}
                onChange={handleChange}
              >
                {states.map((state) => (
                  <option key={state.name} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                value={inputdata.city.value}
                id="city"
                name="city"
                placeholder="City"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="deliveryprice">Delivery Price $</Label>
              <Input
                value={inputdata.deliveryprice.value}
                id="deliveryprice"
                name="deliveryprice"
                placeholder="delivery price"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="activeport">Active Port</Label>
              <Input
                id="activeport"
                name="activeport"
                type="select"
                defaultValue={inputdata.activeport.value}
                onChange={handleChange}
              >
                {ports.map((port) => (
                  <option value={port._id} key={port._id}>
                    {port.port}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Button color="primary" onClick={onFinish}>
            Edit City
          </Button>
        </Form>
      </div>
    </Drawer>
  );
};
