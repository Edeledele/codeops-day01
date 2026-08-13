// Task 2: rewrite a three-step .then chain (fetch -> json -> render) as async/await.
// API: https://jsonplaceholder.typicode.com/posts/1  (free, no key required)

/*
Original .then chain, for reference:

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((res) => res.json())
  .then((data) => render(data))
  .catch((err) => console.error('Failed:', err.message));
*/

function render(post) {
  console.log(`Rendering post #${post.id}: "${post.title}"`);
}

async function loadAndRenderPost(id = 1) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    render(data);
    return data;
  } catch (err) {
    console.error('loadAndRenderPost failed:', err.message);
  }
}

loadAndRenderPost(1);

module.exports = { loadAndRenderPost, render };
