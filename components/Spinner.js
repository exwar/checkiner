const Spinner = () => {
  return (
    <div>
      <style jsx>{`
        div {
          position: relative;
          width: 5rem;
          height: 5rem;
        }

        div:before {
          content: '';
          height: 5rem;
          width: 5rem;
          position: absolute;
          border-width: 1rem;
          border-style: solid;
          border-color: rgba(145, 92, 182, 0.9) rgba(255, 255, 255, 1) rgba(255, 255, 255, 1);
          border-radius: 100%;
          animation: rotation 0.7s infinite linear;
        }

        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(359deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
