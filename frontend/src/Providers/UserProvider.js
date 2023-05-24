import { useState, createContext } from "react";

export const UserContext = createContext();

export function  UserProvider(props) {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        users: [],
        editing: false,
        id: ''
    });

    const getUsers = async () => {
        console.log("Getting Users");
        const response = await fetch(`/users`).then(res => res.json());
        setState({...state, users: response, editing: false});
    }

    const createUser = async () => {
        const userResponse = window.confirm('Are you sure you want to create this user?');
        if(!userResponse) return;
        const response = await fetch(`/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password
            })
        }).then(res => res.json());
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete this user?');
        if(!!userResponse){
            await fetch(`/user/${id}`,{
                method: 'DELETE',
            });
            await getUsers();
        }
    }

    const editUser = async (id) => {

        const { user } = await fetch(`/user/${id}`).then(res => res.json());
        setState({
            ...state,
            name: user.name,
            email: user.email,
            password: user.password,
            id: id,
            editing: true
        });

    }

    const updateUser = async () => {
        const { id } = state;
        const response = await fetch(`/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password
            })      
        }).then(res => res.json());
    }


    return (
        <UserContext.Provider value={{ getUsers, createUser, deleteUser, editUser, updateUser, setState, state }}>
            {props.children}
        </UserContext.Provider>
    )
}