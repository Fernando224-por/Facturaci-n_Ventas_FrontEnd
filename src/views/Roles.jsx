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
import instance from '../api/axios.js';

//---------------------------------Importar rutas de comunicacion con el back---------------------------------
import { createRol } from '../api/role.js'
import { consultRole } from '../api/role.js'
import { updateRol } from '../api/role.js'
import { desableRol } from '../api/role.js'



Modal.setAppElement('#root');


//---------------------------------Inicio del componente---------------------------------
const RoleList = (props) => {

  //---------------------------------Listar Roles---------------------------------
  const fetchRoles = async () => {
    try {
      const response = await instance.get('/getRoles');
      // Ordenar los roles primero por estado (activos primero), luego por ID (más recientes primero)
      const sortedRoles = response.data.info.sort((a, b) => {
        // Primero, ordenar por estado
        if (a.state === 'ACTIVE' && b.state !== 'ACTIVE') {
          return -1; // a va primero
        }
        if (a.state !== 'ACTIVE' && b.state === 'ACTIVE') {
          return 1; // b va primero
        }
        // Si el estado es el mismo, ordenar por ID (más recientes primero)
        return b.idRole - a.idRole; // b va primero para los más recientes
      });
      setData(sortedRoles);
    } catch (error) {
      console.error('Error al obtener los roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);


  //---------------------------------Definición de las columnas para la tabla---------------------------------
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID Role',
        accessor: 'idRole',
      },
      {
        Header: 'Name Role',
        accessor: 'nameRole',
      },
      {
        Header: 'Resume Role',
        accessor: 'resumeRole',
      },
      {
        Header: 'estado',
        accessor: 'state',
      },
      {
        Header: 'Acciones',
        id: 'acciones',
        accessor: row => {
          return (
            <div>
              <button className="buttonList" onClick={() => handleEditClick(row.idRole)}>Edit</button>
              <button className="buttonList" onClick={() => handleDisableClick(row.idRole)}>Disable</button>
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

  //---------------------------------Crear Roles---------------------------------
  const createRole = async (values) => {
    try {
      const roleData = {
        nameRole: values.name,
        resumeRole: values.description,
      };
      const response = await createRol(roleData);
    } catch (error) {
      console.error('Error al crear el rol:', error);
    }
  };


  const initialValues = {
    name: '',
    description: '',
  };

  //---------------------------------Editar roles---------------------------------

  const [selectedRole, setSelectedRole] = useState({});


  const handleEditClick = async (idRole) => {
    setShowEditModal(true);
    await loadRoleData(idRole);
  };

  const loadRoleData = async (idRole) => {
    try {
      const response = await consultRole(idRole);
      setSelectedRole(response.data.info);
    } catch (error) {
      console.error('Error al cargar los datos del rol:', error);
    }
  };

  const foundValues = {
    name: selectedRole.nameRole || '',
    description: selectedRole.resumeRole || '',
  };

  const updateRole = async (values, idRole) => {
    try {
      const roleData = {
        nameRole: values.name,
        resumeRole: values.description,
      };
      await updateRol(idRole, roleData);
      fetchRoles();
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
    }
  };

  //------------------------------Deshabilitar Roles---------------------------

  const handleDisableClick = async (idRole) => {
    const userConfirmed = window.confirm('¿Estás seguro de que quieres deshabilitar este rol?');

    if (userConfirmed) {
      try {
        await desableRol(idRole);
        fetchRoles();
      } catch (error) {
        console.error('Error al deshabilitar el rol:', error);
      }
    }
  };



  //---------------------------------Modales---------------------------------
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);


  //---------------------------------Otros---------------------------------
  const [data, setData] = useState([]);



  //---------------------------------Renderizado del componente---------------------------------
  return (
    <div className='generalContainer'>
      <h1 className='tituloRoles'>Roles</h1>
      <div className="role-list">
        <Navbar />
        {/* Botón para desplegar formulario de creacion */}
        <button className='crearRol' onClick={() => setShowForm(!showForm)}>Create Rol</button>
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
              createRole(values);
              setSubmitting(false);
              setShowForm(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="role-form">
                <h1>Create Rol</h1>
                <Field placeholder='Name' type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" />

                <Field placeholder='Description' className="description" as="textarea" id="description" name="description" />
                <ErrorMessage name="description" component="div" />

                <button type="submit" disabled={isSubmitting}>
                  Crear
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
            initialValues={foundValues}
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
                <h1>Editar Rol</h1>
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

export default RoleList;