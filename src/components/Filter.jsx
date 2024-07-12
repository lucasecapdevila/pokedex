import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { filterSpecificType, getSpecificType } from "../slices/pokemonSlice";

function Filter() {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.pokemon.types);
  const dispatch = useDispatch();

  const handleChangeType = (e) => {
    try {
      dispatch(getSpecificType(e.target.value));
      dispatch(filterSpecificType("Cargando"));
    } catch(error) {
      console.log(error)
      dispatch(filterSpecificType("Error"));
    }
    
  };

  return (
    <Form className="d-flex">
      <Form.Select
        aria-label="normal"
        defaultValue="normal"
        className="ms-auto align-self-end w-25 my-2"
        onChange={handleChangeType}
      >
        {filters.map((type, index) => {
          return (
            <>
              <option
                className={`PixelifyFont fw-bold tipoPokemon ${type.name}`}
                value={type.name}
                key={index}
              >
                {t(type.name)}
              </option>
            </>
          );
        })}
      </Form.Select>
    </Form>
  );
}

export default Filter;
