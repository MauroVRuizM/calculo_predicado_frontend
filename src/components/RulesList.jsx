import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { startListRules } from '../actions/rules';

export const RulesList = () => {

        const dispatch = useDispatch();

        const { rule } = useSelector( state => state );

        const rules = rule.rules;

        useEffect(() => {
            dispatch(startListRules());
        }, [dispatch]);

    return (
        <div className="container mt-5">
            <div className="alert alert-dismissible alert-light">
                <h1>LISTA DE CONOCIMIENTOS</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">CONOCIMIENTOS</th>
                    </tr>
                </thead>
                <tbody>
                {
                    !!rules && rules.map((item) => {
                        // console.log(item);
                        return (
                            <tr className="table-primary">
                                <td>
                                {
                                    //condiciones
                                    "SI {" +
                                    item.condiciones.map((cond, index2) => {
                                    let operador = "";
                                    if (index2 > 0) {
                                        operador = item.operadores[index2 - 1];
                                    }
                                    return (
                                        operador +
                                        " " +
                                        cond.predicado +
                                        "(" +
                                        cond.sujetos.map((sujeto, index) => {
                                        if (index === 0 && cond.sujetos.length > 1) {
                                            return `${sujeto}`;
                                        }
                                        if (index === cond.sujetos.length - 1) {
                                            return `${sujeto})`;
                                        }
                                        })
                                    );
                                    }) +
                                    //conclusion
                                    "} ENTONCES {" +
                                    item.conclusion.predicado +
                                    "(" +
                                    item.conclusion.sujetos.map((sujeto, index) => {
                                    if (index === 0 && item.conclusion.sujetos.length > 1) {
                                        return `${sujeto}`;
                                    }
                                    if (index === item.conclusion.sujetos.length - 1) {
                                        return `${sujeto})`;
                                    }
                                    }) +
                                    "}"
                                }
                            </td>
                            </tr>
                        );
                    })
                }
            </tbody>
            </table>
        </div>
    )
}
