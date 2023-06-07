import React, { useState } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Pagination from "./Pagination";
import OtherResourcesItem from "./OtherResourcesItem";
import OtherResourcesForm from "./OtherResourcesForm";
import Footer from "./Footer";

function OtherResourcesPage({ linksArray, setLinksArray }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = linksArray.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div>
      <NavBar />
      <Banner
        pageTitle="Other Resources"
        subTitle="Find Some Tips and Tricks"
        background="https://a.cdn-hotels.com/gdcs/production81/d60/e414d9a4-df1b-4e19-976f-b83e8a1b2c8d.jpg?impolicy=fcrop&w=1600&h=1066&q=medium"
      />
      <div className="container m-auto px-2 pt-20 pb-20">
        <div className="grid grid-cols-1 px-8 sm:grid-cols-2 gap-8 lg:grid-cols-3 gap-10 pb-5 ">
          {currentPosts.map((link) => (
            <OtherResourcesItem
              link={link}
              key={link.id}
              id={link.id}
              name={link.name}
              description={link.description}
              image={link.image}
              likes={link.likes}
              setLinksArray={setLinksArray}
              linksArray={linksArray}
            />
          ))}
        </div>
        <Pagination
          paginate={paginate}
          array={linksArray}
          postsPerPage={postsPerPage}
        />
      </div>

      <OtherResourcesForm
        paginate={paginate}
        array={linksArray}
        postsPerPage={postsPerPage}
      />
      <Footer />
    </div>
  );
}

export default OtherResourcesPage;
