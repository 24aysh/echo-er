import Icon from '../assets/send.svg?react';

export function SendBox({
  onSend,
  reference
}) {
  return (
    <div className="p-2 flex items-center gap-1">
      
      <input
        type="text"
        ref={reference}
        placeholder="Type a message"
        className="flex-grow border border-gray-300 rounded-2xl px-2 py-2 outline-none text-lg"
        onKeyUp={(e) =>{
            if(e.key == "Enter"){
                onSend()
            }
        }}
      />

      
      <button onClick={onSend}>
        <Icon className="h-14 w-14  rounded-full" />
      </button>
    </div>
  );
}
