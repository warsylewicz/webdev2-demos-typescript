export default async function Page(): Promise<JSX.Element> {
  // fetch data from the API
  const response: Response = await fetch("http://localhost:3000/week11-1/api");
  const data: string = await response.text();
  console.log(response);

  return (
    <main>
      <h1>Week 11 Part 1</h1>
      <p>{data}</p>
    </main>
  );
}
