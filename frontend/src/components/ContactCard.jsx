import Icon from '../assets/unknown.svg?react';

export const ContactCard = ({ onClick, reference, selected, name, lastMessage }) => {
  return (
    <div ref={reference} onClick={onClick} 
         className={`px-3 py-2 mx-3 my-2 text-white flex items-center rounded-2xl cursor-pointer
                    ${selected ? "bg-blue-600" : "bg-blue-500 hover:bg-slate-500"} 
                    transition duration-200`}>
      
    
      <div className="mr-3">
        <Icon className="h-11 w-11 text-white rounded-full" />
      </div>

      
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="text-lg font-semibold truncate max-w-[300px]">{name}</div>
        <div className="text-sm text-gray-200 truncate max-w-[300px]">{lastMessage || "No recent message"}</div>
      </div>
      
    </div>
  );
};
