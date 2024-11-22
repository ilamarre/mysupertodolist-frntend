import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TaskFrom from '../components/TaskFrom';
import TaskList from '../components/TaskList';
function Todos() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();

  useEffect(() => {
    if (!user.token) {
      router.replace('/'); // Rediriger vers la page d'accueil si l'utilisateur n'est pas authentifié
    }
  }, [user.token]);

  return (
    <div>
      <h1>Bienvenue sur votre Todo List</h1>
      <p>Utilisateur connecté : {user.pseudo}</p>
      <TaskFrom />
      <TaskList/>
    </div>
  );
}

export default Todos;



//   si un utilisateur essai d accede a la page todos sans etre connecter il sera rediriger vers la page d acceuil graca a useeffect