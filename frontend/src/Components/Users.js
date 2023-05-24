import { useEffect, useContext } from "react";
import { Form, Container, Row, Col, Input, Button, Table } from "reactstrap";
import { UserContext } from "../Providers/UserProvider";

export default function Users(){

    const { getUsers, createUser, deleteUser, updateUser, editUser, setState, state} = useContext(UserContext)


    const clearForm = (editing=false) => {
        setState({
            ...state,
            name: '',
            email: '',
            password: '',
            editing,
        })
    }

    useEffect(() => {
        console.log("Should get users")
        getUsers()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!state.editing){
            await createUser();
        }else{
           await updateUser();
        }
        await getUsers();
        clearForm();
    }

    return (
        <Container>
            <Row>
                <Col className="col-md-4">
                    <Form onSubmit={handleSubmit} className="card card-body">
                        <div className="my-2">
                            <Input 
                                type="text" 
                                value={state.name}
                                onChange={(e) => setState({ ...state, name: e.target.value})}
                                className="form-control"
                                placeholder="Name"
                                autoFocus
                            />
                        </div>
                        <div className="my-2">
                            <Input 
                                type="email" 
                                value={state.email}
                                onChange={(e) => setState({...state, email: e.target.value})}
                                className="form-control"
                                placeholder="Email"
                                autoFocus
                            />
                        </div>
                        <div className="my-2">
                            <Input
                                type="password" 
                                value={state.password}
                                onChange={(e) => setState({...state, password: e.target.value})}
                                className="form-control"
                                placeholder="Password"
                                autoFocus
                            />
                        </div>
                        <Button 
                            type="submit"
                            className={`btn ${state.editing ? 'btn-primary': 'btn-info'} mt-4`}
                        >
                            {state.editing ? 'EDIT': 'CREATE'}
                        </Button>
                    </Form>
                </Col>
                <Col className="col-md-8">
                    <div className="card card-body">
                        <Table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <Button 
                                            className="btn btn-secondary btn-sm btn-block"
                                            onClick={() => editUser(user._id)}
                                        >Edit</Button>
                                        <Button 
                                            onClick={() => deleteUser(user._id)}
                                            className="btn btn-danger btn-sm btn-block"
                                        >Delete</Button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}