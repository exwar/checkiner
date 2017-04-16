import React from 'react';

const TextArea = ({ value, placeholder, className, onChange }) => {
  return (
    <div className={className}>
      <textarea placeholder={placeholder} onChange={onChange} value={value} />
      <style jsx>{`
        textarea {
          border-radius: .4rem;
          resize: none;
          height: 15rem;
          width: 100%;
          margin: 0;
          padding: 2rem;
          border: none;
          vertical-align: top;
          font: 1.6rem 'PT Mono', monospace;
          line-height: 2rem;
          transition: box-shadow .2s;
        }

        textarea:focus {
          outline: none;
          box-shadow: 0 0 5px 5px rgba(145, 92, 182, .5);
        }
      `}</style>
    </div>
  );
};

export default TextArea;
