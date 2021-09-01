import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { startListFacts } from '../actions/facts';

export const FactsList = () => {

    const dispatch = useDispatch();

    const { fact } = useSelector( state => state );

    const facts = fact.facts;

    useEffect(() => {
        dispatch(startListFacts());
    }, [dispatch]);

    return (
        <div className="container mt-5">
            <div className="alert alert-dismissible alert-light">
                <h1>LISTA DE HECHOS</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">HECHOS</th>
                    </tr>
                </thead>
                <tbody>
                    {!!facts && facts.map((item) => {
                        return (
                            <tr className="table-primary">
                                <td>
                                {item.predicado +
                                    "(" +
                                    item.sujetos.map((sujeto, index) => {
                                    if (index === 0 && item.sujetos.length > 1) {
                                        return `${sujeto}`;
                                    }
                                    if (index === item.sujetos.length - 1) {
                                        return `${sujeto})`;
                                    }
                                    })}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}
