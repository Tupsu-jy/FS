const totalLikes = (blogs) => {
  const total = blogs.reduce(
    (acc, cur) => acc + cur.likes,
    0,
  );
  return total;
};

const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce(
    (top, cur) => {
      if (top.likes < cur.likes) {
        return cur;
      }
      return top;
    },
    blogs[0],
  );
  return favourite;
};

const mostBlogs = (blogs) => {
  const numberOfBlogs = new Map();
  blogs.forEach((element) => {
    if (numberOfBlogs.has(element.author)) {
      numberOfBlogs.set(
        element.author,
        numberOfBlogs.get(element.author) + 1,
      );
    } else {
      numberOfBlogs.set(element.author, 1);
    }
  });
  return [...numberOfBlogs.entries()]
    .reduce((a, e) => (e[1] > a[1] ? e : a));
};

const mostLikes = (blogs) => {
  const numberOfLikes = new Map();
  blogs.forEach((element) => {
    if (numberOfLikes.has(element.author)) {
      numberOfLikes.set(
        element.author,
        numberOfLikes.get(element.author) + element.likes,
      );
    } else {
      numberOfLikes.set(element.author, element.likes);
    }
  });
  return [...numberOfLikes.entries()]
    .reduce((a, e) => (e[1] > a[1] ? e : a));
};

module.exports = {
  totalLikes, favouriteBlog, mostBlogs, mostLikes,
};
