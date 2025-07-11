import Icon from '../assets/plus.svg?react'

export function SearchBox({ onClick, reference }) {
  return (
    <div className='w-full'>
      <div className='flex gap-2 items-center w-full'>
        <input
          ref={reference}
          placeholder='Explore'
          type='text'
          className='outline-none px-3 py-1 text-lg my-2 rounded-3xl flex-grow bg-white'
          onKeyUp={(e) =>{
            if(e.key == "Enter"){
                onClick()
            }
        }}
        />
        <div
          onClick={onClick}
          className='p-1 text-white cursor-pointer rounded-lg transition'
        >
          <Icon className='h-8 w-8' />
        </div>
      </div>
    </div>
  )
}
