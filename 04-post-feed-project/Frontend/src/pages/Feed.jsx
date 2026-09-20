import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Feed = () => {

    const [posts, setposts] = useState([
        {
            _id:"1",
            image:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption:"Beutifull girl"
        }
    ])

    useEffect(() => {
        axios.get("http://localhost:3000/posts")    //we hit get api and set all the db data in posts arr of obj which is in useState

        .then((res) => {
            setposts(res.data.posts)
        })
        .catch((err) => {
            console.log(err);
            alert("Error")
        })
    }, [])

  return (
    <section className='feed-section'>

        {
            posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className='post-card'>
                        <img src={post.image} alt={post.caption} />
                        <h3>{post.caption}</h3>
                    </div>
                ))
            ) : (
                <h1>No Post Available</h1>
            )
        }



    </section>
  )
}

export default Feed
