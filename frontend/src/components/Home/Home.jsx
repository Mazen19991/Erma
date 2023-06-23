import PostsContainer from "./PostsContainer";
import Sidebar from "./Sidebar/Sidebar";
import MetaData from "../Layouts/MetaData";

const Home = () => {
  return (
    <>
      <MetaData title="ERMA" />

      <div
        style={{
          paddingTop: 10,
          paddingX: 35,
          paddingBottom: 5,
          // backgroundColor: "#1B192E",
          // backgroundColor: "#DD1367",
          // backgroundImage: `radial-gradient(#ffffff, #c3cdd7)`,
          backgroundImage: 'white',
          //opacity: "1",
          //backgroundSize: "100% 100%",
          //animation: "gradient 10s ease infinite",
        }}
        className="flex h-full mt-14 mx-auto" //md:w-4/5 lg:w-5/6
      >
        <PostsContainer />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
