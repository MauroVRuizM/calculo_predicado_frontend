import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import { startAddFacts } from '../actions/facts';

export const Facts = () => {

    const dispatch = useDispatch();
    const { fact } = useSelector( state => state );
    const [facts, setFacts] = useState([{ predicado: "", sujetos: [""] }]);
    const [max, setMax] = useState([""]);
    let history = useHistory();
    const { success, msg } = fact;


    if(success) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${msg}`,
            showConfirmButton: false,
            timer: 2000,
            didClose: () => {history.push('/list/facts')}
        })
    }



    const handleAddFact = () => {
        dispatch(startAddFacts(facts));
    }

    const addFact = () => {
        setFacts([...facts, { predicado: "", sujetos: [""] }]);
    };

    const addSubject = (event) => {
        let maxt = facts.reduce(function (prev, current) {
            return prev.sujetos.length > current.sujetos.length ? prev : current;
        });
        setMax([...maxt.sujetos, ""]);
        const id = parseInt(event.target.id);
        setFacts(
            facts.map((item, index) => {
                if (index === id) {
                    return { ...item, sujetos: [...item.sujetos, ""] };
                } else {
                    return item;
                }
            })
        );
    };

    const deleteSubject = (event) => {
        const id = parseInt(event.target.id);
        setFacts(
            facts.map((item, index) => {
                if (index === id) {
                    return { ...item, sujetos: item.sujetos.splice(-1, 1) };
                } else {
                    return item;
                }
            })
        );
    };

    // --------- CABECERA DINAMICA DE LA TABLA -------------------------------

    const theader = max.map((index) => {
        return (
        <th scope="col" className="ps-3">
            {`SUJETO ${index + 1}`}
        </th>
        );
    });

     // --------- CUERPO DINAMICO DE LA TABLA -------------------------------

    const tbody = facts.map((item, index) => {
        const tdata = item.sujetos.map((sujeto, index2) => {
        return (
            <td>
            <input
                className="form-control form-control-lg text-lowercase"
                type="text"
                placeholder="Sujeto"
                value={sujeto}
                onChange={(e) => {
                setFacts(
                    facts.map((item2, index3) => {
                    if (index3 === index) {
                        let aux = item.sujetos;
                        aux[index2] = e.target.value.toLowerCase();
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
                    setFacts(
                    facts.map((item2, index2) => {
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
            {tdata}
            <td>
            <div className="btn-group p-2" role="group">
                <span
                type="button"
                className="badge bg-success fs-3 py-0 px-3"
                id={index}
                onClick={addSubject}
                >
                +
                </span>
                <span
                type="button"
                className="badge bg-dark ms-1 fs-3 py-0 px-3"
                id={index}
                onClick={deleteSubject}
                >
                -
                </span>
            </div>
            </td>
        </tr>
        );
    });

    //----------------------------------------------------------------------------

    return (
        <div className="container mt-5">
            <div className="alert alert-dismissible alert-light">
                <h1>BASE DE HECHOS</h1>
            </div>
            <button
                type="button"
                className="btn btn-outline-info ms-2 mb-3"
                onClick={addFact}
            >
                <i className="fas fa-plus-circle me-2"></i>
                Hecho
            </button>
            <table className="table">
                <thead>
                <tr className="table-dark">
                    <th scope="col" className="ps-3">
                    PREDICADO
                    </th>
                    {theader}
                </tr>
                </thead>
                <tbody>{tbody}</tbody>
            </table>
            <button
            type="button"
            className="btn btn-outline-info"
            onClick={handleAddFact}
        >
            <i className="fas fa-file-export me-2"></i>
            Guardar
        </button>
        </div>
    )
}
