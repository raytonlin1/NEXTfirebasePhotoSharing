import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'

const posts = [
    {
        id: '123',
        username: 'user',
        userImg: 'https://links.papareact.com/ocw',
        img: 'https://links.papareact.com/ocw',
        caption: 'caption'
    }, 
    {
        id: '123',
        username: 'user',
        userImg: 'https://links.papareact.com/ocw',
        img: 'https://links.papareact.com/ocw',
        caption: 'caption'
    }
]
    

function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        //Sets posts to the posts in the firebase db
        const unsubscribe = onSnapshot(query(collection(db, `posts`), orderBy('timestamp', 'desc')), snapshot => {
            setPosts(snapshot.docs)
        })
        return () => {
            unsubscribe();
        }
    }, [db])
    return (
        <div className="p-6 items-center ">
            {posts.map(post => (
                <Post key={post.id}
                id={post.id}
                username={post.data().username}
                userImg={post.data().profileImage}
                img={post.data().img}
                caption={post.data().caption}
                />
            ))}
        </div>
    )
}

export default Posts
