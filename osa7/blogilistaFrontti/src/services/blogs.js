import { useMutation, useQuery } from "react-query";
import axios from "axios";

const baseUrl = "/api/blogs";

// Get all blogs
export const useAllBlogs = () =>
  useQuery("blogs", async () => {
    const { data } = await axios.get(baseUrl);
    console.log(data);
    return data;
  });

// Post a new blog
export const usePostNewBlog = (handleNewBlog, setNotification) =>
  useMutation(
    (newBlog) =>
      axios.post(baseUrl, newBlog, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
    {
      onSuccess: (data) => {
        const { title, author } = data.data;
        setNotification({
          text: `Blog ${title} by ${author} added`,
          success: true,
        });
        handleNewBlog();
      },
      onError: (error) => {
        const { title, author } = error.data;
        setNotification({
          text: `Error adding blog ${title} by ${author}`,
          success: false,
        });
      },
    }
  );

export const useCustomUpdateBlog = (queryClient, showNotification) => {
  const updateBlogMutation = useMutation(
    async (blog) => {
      const response = await axios.put(
        `${baseUrl}/${blog.id}`,
        {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          likes: blog.likes + 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response;
    },
    {
      onSuccess: () => {
        showNotification(`Blog successfully updated`, true);
        queryClient.invalidateQueries("blogs");
      },
      onError: () => {
        showNotification(`Error updating blog`, false);
      },
    }
  );

  return updateBlogMutation;
};

export const useCustomDeleteBlog = (queryClient, showNotification) => {
  const deleteBlogMutation = useMutation(
    async (id) => {
      const response = await axios.delete(`${baseUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response;
    },
    {
      onSuccess: () => {
        showNotification(`Blog successfully deleted`, true);
        queryClient.invalidateQueries("blogs");
      },
      onError: () => {
        showNotification(`Error deleting blog`, false);
      },
    }
  );

  return deleteBlogMutation;
};
