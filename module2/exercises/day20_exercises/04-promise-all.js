// Task 4: fetch a list, then fetch details for the first two items in parallel with Promise.all.
// API: https://jsonplaceholder.typicode.com/users

async function fetchFirstTwoUserDetails() {
  const listRes = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!listRes.ok) {
    throw new Error(`List fetch failed: ${listRes.status}`);
  }
  const users = await listRes.json();
  const firstTwo = users.slice(0, 2);

  // Fire both detail requests together, wait for both.
  const details = await Promise.all(
    firstTwo.map(async (user) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`);
      if (!res.ok) {
        throw new Error(`Detail fetch failed for user ${user.id}: ${res.status}`);
      }
      return res.json();
    })
  );

  return details;
}

fetchFirstTwoUserDetails()
  .then((details) => {
    details.forEach((u) => console.log(`${u.name} — ${u.company.name} (${u.email})`));
  })
  .catch((err) => console.error('Failed:', err.message));

module.exports = { fetchFirstTwoUserDetails };
