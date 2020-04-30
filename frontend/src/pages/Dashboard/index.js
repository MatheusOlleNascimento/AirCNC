import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/api';

import  './styles.css';

export default function Dashboard(){
    const [spots, SetSpots] = useState([]);

    useEffect(() => {
        const user_id = localStorage.getItem('user');
        //Faz uma conexão realtime com o backend 
        const socket = socketio('http://localhost:3333', {
            query: {user_id},
        });

        // //Escuta mensagens em realtime que sejam hello
        // socket.on('hello', data => {
        //     console.log(data);
        // })

        // //Envia uma mensagem para o backend em realtime
        // socket.emit('omni', 'Stack');

    }, []);

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            SetSpots(response.data);
        }
        loadSpots();

    }, []);

    return (
        <>
        <ul className="spot-list">
            {spots.map(spot =>(
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    
                </li>
            ))}
        </ul>

        <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
        </Link>
        </>

    )
}