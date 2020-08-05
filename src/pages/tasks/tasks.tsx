import React, {useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Api from '../../api/api'
import moment from 'moment';
import './tasks.css'



interface iTasks{
  id: number
  title: string
  description: string
  finished: boolean
  created_at: Date
  updated_at: Date
}


const Tasks: React.FC = () => {

  //povoa a variavel tasks com os dados da api
  const [tasks, setTasks] = useState<iTasks[]>([])
  const history = useHistory()

  //capitura os dados ao inicar a pagina 
  useEffect(()=>{
    loadTask()
  },[])

  async function loadTask(){
    const response =await Api.get('/tasks')
    setTasks(response.data)
    console.log(response)
  }

  function formatDate(date: Date){
    return moment(date).format('DD/MM/YYYY')
    
  }

  function newTasks(){
    history.push('/cadTasks')
  }

  //Editar 
  const editar = (id: number)=>{
   history.push(`/cadTasks/${id}`)
  }
  //Editar 
  const visualizar = (id: number)=>{
   history.push(`/detail/${id}`)
  }

  //finished

  const finalizar =async (id: number)=>{
    const response = Api.patch(`/save/${id}`)
    loadTask()
  }


  async function Remove(id: number){
    if(id!==undefined){
      console.log(id)
        const response =await Api.delete(`/del/${id}`)
    }
    loadTask()
  }



  return(
    <div className='container'>

      <div className='task-header'>
        <h1>Tasks Page</h1>
        <div id='btn-header'>
          <Button id='teste' variant='dark' size='sm' onClick={newTasks} >Nova tarefa</Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Data de atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(tasks=>(
              <tr key={tasks.id} >
                <td>{tasks.id}</td>
                <td>{tasks.title}</td>
                <td>{formatDate(tasks.updated_at)}</td>
                <td>
                  {
                    <td><Badge 
                        variant={tasks.finished?"success":"warning"}>{
                        tasks.finished?"Finalizada":"Pendênte"
                      }</Badge> 
                      
                    </td>
                  }
                </td>
                <td>
                  {<Button size='sm' disabled={tasks.finished} onClick={()=>{editar(tasks.id)}}>Editar </Button>}{' '}
                  {<Button size='sm' disabled={tasks.finished} variant='success' onClick={()=>{finalizar(tasks.id)}}>Finalizar</Button>}{' '}
                  {<Button size='sm' variant='info' key={tasks.id} onClick={()=>{visualizar(tasks.id)}}>Visualizar</Button>}{' '}
                  {<Button 
                    size='sm' 
                    variant='danger' 
                    onClick={()=>{Remove(tasks.id)}} >
                      Remover
                  </Button>}{' '}
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Tasks;