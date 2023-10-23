import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

// Page is zero indexed totalPages is not
export const MyPagination = ({page, setPage, totalPages})=> {
    // Group every 5 pages and grab the current group
    const size = 5
    const count = Math.floor(page/size)
    const start = count * size + 1
    const [items, setItems] = useState([])
    const [showLastPage, setShowLastPage] = useState(true)
    const onLastPage = page + 1 === totalPages
    const onFirstPage = page === 0
    
    const incrementPage = ()=> {
        setPage(prevPage=>prevPage + 1)
    }

    const decrementPage = ()=> {
        setPage(prevPage=>prevPage - 1)
    }

    const changePage = (item)=> {
        return ()=> setPage(item - 1)
    }

    useEffect(()=>{
        const new_items = []
        let lastPageInItems = false
        for(let i=start; (i<=totalPages) && (i<start + size); i++){
            new_items.push(i)
            if(i === totalPages) lastPageInItems = true
        }
        
        setItems(new_items)
        setShowLastPage(!lastPageInItems)
        
    }, [page, totalPages])

    return (
        <Pagination>
            {onFirstPage || <Pagination.Prev onClick={decrementPage}/>}
            {items.map(item=>
                item === page + 1? 
                    <Pagination.Item key={item} active onClick={changePage(item)}>{item}</Pagination.Item>
                    :
                    <Pagination.Item key={item} onClick={changePage(item)}>{item}</Pagination.Item>
            )}
            {showLastPage &&
                <>
                    <Pagination.Ellipsis/>
                    <Pagination.Item onClick={changePage(totalPages)}>{totalPages}</Pagination.Item>
                </>
            }
            {onLastPage || <Pagination.Next onClick={incrementPage}/>}
        </Pagination>
    )
}