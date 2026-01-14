## Notes for Reviewer

Hey, thanks for taking the time to review this code.

There were a few issues I ran into while building this, so the code ended up a bit messy and I fully acknowledge that.

Initially, I tried handling `setInterval` using `useRef`, but I made a small mistake by assigning the interval directly to the ref instead of `ref.current`. Because of that, I ran into issues with `clearInterval`. To move forward, I removed `useRef` and assigned `setInterval` to a normal variable instead.

That one mistake led me down a bit of a workaround path using `localStorage` and page reloads.

That said, the main functionality works as expected overall, though there are still a few minor bugs that could be cleaned up.
