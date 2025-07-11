import Icon from '../assets/unknown.svg?react';
 
export function ChatBubbleTo({ 
	user,
	message,
	now
 }) {
    return (
        <div className="flex justify-start">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0"> {/* Add this wrapper */}
                    <Icon className="h-9 w-9 rounded-full" />
                </div>
                <div className="flex flex-col gap-1 w-full max-w-[600px]">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{user}</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{now}</span>
                    </div>
                    <div className="flex flex-col leading-1.5 p-2 rounded-e-xl rounded-es-xl bg-gray-500 w-fit max-w-[450px]">
                        <p className="text-md font-normal text-black break-words">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
