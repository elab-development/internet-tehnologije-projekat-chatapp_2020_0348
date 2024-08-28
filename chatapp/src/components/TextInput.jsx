import React from 'react';
import './TextInput.css';

const TextInput = ({ label, id, type = 'text', value, onChange, placeholder, className}) => {
  return (
    <div className="text-input-container">
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`text-input ${className}`}
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`text-input ${className}`}
        />
      )}
    </div>
  );
};

export default TextInput;
