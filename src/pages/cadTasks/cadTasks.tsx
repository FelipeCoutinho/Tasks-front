import React, {useState, ChangeEvent, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Api from '../../api/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './index.css'


interface iTasks{
  title: string
  description: string
}


const Tasks: React.FC = () => {

  const {id} =  useParams() // pega toso os parametros 
  //povoa a variavel tasks com os dados da apida URL 
  const [model, setModels] = useState<iTasks>({
      title:'',
      description:''
  })
  // navegação
  const history =  useHistory();



  function updateModel(e: ChangeEvent<HTMLInputElement>): void{
    setModels({
        ...model,
        [e.target.name]:e.target.value
    })
  }


  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault()
    //console.log(model) verifica se os dados estão sendo passados 
    if(id===undefined){
        const response = await Api.post('/cad', model)
        console.log(response)
    }else{
        const response = Api.put(`update/${id}`,model)
        console.log(response)
    }
    back()
  }


  const back =  ()=>{
      history.goBack()
  }

  useEffect(()=>{
      if(id!==undefined){
        findTask(id)
      }
    //findTask(id)
    console.log(id)
  },[id])

  //pega os dados e povoa os campos 
  async function findTask(id: number){
      
     const response = await Api.get(`tasks/${id}`)
      console.log(response)
      
      setModels({
          title: response.data.title,
          description: response.data.description
      })
    }


  return(
    <div className='container'>

        <header>
            <h3>New Tasks</h3>
            
                <Button variant='dark' onClick={back}>Voltar</Button>
        </header>

        <Form id="" onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail" >
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    name="title" 
                    onChange={(e: ChangeEvent<HTMLInputElement>)=>updateModel(e)}
                    type="text" 
                    value={model.title}
                    placeholder="Titulo da tarefa" 
                    />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Descrição</Form.Label>
                <Form.Control 
                    as ="textarea" rows={3}
                    name="description" 
                    value={model.description}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>updateModel(e)}
                    />
            </Form.Group>

            <Button 
                variant="dark" 
                type="submit">
                    Save
            </Button>

        </Form>
    </div>
)
}

export default Tasks;