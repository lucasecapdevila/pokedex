import React from "react";
import { Form } from "react-bootstrap";



function Filter() {
  return (
    <Form.Select aria-label="Default select example">
      <option>Filtrar por: </option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
  );
}

export default Filter;