// Define el componente Toggle que renderiza un contenedor de alternancia
function Toggle() {
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div className="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site feactures</p>
          <button className='hidden' id='login'>sing in</button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Hello Friend!</h1>
          <p>Register with your personal details to use all of site feactures</p>
          <button className='hidden' id='register'>sing up</button>
        </div>
      </div>
    </div>
  )
}

// Exporta el componente Toggle para su uso en otras partes de la aplicación
export default Toggle;
