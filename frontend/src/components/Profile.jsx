import Icon from '../assets/unknown.svg?react';
 
export function Profile({
  personName
}){
  return (
    <>
      <div className="bg-slate-500 p-2 flex gap-2 rounded-br-3xl rounded-bl-3xl mb-2">
        <div>
          <Icon className='h-10  w-10  rounded-full'/>          
        </div>
        <div className='flex items-center text-2xl font-500 text-white'>
          {personName}
        </div>
      </div>
    </>
  )

}