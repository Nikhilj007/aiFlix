import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useLocation } from "react-router-dom";

function Play() {
    const [videoUrl, setVideoUrl] = useState(null); // [1
    const location = useLocation();
    console.log(location);
    useEffect(()=>{
        async function getVideo() {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/trailers/${location.state}`);
                if (response.ok) {
                  const blob = await response.blob();
                  const videoBlobUrl = URL.createObjectURL(blob);
                  setVideoUrl(videoBlobUrl);
                } else {
                  console.error('Failed to fetch video:', response.status);
                }
              } catch (error) {
                console.error('Error fetching video:', error);
              }            
        }
        getVideo()
    },[])
  return (
    <>
    <div className="flex fixed top-0 w-full bg-gray-700 px-5 py-3 justify-around items-center">
      <Link to='/' className="text-3xl">AIflix</Link>
      <Link to='/'>
      <button >Go to Feeds</button>
      </Link>
    </div>
    <div className="w-full mt-14 flex justify-center items-center h-[100vh]">
      <div className="w-[60%] max-sm:w-full max-sm:h-[50%] h-[60%] rounded-lg overflow-hidden">
        <ReactPlayer
          className="rounded-lg"
          url={videoUrl}
          controls={true}
          width="100%"
          height="100%"
          onError={(err) => {console.log(err)}}
        />
      </div>
    </div>
    </>
  );
}

export default Play;
