// Buttons.jsx
export function Button({ disabled, children, onClick }) {
  return (
    <span
       onClick={disabled?convey : onClick}
      className={`flex justify-center px-8 py-5 w-[150px] text-white text-2xl cursor-pointer rounded-2xl ${
        disabled ? "bg-blue-200" : "bg-green-400"
      }`}
    >
      {children}
    </span>
  );
}
function convey(){
  alert("Please put valid credentials")
}
export function SignUpButton({ children, onClick, disabled,checker}) {
  checker()

  
  return (
    <span
      onClick={disabled ? convey : onClick}
      className={`flex justify-center px-8 py-5 w-[300px] hover:bg-blue-200 transition-all duration-300 ease-in-out text-white text-2xl cursor-pointer rounded-2xl ${
        disabled ? "bg-blue-200" : "bg-green-400"
      }`}
    >
      {children}
    </span>
  );
}

