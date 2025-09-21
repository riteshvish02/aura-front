import React from 'react';

const FormToggle = ({ isLogin, toggleAuthMode }) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-600">
        {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
        <button
          type="button"
          onClick={toggleAuthMode}
          className="font-medium text-black hover:underline focus:outline-none transition duration-150"
        >
          {isLogin ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </p>
    </div>
  );
};

export default FormToggle;
