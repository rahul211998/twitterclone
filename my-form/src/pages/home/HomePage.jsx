import { useState } from "react";
import CreatePost from "./CreatePost";
import ShowImages from "./ShowImages";

const HomePage = () => {
	const [allPostsList, setAllPostsList] = useState([]);
	
	return (
		<>
	<main className="ml-64 w-[calc(100%-16rem)] min-w-0 ">
	  <CreatePost setAllPostsList = {setAllPostsList}/>
    <div className="mx-auto w-full max-w-2xl px-4">
      <ShowImages allPostsList = {allPostsList} setAllPostsList = {setAllPostsList}/>
    </div>
  </main>
		</>
	);
};
export default HomePage;