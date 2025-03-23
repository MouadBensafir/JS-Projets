export function useGetPosts() {
  return fetch("http://localhost:3000/blogs")
    .then(response => response.json())
    .catch(err => this.error = err.message);
}
