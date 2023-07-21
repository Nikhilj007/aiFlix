import { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

function Posts() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        async function getPosts() {
            const res = await fetch(`${import.meta.env.VITE_SERVER}/trailers`)
            const data = await res.json()
            setPosts(data)
        }
        getPosts();
    }, [])

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <h1 className="text-center ">Your Feeds</h1>
      </div>
      <div className="flex flex-wrap justify-around pb-72 p-10">
        {
            posts.map((post) => {
                return <Card key={post._id} {...post} />
            })
        }
      </div>
    </>
  );
}

export default Posts;
