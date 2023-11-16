export default async function Page() {
  // fetch data from the API
  const response = await fetch("http://localhost:3000/week11-1/api");
  const data = await response.text();
  console.log(response);

  return (
    <main>
      <h1>Week 11 Part 1</h1>
      <p>{data}</p>
    </main>
  );
}
