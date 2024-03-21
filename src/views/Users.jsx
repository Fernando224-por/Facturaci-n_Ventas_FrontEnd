//---------------------------------importar librerias y recursos necesarios---------------------------------
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

//---------------------------------Importa estilos CSS---------------------------------
import '../css/Roles.css'

//---------------------------------Importar validaciones---------------------------------
import { validationForm } from '../validations/schema.js'

//---------------------------------Importar componentes---------------------------------
import Navbar from '../components/NavBar.jsx';
import Table from '../components/ReactTable.jsx';
import Modal from 'react-modal';

//---------------------------------Importar rutas de comunicacion con el back---------------------------------
import { userList } from '../api/user.js'



Modal.setAppElement('#root');


//---------------------------------Inicio del componente---------------------------------
const UserList = (props) => {

    //---------------------------------Listar Roles---------------------------------
    const fetchUsers = async () => {
        try {
            const response = await userList();
            // Ordenar los usuarios por algún criterio relevante
            setData(response.data.info);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    //---------------------------------Definición de las columnas para la tabla---------------------------------
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'idUser',
            },
            {
                Header: 'Name',
                accessor: 'nameUser',
            },
            {
                Header: 'Email',
                accessor: 'emailUser',
            },
            {
                Header: 'State',
                accessor: 'state',
            },
            {
                Header: 'roles',
                accessor: 'roleIdRole',
            },
            {
                Header: 'Acciones',
                id: 'acciones',
                accessor: row => {
                    return (
                        <div>
                            <button className="buttonList">Edit</button>
                            <button className="buttonList">Disable</button>
                        </div>
                    );
                },
                Cell: ({ value }) => (
                    <div style={{ textAlign: "center" }}>
                        {value}
                    </div>
                ),
            },
        ],
        []
    );

    const [data, setData] = useState([]);


    //---------------------------------Crear Usuario---------------------------------

    const initialValues = {
        name: '',
        description: '',
    };

    //---------------------------------Editar Usuario---------------------------------


    //------------------------------Deshabilitar Usuario---------------------------



    //---------------------------------Modales---------------------------------
    const [showForm, setShowForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


    //---------------------------------Otros---------------------------------



    //---------------------------------Renderizado del componente---------------------------------
    return (
        <div className='generalContainer'>
            <h1 className='tituloRoles'>Users</h1>
            <div className="role-list">
                <Navbar />
                {/* Botón para desplegar formulario de creacion */}
                <button className='crearRol' onClick={() => setShowForm(!showForm)}>Create User</button>
                <Modal
                    isOpen={showForm}
                    onRequestClose={() => setShowForm(false)}
                    closeTimeoutMS={500}
                    //Aqui se pone el estilo de la modal
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(94, 89, 89, 0.322)',
                        },
                        content: {
                            backgroundColor: '#f9f9f9',
                            borderRadius: '10px',
                            padding: '20px',
                            width: '500px',
                            height: '500px',
                            margin: 'auto',
                        },
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationForm}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false);
                            setShowForm(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="role-form">
                                <h1>Create User</h1>
                                <Field placeholder='Name' type="text" id="name" name="name" />
                                <ErrorMessage name="name" component="div" />

                                <Field placeholder='Description' className="description" as="textarea" id="description" name="description" />
                                <ErrorMessage name="description" component="div" />

                                <button type="submit" disabled={isSubmitting}>
                                    Create
                                </button>
                            </Form>
                        )}
                    </Formik>
                </Modal>
                {/* Modal con formulario de edicion */}
                <Modal
                    isOpen={showEditModal}
                    onRequestClose={() => setShowEditModal(false)}
                    closeTimeoutMS={500}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(94, 89, 89, 0.322)',
                        },
                        content: {
                            backgroundColor: '#f9f9f9',
                            borderRadius: '10px',
                            padding: '20px',
                            width: '500px',
                            height: '500px',
                            margin: 'auto',
                        },
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationForm}
                        enableReinitialize={true}
                        onSubmit={(values, { setSubmitting }) => {
                            updateRole(values, selectedRole.idRole);
                            setSubmitting(false);
                            setShowEditModal(false);
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="role-form">
                                <h1>Edit User</h1>
                                <Field placeholder='Name' type="text" id="name" name="name" />
                                <ErrorMessage name="name" component="div" />

                                <Field placeholder='Description' className="description" as="textarea" id="description" name="description" />
                                <ErrorMessage name="description" component="div" />

                                <button type="submit" disabled={isSubmitting}>
                                    Actualizar
                                </button>
                            </Form>
                        )}
                    </Formik>

                </Modal>

            </div>
            <Table columns={columns} data={data} />
        </div>
    );
};

export default UserList;