# Mini-Project · Live Data in Addis Eats

**Requirements**
- A shared fetcher used by every query, with errors thrown for non-OK responses.
- An order-status route rendered on the server and polled every five seconds.
- fallbackData supplied so no spinner appears on the first paint.
- A debounced search box using a null key for an empty term, with keepPreviousData enabled so the list never flashes empty.
- Paging with the page number in the query string, linkable and shareable.
- DATA.md listing every query, its key, its refresh rule and one line of reasoning.

**Check yourself**
- Does typing five characters fire one request or five?
- Does the order page show data immediately, with no spinner?
- Do two components asking for the same key produce one network call?
- Does the list keep previous results visible while the next load runs?
- Can you justify every refreshInterval and staleTime in one sentence?

---

# Mini-Project · Securing Addis Eats

**Requirements**
- A session cookie with httpOnly, secure and sameSite set, and a getSession helper.
- Middleware with a narrow matcher, redirecting signed-out visitors and remembering the destination.
- The next parameter validated so an absolute URL cannot be used.
- Every private page verifying the session while rendering, not only in middleware.
- Queries scoped to the session id rather than an id from the request.
- Session and ownership both checked inside every action that writes.
- AUTH.md listing each protected route, its layers, and what each layer proves.

---

# Mini-Project · Making Addis Eats Fast

**Requirements**
- A Lighthouse run on a production build recorded before any change.
- Every image using next/image with width, height, sizes and meaningful alt text.
- priority on exactly one image, remote hosts listed, and next/font replacing any link tag.
- Third-party scripts on an appropriate next/script strategy.
- .env.example committed, .env*.local gitignored, no secret prefixed NEXT_PUBLIC.
- PERF.md with before and after numbers and what caused each change.

**Check yourself**
- Did LCP improve, and can you name the single change that did most of it?
- Does the page still jump as it loads? If so, what is not reserving space?
- Are you measuring npm run start, throttled — not npm run dev?
- Can a stranger clone your repository and know which variables to set?
- Is there anything in the browser bundle you would not want published?

---

# Mini-Project · Making Addis Eats Findable

**Requirements**
- metadataBase set to the production URL, and a title template in the root layout.
- A distinct, human-readable description on every route.
- generateMetadata on the dish route, derived from the dish record.
- A site-wide opengraph-image plus a generated one per dish at 1200 x 630.
- MenuItem JSON-LD whose price and name match what the page displays.
- app/sitemap.js generated from real data, with private routes excluded and disallowed.
- A canonical URL on any route that accepts query parameters.

**Check yourself**
- Does the page source show absolute URLs in every og:image tag?
- Do two different dish pages have two different descriptions?
- Does your sitemap contain any route that requires signing in?
- Does the JSON-LD price match the price on the page, in ETB?
- Is there exactly one h1 on each page, and does it describe the page?
- Would a link to a dish look worth opening if you saw it in a group chat?

---

# Mini-Project · The Addis Eats Dashboard

**Requirements**
- Aggregation done on the server, with only summarised rows crossing the boundary.
- Charts as client leaves on a server page, each with a heading, unit and fixed height.
- Every chart accompanied by the same data in a table.
- A table built from table, caption, thead and th scope — not divs.
- Sorting and paging both in the URL, with paging using Link elements.
- Loading, empty and error states all written, and each one demonstrable.

**Check yourself**
- Does every bar chart axis start at zero?
- Can you read every chart with the colour removed?
- How many rows cross the network for the dashboard — three, or four thousand?
- Does the table survive being copied into a spreadsheet?
- Can you link someone directly to page three sorted by total?
- What does a brand-new customer see on the orders page?

---

# Mini-Project · Tracking a Delivery

**Requirements**
- The map loaded with ssr:false, stylesheet imported, explicit height, attribution kept.
- The same delivery information available as text beside the map.
- A stream route handler using "data: " and two newlines.
- An EventSource seeded from server data, closed on unmount, with a visible state.
- lib/format.js exporting etb, when and relative, each built once.
- CSV export that correctly quotes commas, quotes and newlines.

**Check yourself**
- Does the build succeed, and does the page avoid jumping when the map appears?
- Navigate away from the tracking page five times — how many connections are open?
- Is every price and time going through the shared format module?
- Does the CSV survive a value containing a comma and a quotation mark?
- Can someone who cannot see the map still find where their order is?
