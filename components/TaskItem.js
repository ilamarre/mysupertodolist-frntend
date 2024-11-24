import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import styles from '../styles/TaskItems.module.css';
import { Tasklist } from '../components/TaskList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMarker, faCircleCheck, faShare } from '@fortawesome/free-solid-svg-icons';


function TaskItem(props) {
    const { id, title, description, onCompleted, completed, onDelete, onModify } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);

    useEffect(() => {
        // Synchronise l'état local avec les props
        setEditTitle(title);
        setEditDescription(description);
    }, [title, description]);

    const handleSave = () => {

        onModify(id, editTitle, editDescription);
        setIsEditing(false); // Ferme la modal
    };

    console.log("Props reçues dans TaskItem :", { id, title, description, completed });

    return (
        <div className={`${styles.task} ${completed ? styles.completed : ''}`}>
            <h3>{title}</h3>
            <p className={styles.description}>{description}</p>
            <div className={styles.bouton}>
                <FontAwesomeIcon icon={faCircleCheck} className={styles.checkbouton}
                    onClick={() => {
                        console.log("Changement d'état de completion :", { id, completed });
                        onCompleted(id, completed, title, description);
                    }}

                //completed ? 'Annuler Terminer' : 'Terminer'}
                />
                <FontAwesomeIcon icon={faTrash} className={styles.delbouton}
                    onClick={() => {
                        console.log("Suppression demandée pour :", id);
                        onDelete(id);
                    }} />
                <FontAwesomeIcon icon={faMarker} className={styles.modifybouton}
                    onClick={() => {
                        console.log("Ouverture de la modal pour :", id);
                        setIsEditing(true);
                    }}
                />
            </div>

            {isEditing && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Modifier la tâche</h3>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Titre"
                            className={styles.inputTitle}
                        />
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            placeholder="Description"
                        />
                        <div className={styles.modalActions}>

                            <FontAwesomeIcon icon={faShare} flip="horizontal" style={{ color: "#f60404", }}
                                onClick={() => {
                                    console.log("Fermeture de la modal pour :", id);
                                    setIsEditing(false);
                                }} className={styles.cancelbouton} />
                            <FontAwesomeIcon icon={faShare} style={{ color: "#03b57f", }} onClick={handleSave} className={styles.savebouton}

                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default TaskItem;


