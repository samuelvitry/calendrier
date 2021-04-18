import React, { useState, useRef } from 'react'
import uuid from 'react-uuid'
import {TodoListItem} from './TodoListItem'
import { Button } from './Button'


export const TodoList = () => {

    const [taskList, settaskList] = useState(["Terminer la base du front end", "Ameliorer le CSS", "Logique d'affichage", "Police de charactères", "Couleurs", "Responsive design", "Rendre les éléments fonctionels", "Annimations"]);
    const [input, setinput] = useState('');

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
            <h2>To-do list</h2>
            <div>
                {taskList.map(taskList => (
                    <TodoListItem txt={taskList} idd={uuid()} key={uuid()} deleteTask={(task) => deleteTask(task)}/>
                ))}
            </div>
            <div className="to-do-add" style={{width: '94%', position: 'relative', whiteSpace: 'nowarp', overflow: 'hidden'}}>
                <div>
                    <input value={input} style = {{width: '60%', marginRight: '5%'}} className='input-open to-do-field' placeholder="Add something..." onChange={(e) => saveInput(e)}/>
                </div>
                <div style={{ display: "flex", position: "absolute", right: '5%', top:'15%'}}>
                    <Button className="to-do-add-button" full={true} txt='ADD' onClick={() => addTask()}></Button>
                </div>
            </div>
        </section>
    )
}