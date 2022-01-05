import {
    DotsHorizontalIcon,
    HeartIcon as HeartIconFilled
} from '@heroicons/react/solid'
import {
    HeartIcon as HeartIconOutline,
    ChatIcon,
    PaperAirplaneIcon,
    BookmarkIcon,
    EmojiHappyIcon
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useState, useEffect, Moment } from 'react';
import { comment } from 'postcss';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';


function Post({id, username, userImg, img, caption}) {
    const {data: session} = useSession();
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        //Sets posts to the posts in the firebase db
        onSnapshot(query(collection(db, 'posts', id,  'comments'), orderBy('timestamp', 'asc')), snapshot => {
            setComments(snapshot.docs)
        })
        
    }, [db, id])

    useEffect(() => {
        //Sets posts to the posts in the firebase db
        onSnapshot(query(collection(db, 'posts', id,  'likes'), orderBy('timestamp', 'asc')), snapshot => {
            setLikes(snapshot.docs)
        })
        
    }, [db, id])

    const sendComment = async (e) => {
        e.preventDefault()

        const commentToSend = comment;
        setComment('')
        await addDoc(collection(db,'posts',id,'comments'), {
            comment: commentToSend,
            username: session?.user?.username,
            userImage: session?.user?.image,
            timestamp: serverTimestamp(),
        })


    }

    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
            <div className="flex items-center p-5">
                <img src={userImg} 
                className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
                alt=''/>
                <p className="flex-1 font-bold "> {username}</p>
                <DotsHorizontalIcon className="h-5"/>
            </div>
            {/* img */}
            <img src={img} alt="" className="object-cover-w-full"/>
            {/* Buttons */}
            {session && <div className="flex justify-between px-4 pt-4">
                <div className='flex space-x-4'>
                    <HeartIconOutline className="btn" />
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn" />
                </div>
                <BookmarkIcon className="btn" />
            </div>}
            
            
            {/* caption */}
            <div>
                <p className='p-5 truncate'>
                    <span className="font-bold mr-1">{username} </span> 
                    {caption}
                </p>
            </div>
            {/* comments */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    
                    {
                        comments.map((comment)=>{
                            <div key={comment.id} 
                            className='flex items-center-space-x-2 mb-3'>
                                <img src={comment.data().userImage} alt=""
                                className='h-7 rounded-full'/>
                                <p className='text-sm flex-1'>
                                    <span className='font-bold'>
                                        {comment.data().username}
                                    </span> {" "}
                                    <p>{comment.data().comment}</p>
                                </p>
                                <Moment
                                fromNow 
                                className='pr-5 text-xs'>
                                    {comment.data().timestamp?.toDate()}
                                </Moment>
                            </div>
                        })
                    }
                    </div>
            ) }
            {/* input box */}
            {session && <div>
                <form className="flex items-center p-4">
                    <EmojiHappyIcon className="h-7"/>
                    <input type="text" 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="border-none flex-1 focus:ring-0"/>
                    <button 
                    disabled={!comment.trim()}
                    type='submit'
                    onClick={sendComment}
                    className='font-semibold text-blue-400'>Post</button>
                </form>
            </div>}
            
        </div>
    )
}

export default Post
