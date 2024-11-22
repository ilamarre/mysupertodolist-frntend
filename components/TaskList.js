import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import styles from '../styles/TaskList.module.css';




function TaskList() {
    const user = useSelector((state) => state.user.value)

    const [List, setList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${user.token}`)
            .then(response => response.json())
            .then(data => {
                setList(data.Task.tasks)
                //console.log(data.Task.tasks)
            });
    }, [])
    let listtask = <p>Pas de Todo</p>;
    console.log(List)
    listtask = List.map((data, i) => {
        return <div key={i} className={styles.task}>
            <h3 > {data.title}</h3>
            <p className={styles.description}> {data.description}</p>

            <div className={styles.bouton}>
                <button className={styles.delbouton} >supprimer</button>
                <button className={styles.modifybouton}>modifier</button>
                <button className={styles.checkbouton}>terminée</button>
            </div>
        </div>

    })
    return (
        <div className={styles.card}>

            <h2 className={styles.name}> Liste des taches de {user.pseudo}</h2>
            {listtask}
        </div>
    );
}

export default TaskList;