import Home from './Home';
import Users from './Users';

const routes = {
    home: {
        path: "/",
        component: Home,
        title: "Ajouter un utilisateur",
        exact: true
    },
    users: {
        path: "/users",
        component: Users,
        title: "Liste des utilisateurs",
        exact: false
    },
    edit: {
        path: "/edit",
        title: "Modifier un utilisateur",
        exact: true
    },
};

export default routes
