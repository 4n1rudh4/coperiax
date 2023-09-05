import Card from 'react-bootstrap/Card';

function GridExample(props) {
  return (<div className='flex p-2 justify-center'>
          <Card className='w-11/12 bg-green-100  border-4 border-green-200'>
            <Card.Img className="h-52 w-52 m-auto rounded-full p-2" variant="top" src={props.src} />
            <Card.Body>
              <Card.Title className='md:text-lg text-sm font-light'>{props.name}</Card.Title>
            </Card.Body>
          </Card></div>
  );
}

export default GridExample;