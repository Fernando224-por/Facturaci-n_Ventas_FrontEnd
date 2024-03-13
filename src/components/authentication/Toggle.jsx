// Define el componente Toggle que renderiza un contenedor de alternancia
function Toggle() {
  return (
    <div className="toggle-container">
      <div className="toggle">
        {/* Panel de bienvenida para usuarios existentes */}
        <div className="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          {/* Botón oculto para iniciar sesión, se maneja la lógica de alternancia en otro componente */}
          <button className='hidden' id='login'>Sign in</button>
        </div>
        {/* Panel de bienvenida para nuevos usuarios */}
        <div className="toggle-panel toggle-right">
          <h1>Hello Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          {/* Botón oculto para registrarse, se maneja la lógica de alternancia en otro componente */}
          <button className='hidden' id='register'>Sign up</button>
        </div>
      </div>
    </div>
  )
}

// Exporta el componente Toggle para su uso en otras partes de la aplicación
export default Toggle;
