export default function Page() {
  return (
    <div>
      <h1>Really Long URL that is Hard to Remember</h1>
      <p>
        The URL for this page is really long and hard to remember. The
        middleware.tsx rewrites a shorter URL to this page. Try going to both
        /week-13/really-long-url-that-is-hard-to-remember and /week-13/short-url
        to see how it works.
      </p>
    </div>
  );
}
