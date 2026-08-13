// Task 3: two failure modes that behave differently.
//
// A) A bad domain -> fetch itself REJECTS (DNS/network failure) -> catch block runs.
// B) A real domain returning 404 -> fetch RESOLVES normally (it got a valid HTTP
//    response, it's just an error status). fetch does NOT throw on 4xx/5xx, so you
//    must check res.ok (or res.status) yourself, or you'll silently treat a 404
//    page as good data.

async function fetchBadDomain() {
  try {
    const res = await fetch('https://this-domain-does-not-exist-xyz123.abc/data');
    console.log('Unexpectedly got a response:', res.status);
  } catch (err) {
    console.log('[catch block ran] Network/DNS error:', err.message);
  }
}

async function fetch404() {
  // jsonplaceholder returns a real 404 for a non-existent resource
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/999999');

  console.log('No exception thrown. status:', res.status, ' ok:', res.ok);

  if (!res.ok) {
    // The request "succeeded" as a network operation, but it's not the data we want.
    // Without checking res.ok, this would be mistaken for a successful fetch.
    console.log('res.ok is false -> treating this as an error explicitly.');
    const body = await res.json().catch(() => null);
    console.log('Response body (still parseable, but not useful):', body);
  }
}

(async () => {
  await fetchBadDomain();
  await fetch404();
})();

module.exports = { fetchBadDomain, fetch404 };
