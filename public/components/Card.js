const Card = ({ children, className }) => {
    return (
      <div
        className={`max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white p-6 transition-transform transform hover:scale-105p-5 ${className}`}
      >
        {children}
      </div>
    );
  };
  
  export default Card;