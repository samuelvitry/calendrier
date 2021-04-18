import React, { useState, useRef } from 'react'
import uuid from 'react-uuid'
import {TodoListItem} from './TodoListItem'
import { TextField, Grid } from '@material-ui/core'
import { Button } from './Button'
import Typography from '@material-ui/core/Typography'


export const TodoList = () => {

    const [taskList, settaskList] = useState(["Terminer la base du front end", "Ameliorer le CSS", "Logique d'affichage", "Police de charactères", "Couleurs", "Responsive design", "Rendre les éléments fonctionels", "Annimations"]);
    const [input, setinput] = useState('')

    let textInput = useRef(null);

    let  [,setState]=useState();
    function handleUpdate() {
        //passing empty object will re-render the component
       setState({});
    }

    function getKeyByValue(object, value) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (object[prop] === value)
                return prop;
            }
        }
    }

    function saveInput(e) {
        setinput(e.target.value);
    }
    function addTask() {
        if (input !== '') {
            var entre = [input]
            settaskList(taskList.concat(entre));
            setTimeout(() => {
                textInput.current.value = "";
              }, 100);
            setinput('');
        }
    }
    function deleteTask(task, id) {
        // document.getElementById(id).className = 'task-delete'; utilisé pour annimer la disparition (marche pas)
        var tk = getKeyByValue(taskList, task);
        var nk = taskList;
        delete nk[tk];
        settaskList(nk);
        setTimeout(() => {handleUpdate();}, 300);
    }

    return (
        <section class="to-do-list">
            <Typography variant="h4">To-do list</Typography>
            <div>
                {taskList.map(taskList => (
                    <TodoListItem txt={taskList} idd={uuid()} key={uuid()} deleteTask={(task) => deleteTask(task)}/>
                ))}
            </div>
            <Grid className="to-do-add" container style = {{width: '94%', position: 'relative', whiteSpace: 'nowarp', overflow: 'hidden'}}>
                <Grid item style = {{width: '60%', marginRight: '5%'}} >
                    <TextField id="standard-basic" placeholder="Add something..." color='secondary' onChange={(e) => saveInput(e)} inputRef={textInput} className='to-do-field'></TextField>
                </Grid>
                <Grid item style={{ display: "flex", position: "absolute", right: '5%'}}>
                    <Button className="to-do-add-button" full={true} txt='ADD' onClick={() => addTask()}></Button>
                </Grid>
        </Grid>
        </section>
    )
}