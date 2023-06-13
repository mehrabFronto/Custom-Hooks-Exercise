import { useFetch } from "./hooks/useFetch";

const App = () => {
   const { loading, error, data } = useFetch(
      "https://jsonplaceholder.typicode.com/users",
   );

   return (
      <div>
         {loading && <p>loading...</p>}
         {error && <p> {error}</p>}
         {data && (
            <div>
               {data.map((d) => (
                  <li>{d.name}</li>
               ))}
            </div>
         )}
      </div>
   );
};

export default App;
