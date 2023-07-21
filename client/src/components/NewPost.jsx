import { useState } from "react";
import { Link } from "react-router-dom";

function NewPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);


  const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("title",title)
        formData.append("description",description)
        formData.append("video",video)
        const res = await fetch(`${import.meta.env.VITE_SERVER}/upload`,{
            method:"POST",
            body:formData
        })
        console.log(res)
  }
    

  return (
    <>
    <div className="flex fixed top-0 w-full bg-gray-700 px-5 py-3 justify-around items-center">
      <Link to='/' className="text-3xl">AIflix</Link>
      <Link to='/'>
      <button >Go to Feeds</button>
      </Link>
    </div>
    <form className="flex mt-14 flex-col gap-10 sm:p-20 p-5 text-lg" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Title</label>
        <input
          className="focus:outline-none px-4 py-2 rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength={24}
          type="text"
          required={true}
          name="title"
          id="title"
          placeholder="Title"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="description">Description</label>
        <textarea
            className="focus:outline-none px-4 py-2 rounded-lg "
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          type="text"
          required={true}
          name="description"
          id="description"
          placeholder="Description"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="hover:cursor-pointer" htmlFor="video">Upload your video here</label>
        <input
          className="w-[90%] flex rounded-lg hover:cursor-pointer"
          onChange={(e) => setVideo(e.target.files[0])}
          type="file"
          required={true}
          name="video"
          id="video"
          placeholder="Video"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </>
  );
}

export default NewPost;
