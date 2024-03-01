import { useEffect } from "react";
import { useState } from "react"
import debounce from "lodash.debounce";
import qs from "qs";
import Pagination from "./pagination";

function App() {
  const [info, setinfo] = useState({});
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const updateChange = e => setSearch(e?.target?.value);
  const debounceOnchange = debounce(updateChange, 300);

  const Limit = 14;

  useEffect(()=>{
    setinfo({})

    const query = {
      page:{
        limit: Limit,
        offset: offset
      }
    };
  
    if (search) {
      query.filter = {
      text: search
      };
    }

    const getdata = async()=>{
      const res = await fetch(`https://kitsu.io/api/edge/anime?${qs.stringify(query)}`);
      const data = await res.json();
      setinfo(data)
    }

    getdata();    

  },[search, offset])

  return(
    <>
    <div className="app">
      <div className="header">
        <h2>Anime data</h2>
        <input type="text" onChange={debounceOnchange}/>
      </div>
      {info.data && (
        <ul className="list">
          {info.data.map((item)=>(
            <li key={item.id}>
              <img src={item.attributes.posterImage.small} alt={item.attributes.canonicalTitle}/>
              {item.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
          <Pagination limit={Limit} total={info.meta.count} offset={offset} setOffset={setOffset}/>
      )}
    </div>
    </>
  )
}

export default App;
