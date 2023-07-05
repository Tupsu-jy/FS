import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);

  // Define the value for the context once to avoid re-creation on every render
  const contextValue = useMemo(() => ({ blogs, setBlogs }), [blogs, setBlogs]);

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
}

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
