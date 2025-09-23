import React from 'react';

const FormToggle = ({ isLogin, toggleAuthMode }) => {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-600">
        Are you a student?{" "}
        <a
          href="/"
          className="font-medium text-blue-600 hover:underline focus:outline-none transition duration-150"
        >
          Login as Student
        </a>
      </p>
    </div>
  );
};

export default FormToggle;
