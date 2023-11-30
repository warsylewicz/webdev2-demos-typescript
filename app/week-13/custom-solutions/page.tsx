export default function Page() {
  return (
    <div>
      <h1>Custom Solutions</h1>
      <p>
        This page used to be called "Sales", but your boss decided to change the
        name to "Custom Solutions" because it sounds more professional. However,
        because of this change, the URL changed as well. You need to make sure
        that the old URL (/sales) still works and redirects to the new otherwise
        you will lose a lot of customers. Notice how `middleware.tsx` is used to
        redirect the user to the new URL.
      </p>
    </div>
  );
}
