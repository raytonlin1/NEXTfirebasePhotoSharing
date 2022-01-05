
function Story({img, username}) {
    return (
        <div>
            <img className='object-contain cursor-pointer h-14 w-14 
            rounded-full p-[1.5px] border-red-500 border-2 hover:scale-110 transition transform duration-200' 
            src={img} alt="profile img"/>
            <p className="text-xs w-14 truncate text-center">{username}</p>
            

        </div>
    )
}

export default Story
