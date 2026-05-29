import Icon from '../assets/unknown.svg?react';
 
export function Profile({ personName, onVideoCall }) {
  return (
    <div className="bg-slate-500 p-2 flex gap-2 rounded-br-3xl rounded-bl-3xl mb-2 items-center justify-between">
      <div className="flex gap-2 items-center min-w-0">
        <Icon className="h-10 w-10 rounded-full shrink-0" />
        <div className="flex items-center text-2xl font-500 text-white truncate">
          {personName}
        </div>
      </div>
      <button
        onClick={onVideoCall}
        title="Start video call"
        className="shrink-0 bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM16.5 8.25v7.5l4.5-2.25v-3l-4.5-2.25Z" />
        </svg>
        Video
      </button>
    </div>
  );
}