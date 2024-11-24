import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import styles from '../styles/TaskList.module.css';
import TaskItem from './TaskItem';



function TaskList() {
    const user = useSelector((state) => state.user.value)
    const [List, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Ajoute l'état pour gérer les erreurs
    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${user.token}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.Task && data.Task.tasks) {
                    setList(data.Task.tasks);
                } else {
                    console.error("Données inattendues :", data);
                    setError("Erreur de données reçues.");
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur lors de la récupération des tâches :", err);
                setError("Erreur de connexion au serveur.");
                setLoading(false);
            });
    }, [user.token]);

    const handleDelete = (taskId) => {
        fetch(`http://localhost:3000/tasks`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Id: taskId, token: user.token }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setList(List.filter(task => task._id !== taskId));
                } else {
                    console.error("Échec de la suppression :", data);
                    setError("La suppression a échoué.");
                }
            })

    };

    const handleComplete = (taskId, completed, title, description) => {
        fetch(`http://localhost:3000/upDateTasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed, title, description }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    setList(List.map(task =>
                        task._id === taskId ? { ...task, completed: !completed } : task
                    ));
                }
            });
    };

    const handleModify = (taskId, newTitle, newDescription) => {
        console.log("Données envoyées :", { taskId, newTitle, newDescription });

        fetch(`http://localhost:3000/upDateTasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Réponse du serveur :", data);
                if (data.result) {
                    setList(List.map(task =>
                        task._id === taskId ? { ...task, title: newTitle, description: newDescription } : task
                    ));
                };
            });
    };

    const listtask = List.map((data) => (
        <TaskItem
            key={data._id}
            id={data._id}
            title={data.title}
            description={data.description}
            completed={data.completed}
            onDelete={handleDelete}
            onCompleted={handleComplete}
            onModify={handleModify}
        />
    ));

    // let listtask = <p>Pas de Todo</p>;
    // console.log(List)
    // listtask = List.map((data, i) => {
    //     return <div key={i} className={styles.task}>
    //         <h3 > {data.title}</h3>
    //         <p className={styles.description}> {data.description}</p>

    //         <div className={styles.bouton}>
    //         <FontAwesomeIcon icon={faTrash}  className={styles.delbouton}/>
    //         <FontAwesomeIcon icon={faMarker} className={styles.modifybouton} />  
    //         <FontAwesomeIcon icon={faCircleCheck} className={styles.checkbouton} />   

    //         </div>
    //  </div>


    return (
        <div className={styles.card}>
        <h2 className={styles.name}>Liste des tâches de {user.pseudo}</h2>
        {error && <p className={styles.error}>{error}</p>}
        {loading ? (
            <p>Chargement...</p>
        ) : listtask.length > 0 ? (
            listtask
        ) : (
            <p>Pas de Todo</p>
        )}
    </div>
    );
}


export default TaskList;