import React from 'react';

const Button = ({ className, onClick, children }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
      <style jsx>{`
        button {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </button>
  );
};

export default Button;
