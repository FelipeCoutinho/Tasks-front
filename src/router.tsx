import React from 'react'
import {Switch,Route} from  'react-router-dom'
import Home from './pages/home/home'
import Tasks from './pages/tasks/tasks'
import cadTasks from './pages/cadTasks/cadTasks'
import Detail from './pages/tasks/detail/detali'



function Routes(){
    return(
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/t' exact component={Tasks}/>
            <Route path='/cadTasks' exact component={cadTasks}/>
            <Route path='/cadTasks/:id' exact component={cadTasks}/>
            <Route path='/detail/:id' component={Detail}/>
            
        </Switch>
    )
}

export default Routes