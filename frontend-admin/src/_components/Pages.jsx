import Pagination from 'react-bootstrap/Pagination';


export default function Pages(props) {
    let pages = []
    let total = 11
    let initial = (props.current - Math.ceil(total/2))
    if (initial <=   0)
      initial = 1

    for(let i=initial; i<=initial+total; i++) {
        if (i === props.current) {
            pages.push(<Pagination.Item onClick={e => props.setCurrentPage(i)} key={i} active>{i}</Pagination.Item>)
        } else {
            pages.push(<Pagination.Item onClick={e => props.setCurrentPage(i)} key={i}>{i}</Pagination.Item>)
        }
    }

    return (
    <Pagination>
      <Pagination.First onClick={e => props.setCurrentPage(1)}/>
      <Pagination.Prev onClick={e => props.setCurrentPage(props.current === 1 ? 1 : props.current-1)}/>
        {pages}
      <Pagination.Next onClick={e => props.setCurrentPage(props.current === props.total ? props.total : props.current+1)}/>
      <Pagination.Last onClick={e => props.setCurrentPage(props.total)}/>
    </Pagination>
  );
}
