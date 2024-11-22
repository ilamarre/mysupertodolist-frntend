import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'; //Pr etre rediriger




function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const router = useRouter();  //Pr etre rediriger


    const [signUpPseudo, setSignUpPseudo] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signInPseudo, setsignInPseudo] = useState('');
    const [signInPassword, setSignInPassword] = useState('');





    const handleRegister = () => {
        fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pseudo: signUpPseudo,
                password: signUpPassword,

            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.result) {
                    dispatch(login({ pseudo: signUpPseudo, token: data.token }));
                    setSignUpPseudo('');
                    setSignUpPassword('');
                    router.push('/todos'); // rediriger vers page todos
                }
            
            });
    };

    const handleConnection = () => {
        fetch("http://localhost:3000/users/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                pseudo: signInPseudo,
                password: signInPassword,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.result) {
                    dispatch(login({ pseudo: signInPseudo, token: data.token }));
                    setsignInPseudo('');
                    setSignInPassword('');
                    router.push('/todos');
                }
                
            });
    };



    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <h1 className={styles.title}>MySuperTodoList</h1>
            </div>
            <div className={styles.registerContainer}>
                <div className={styles.registerSection}>
                    <p className={styles.inputtext}>Céer votre compte</p>
                    <input className={styles.input}
                        type="text"
                        placeholder="Pseudo"
                        id="signUpPseudo"
                        onChange={(e) => setSignUpPseudo(e.target.value)}
                        value={signUpPseudo}
                    />
                    <input className={styles.input}
                        type="password"
                        placeholder="Password"
                        id="signUpPassword"
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        value={signUpPassword}
                    />
                    <button className={styles.bouton} id="register" onClick={handleRegister}>Register</button>
                </div>
                <div className={styles.registerSection}>
                    <p className={styles.inputtext}> Connection </p>
                    <input className={styles.input}
                        type="text"
                        placeholder="Pseudo"
                        id="signInPseudo"
                        onChange={(e) => setsignInPseudo(e.target.value)}
                        value={signInPseudo}
                    />
                    <input className={styles.input}
                        type="password"
                        placeholder="Password"
                        id="signInPassword"
                        onChange={(e) => setSignInPassword(e.target.value)}
                        value={signInPassword}
                    />
                    <button className={styles.bouton} id="connection" onClick={handleConnection}>Connect</button>
                </div>
            </div>


        </header >
    );
};
export default Home;