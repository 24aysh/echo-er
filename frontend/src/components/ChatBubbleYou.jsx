import Icon from '../assets/unknown.svg?react';
 
export function ChatBubbleYou({ user, message, now }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-2.5">
        <div className="flex flex-col gap-1 max-w-[500px] items-end">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">{now}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{user}</span>
          </div>
          
          <div className="flex flex-col leading-1.5 p-2 rounded-s-xl rounded-ee-xl bg-blue-600 max-w-[450px] w-fit ml-auto">
            <p className="text-md font-normal text-white break-words">{message}</p>
          </div>
        </div>

        <Icon className="h-9 w-9 rounded-full flex-shrink-0" />
      </div>
    </div>

  );
}
