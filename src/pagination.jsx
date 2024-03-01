
const maxitem = 9;
const maxleft = (maxitem - 1)/2;

const Pagination = ({limit, total, offset, setOffset}) =>{
    const currentpage = offset? offset/limit + 1 :1;
    const pages = Math.ceil(total/limit);
    const maxfirst = Math.max(pages - (maxitem - 1), 1);
    const first = Math.min(
        Math.max(currentpage - maxleft, 1), maxfirst
    );

    function OnpageChange(pages){
        setOffset((pages - 1) * limit)
    }

return(
    <ul className="pagination">
        <li>
          <button onClick={() => OnpageChange(currentpage-10)} disabled={currentpage === 1}>&lt;&lt;</button>
        </li>
        {Array.from({length: Math.min(maxitem, pages)}).map((_, index)=> index + first)
        .map((page)=>(
            <li key={page}><button className={ page === currentpage? 'pagination__item--active': null}
            onClick={()=> setOffset((page-1) * limit)}>
            {page}</button></li>
        ))}
        <li>
          <button onClick={() => OnpageChange(currentpage+10)} disabled={currentpage === pages}>&gt;&gt;</button>
        </li>
    </ul>
)
}

export default Pagination;
