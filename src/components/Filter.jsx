import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Filter() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.pokemon.types);
  const [type, setType] = useState("");

  const handleChangeType = (e) => {
    console.log(e.target.value);
  };

  return (
    <Form className="d-flex">
      <Form.Select
        aria-label="normal"
        defaultValue="normal"
        className="ms-auto align-self-end w-25 my-2"
        onSelect={handleChangeType}
      >
        {filters.map((type) => {
          return (
            <>
              {console.log(type)}
              <option
                className={`PixelifyFont fw-bold tipoPokemon ${type.name}`}
                value={type.name}
              >
                {t(type.name)}
              </option>
            </>
          );
        })}
      </Form.Select>
      <Button variant="primary" className="ms-2 p-2" onClick={handleChangeType}>Seleccionar</Button>
    </Form>
  );
}

export default Filter;
