import { useDispatch, useSelector } from 'react-redux';
import { addTodos } from '../reducers/todos';
import React, { useState } from 'react';
import styles from '../styles/TaskFrom.module.css';
function TaskForm() {

    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch()
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('')
    const handleNewTask = () => {
        if (!user?.token) {
            return;
        }
        fetch('http://localhost:3000/users/addTask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title:title, description:description }),
        })
            .then(response => response.json())
            .then(data => {
                dispatch(addTodos({
                    title: data.title,
                    description: data.description, token: data.addTodos.token
                }));
                setTitle('');
                setDescription('');
            });
    };
    return (

        <div>
            <input
                type="text"
                placeholder="Titre de la todo"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={styles.inputTitle}
            />
            <textarea
                placeholder="Description de la todo"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={styles.inputdescription}
            />
            <button onClick={() => handleNewTask()}
                className={styles.button}>

                Ajouter la task
            </button>
        
            </div> 
        
    );
};
export default TaskForm;






//         fetch("http://localhost:3000/users/task", {
//             method: "POST",
//             headers: { "Content-Type": "application/json"  
//             },
//             body: JSON.stringify({
//                 title: data.title,
//                 description: data.description,

//             }),
//         })
//          .then((response) => {
//             if(!response.ok)
//                 alert('erreur')
//             return ;
//         }
//   .then((data) => {
//     if (data) {
//         dispatch(addTodos({ title : data.task.title, description: data.task.description }));
//         setTitle('');
//         setDescription('');
//     alert('tache ajoutee')
//     }
// });




