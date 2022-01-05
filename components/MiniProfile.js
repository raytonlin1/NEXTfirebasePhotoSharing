import { useSession, signOut } from "next-auth/react"
function MiniProfile() {
    const {data: session} = useSession();
    return (
        <div className="flex items-center pl-4 mt-14">
            <img className='h-10 w-10 border border-gray rounded-full cursor-pointer object-contain'
            src={session?.user?.img} />
            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>{session?.user?.username}</h2>
                <h3 className='text-sm text-gray-400'> Welcome to Instagram </h3>
            </div>

            <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
        </div>
    )
}

export default MiniProfile
