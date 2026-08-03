import { useContext, useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";
import { useLocation } from "react-router-dom";
import { useEffect, createContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ShowImages from "./ShowImages";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");
	const [imageFromServer, setImageFromServer] = useState("")
	// const location = useLocation();

	// const { loginResponse } = location.state || {};

	// const {setAuthUser } = useContext(AuthContext)


	// useEffect(() => {
	// 	console.log("home page first")
	// 	console.log("loginResponse",loginResponse)

	// 	setAuthUser(loginResponse.userdata)
	// },[loginResponse, setAuthUser])

		useEffect(() => {
			
	},[])
	

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>

				{/* <CreatePost/> */}
				{/* Header */}
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
                    
				</div>
                

				{/*  CREATE POST INPUT */}
				<CreatePost/>

				{/* POSTS */}
				{/* <Posts feedType={feedType} /> */}
				<ShowImages/>
			</div>
		</>
	);
};
export default HomePage;