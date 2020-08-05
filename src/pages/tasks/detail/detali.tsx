import React,{ useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Api from '../../../api/api';
import Badge from 'react-bootstrap/esm/Badge';
import moment from 'moment';



interface iTasks{
  id: number
  title: string
  description: string
  finished: boolean
  created_at: Date
  updated_at: Date
}
  


const Detail: React.FC = () => {
  const history = useHistory()
  const {id} = useParams()
  const [task,setTask] = useState<iTasks>() 
  const back = () => {history.goBack()}


  function formatDate(date: Date){
    return moment(date).format('DD/MM/YYYY')
  }

  //useEffect 1° param Código que a ser execultado
  useEffect(()=>{
    findTask()
  },[id])

  const  findTask = async ()=>{
    const response = await Api.get<iTasks>(`/tasks/${id}`)
    console.log(response)
    setTask(response.data)
  }

  return(
      <div className='container'>
        <head className='task-header'>
          <h1>Task delail</h1>
          <Button 
            variant="dark"
            onClick={back}
            size='sm'>
              Voltar
          </Button>
        </head>
        <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{task?.title}</Card.Title>
            <Card.Text>
              {task?.description}
              <br/>
              <Badge 
              variant={task?.finished?"success":"warning"}>
                  {task?.finished?"Finalizada":"Pendênte"}
              </Badge>
              <div>
               <strong>Data de cadasto:</strong> <Badge variant="primary">{(task?.created_at)}</Badge>
              </div>
              <div>
               <strong>Data de atualização:</strong> <Badge variant="primary">{(task?.updated_at)}</Badge>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        </div>

      </div>
  );
}

export default Detail;