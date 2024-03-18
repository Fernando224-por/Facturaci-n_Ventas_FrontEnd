// Importa React y los hooks necesarios
import React, { useEffect, useState } from 'react';
// Importa componentes de Formik para manejar formularios
import { Formik, Form, Field, ErrorMessage } from 'formik';
// Importa Yup para validación de formularios
import * as Yup from 'yup';
// Importa componentes personalizados
import Navbar from '../components/NavBar.jsx';
import Table from '../components/ReactTable.jsx';
import Modal from 'react-modal';
// Importa estilos CSS
import '../css/Roles.css'

// Función para manejar la creación de un rol
const createRole = (role) => {
  console.log(role);
};
// Configura el elemento raíz para el modal
Modal.setAppElement('#root');

// Componente principal para listar roles
const RoleList = ({ roles = [] }) => {
  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);

  // Valores iniciales para el formulario
  const initialValues = {
    name: '',
    description: '',
  };

  const [showEditModal, setShowEditModal] = useState(false);
  // Estado para almacenar el rol que se está editando
  const [editingRole, setEditingRole] = useState(null);
  // Estado para almacenar los valores iniciales del formulario de edición
  const [editFormValues, setEditFormValues] = useState(initialValues);

  const editRole = (role) => {
    if (role && role.name && role.description) {
      setEditingRole(role);
      setEditFormValues({
        name: role.name,
        description: role.description,
      });
      setShowEditModal(true);
    } else {
      console.error('El rol proporcionado es inválido o está incompleto.');
    }
  };

  const updateRole = (id, updatedRole) => {
    // Aquí iría la lógica para actualizar el rol en tu backend o estado local
    console.log(`Actualizando rol con ID: ${id}`, updatedRole);
  };

  const disableRole = (id) => {
    setData(data.map(role => {
      if (role.id === id) {
        return { ...role, isEnabled: false };
      }
      return role;
    }));
  };

  const enableRole = (id) => {
    setData(data.map(role => {
      if (role.id === id) {
        return { ...role, isEnabled: true };
      }
      return role;
    }));
  };



  // Esquema de validación para el formulario
  const validationSchema = Yup.object({
    name: Yup.string().required('The name of the role is required'),
    description: Yup.string().required('Role description is required'),
  });

  // Estado para almacenar los datos de la tabla
  const [data, setData] = useState([]);

  // Efecto para cargar datos al montar el componente
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  // Definición de las columnas para la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: 'User id',
        accessor: 'userId',
      },
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Acciones',
        id: 'acciones',
        accessor: row => (
          <div>
            {row.original && row.original.isEnabled !== undefined ? (
              row.original.isEnabled ? (
                <button className="buttonList" onClick={() => disableRole(row.original.id)}>Deshabilitar</button>
              ) : (
                <button className="buttonList" onClick={() => enableRole(row.original.id)}>Habilitar</button>
              )
            ) : (
              <span className="buttonList">Estado desconocido</span>
            )}
            <button className="buttonList" onClick={() => editRole(row.original)}>Editar</button>
          </div>
        ),
        Cell: ({ value }) => (
          <div style={{ textAlign: "center" }}>
            {value}
          </div>
        ),
      },
    ],
    [data]
  );

  // Renderizado del componente
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
              backgroundColor: 'rgba(94, 89, 89, 0.75)',
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
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              createRole(values);
              setSubmitting(false);
              setShowForm(false);
            }}
          >
            {({ isSubmitting }) => (
              //Formulario de la modal
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
        <Modal
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
          closeTimeoutMS={500}
          style={{
            overlay: {
              backgroundColor: 'rgba(94, 89, 89, 0.75)',
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
            initialValues={editingRole}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Aquí va la lógica para actualizar el rol en tu backend o estado local
              console.log('Actualizando rol:', values);
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