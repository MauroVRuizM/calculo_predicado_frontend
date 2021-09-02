import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import { startAddRules } from '../actions/rules';

export const Rules = () => {

    const dispatch = useDispatch();
    const { rule } = useSelector( state => state );
    const { success, msg } = rule;
    const [conclusion, setConclusion] = useState({
        predicado: "",
        sujetos: [""],
    });
    const [condiciones, setCondiciones] = useState([
        { predicado: "", sujetos: [""] },
    ]);
    const [operadores, setOperadores] = useState([]);
    const [max, setMax] = useState([""]);
    const [max2, setMax2] = useState([""]);
    let history = useHistory();

    if(success) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${msg}`,
            showConfirmButton: false,
            timer: 2000,
            didClose: () => {history.push('/list/rules')}
        })
    }

    const handleaddRule = () => {
        let myRule = {
            id: "",
            conclusion: conclusion,
            condiciones: condiciones,
            operadores: operadores,
        };
        dispatch(startAddRules(myRule));
    }


    const addCondicion = () => {
        setCondiciones([...condiciones, { predicado: "", sujetos: [""] }]);
        setOperadores([...operadores, "AND"]);
    };

    const addCDSubject = (event) => {
        let maxt = condiciones.reduce(function (prev, current) {
            return prev.sujetos.length > current.sujetos.length ? prev : current;
        });
        setMax([...maxt.sujetos, ""]);
        const id = parseInt(event.target.id);
        setCondiciones(
            condiciones.map((item, index) => {
                if (index === id) {
                    return { ...item, sujetos: [...item.sujetos, ""] };
                } else {
                    return item;
                }
            })
        );
    };

    const addCCSubject = () => {
        setMax2([...conclusion.sujetos, ""]);
        setConclusion({ ...conclusion, sujetos: [...conclusion.sujetos, ""] });
    };

    const deleteCDSubject = (event) => {
        const id = parseInt(event.target.id);
        setCondiciones(
            condiciones.map((item, index) => {
                if (index === id) {
                    return { ...item, sujetos: item.sujetos.splice(-1, 1) };
                } else {
                    return item;
                }
            })
        );
    };

    const deleteCCSubject = () => {
        setConclusion({ ...conclusion, sujetos: conclusion.sujetos.splice(-1, 1) });
    };

    //----------------Cabeceras dinamicas-------------------

    const ccheader = max2.map((index) => {
        return (
            <th key={index} scope="col" className="ps-3">
                {`VARIABLE ${index + 1}`}
            </th>
        );
    });

    const cdheader = max.map((index) => {
        return (
            <th key={index} scope="col" className="ps-3">
                {`VARIABLE ${index + 1}`}
            </th>
        );
    });


    //-----------Cuerpos dinamicos-------------------------

    const ccdata = conclusion.sujetos.map((sujeto, index) => {
        return (
            <td>
                <input
                    key={index}
                    className="form-control form-control-lg text-uppercase"
                    type="text"
                    placeholder="Variable"
                    value={sujeto}
                    onChange={(e) => {
                        let aux = conclusion.sujetos;
                        aux[index] = e.target.value.toLocaleUpperCase();
                        setConclusion({ ...conclusion, sujetos: aux });
                    }}
                />
            </td>
        );
    });

    const cdbody = condiciones.map((item, index) => {
        const cddata = item.sujetos.map((sujeto, index2) => {
            return (
                <td>
                    <input
                        key={index2}
                        className="form-control form-control-lg text-uppercase"
                        type="text"
                        placeholder="Variable"
                        value={sujeto}
                        onChange={(e) => {
                        setCondiciones(
                            condiciones.map((item2, index3) => {
                            if (index3 === index) {
                                let aux = item.sujetos;
                                aux[index2] = e.target.value.toLocaleUpperCase();
                                return { ...item2, sujetos: aux };
                            } else {
                                return item2;
                            }
                            })
                        );
                        }}
                    />
                </td>
            );
        });
        return (
            <tr>
                <td>
                    <div className="form-group">
                        <input
                            className="form-control form-control-lg text-uppercase"
                            type="text"
                            placeholder="Predicado"
                            value={item.predicado}
                            onChange={(e) =>
                                setCondiciones(
                                condiciones.map((item2, index2) => {
                                    if (index2 === index) {
                                    return { ...item2, predicado: e.target.value.toLocaleUpperCase() };
                                    } else {
                                    return item2;
                                    }
                                })
                                )
                            }
                        />
                    </div>
                </td>
                {cddata}
                <td>
                    <div className="btn-group p-2" role="group">
                        <span
                            type="button"
                            className="badge bg-success fs-3 py-0 px-3"
                            id={index}
                            onClick={addCDSubject}
                        >
                        +
                        </span>
                        <span
                            type="button"
                            className="badge bg-dark ms-1 fs-3 py-0 px-3"
                            id={index}
                            onClick={deleteCDSubject}
                            >
                            -
                            </span>
                    </div>
                </td>
            </tr>
        );
    });

    //-------------------------------------------------------------------------

    const opdata = operadores.map((item, index) => {
        return (
            <select
                className="form-select col me-3"
                key={index}
                id={index}
                defaultValue={"AND"}
                onChange={(e) =>
                setOperadores(
                    operadores.map((item2, index2) => {
                    if (index2 === index) {
                        return e.target.value;
                    } else {
                        return item2;
                    }
                    })
                )}
            >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="THEN">THEN</option>
            </select>
        );
    });


    return (
        <div className="container mt-5">
            <div className="alert alert-dismissible alert-light">
                <h1>BASE DE CONOCIMIENTOS</h1>
            </div>
            <h2>CONCLUSIÓN</h2>
            <table className="table">
                <thead>
                    <tr className="table-dark">
                        <th scope="col" className="ps-3">
                            PREDICADO
                        </th>
                        {ccheader}
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <div className="form-group">
                            <input
                                className="form-control form-control-lg text-uppercase"
                                type="text"
                                placeholder="Predicado"
                                value={conclusion.predicado}
                                onChange={(e) =>
                                    setConclusion({ ...conclusion, predicado: e.target.value.toLocaleUpperCase() })
                                }
                            />
                        </div>
                    </td>
                    {ccdata}
                    <td>
                        <div className="btn-group p-2" role="group">
                            <span
                                type="button"
                                className="badge bg-success fs-3 py-0 px-3"
                                onClick={addCCSubject}
                            >
                            +
                            </span>
                            <span
                                type="button"
                                className="badge bg-dark ms-1 fs-3 py-0 px-3"
                                onClick={deleteCCSubject}
                            >
                            -
                            </span>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <h2>CONDICIONES</h2>
            <button
                type="button"
                className="btn btn-outline-info mb-3 me-2"
                onClick={addCondicion}
            >
                <i className="fas fa-plus-circle me-2"></i>
                Condición
            </button>
            <table className="table">
                <thead>
                    <tr className="table-dark">
                        <th scope="col" className="ps-3">
                            PREDICADO
                        </th>
                        {cdheader}
                    </tr>
                </thead>
                <tbody>{cdbody}</tbody>
            </table>
            <h2>OPERADORES</h2>
            <div className="form-group row my-3">
                {opdata}
                <div className="col-6"></div>
            </div>
            <button
                type="button"
                className="btn btn-outline-info mb-2"
                onClick={handleaddRule}
            >
                <i className="fas fa-file-export me-2"></i>
                Guardar
            </button>
        </div>
    )
}
