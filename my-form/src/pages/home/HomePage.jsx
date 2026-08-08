import { useContext, useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import { useLocation } from "react-router-dom";
import { useEffect, createContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ShowImages from "./ShowImages";

const HomePage = () => {
	// const [feedType, setFeedType] = useState("forYou");
	// const [imageFromServer, setImageFromServer] = useState("")
	const [allPostsList, setAllPostsList] = useState([]);

	// const {authUser } = useContext(AuthContext)
	

	return (
		<>
			{/* <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				<CreatePost/>
				<ShowImages/>
			</div> */}
			  <main className="ml-64 w-[calc(100%-16rem)] min-w-0 ">
				<CreatePost setAllPostsList = {setAllPostsList}/>
    <div className="mx-auto w-full max-w-2xl px-4">
      {/* <CreatePost /> */}
      <ShowImages allPostsList = {allPostsList} setAllPostsList = {setAllPostsList}/>
    </div>
  </main>
		</>
	);
};
export default HomePage;