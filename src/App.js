import React from 'react';
import Column from './components/column/Column';
import Header from './components/header/Header';
import PageColumn from './components/pageColumn/PageColumn';
import Footer from './components/footer/Footer';
import './App.css';
import { HashRouter as Router, Route, Switch, Link} from "react-router-dom";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state= {
      tasks: [],
      inputValue: '',
      textAreaValue:'',
      showPageColumn: false,
      namePageColumn:'',
      enabledDropdown: false,
      enabledListItem: false,
      enableAddButton: false,
      enabledInput: false,
      enabledBtnSubmit: false,
      nameAddButton: '',
      nameDropdown: '',
      nameListItem: '',
      activeTasks: 0,
      finishedTasks: 0,
    }
  }

  componentDidMount () {
    const oldTasks = JSON.parse(localStorage.getItem('tasks'));
    if (oldTasks) {
      this.setState ({
        tasks: oldTasks,
      });
    }
  }
  
  onChangeInput = (event) => {
    this.setState({
        inputValue: event.target.value,
        enabledBtnSubmit: true,
    })
  }

  textareaHandleChange = (event) => {
    this.setState({
      textAreaValue: event.target.value
    });
  }

  deleteTableElement = (event) => {
    const idElem = event.target.id;
    this.state.tasks.splice(+idElem, 1);
    this.setState({
      tasks: this.state.tasks,
    });
  }

  componentDidUpdate () {
    const saveTasks = JSON.stringify(this.state.tasks);
    localStorage.setItem('tasks', saveTasks);
  }

  onClickBtn =(event) => {
    const {tasks} = this.state;
    if (event.target.id === "backlog") {
      this.setState({
        enabledInput: true,
      });
    } if (event.target.id === "ready") {
      tasks.forEach ((item) => {
        if (item.title === "backlog") {
          this.setState ({
            enabledDropdown: true,
            nameDropdown: "ready",
          });
        } 
      });
    } if (event.target.id === "inprogress") {
      tasks.forEach((item) => {
        if(item.title === "ready") {
          this.setState({
            enabledDropdown: true,
            nameDropdown: "inprogress",
          });
        }
      });
    } if (event.target.id === "finished") {
      tasks.forEach((item) => {
        if(item.title === "inprogress") {
          this.setState({
            enabledDropdown: true,
            nameDropdown: "finished",
          });
        }
      });
    } if (event.target.id === "btnClosePageColumn"){
      this.setState ({
        showPageColumn: false,
        namePageColumn: '',
      });
    } else return null;
  }

  onClickTitle = (event) => {
    const name = event.target.textContent;
    this.setState({
      showPageColumn: true,
      namePageColumn: name,
    });
  }

  onClickDropdown = (event) => {
    this.setState({
      enabledListItem: true,
      nameListItem: event.target.id,
    });        
  }

  onClickListItem =(event) => {
    const {tasks} = this.state;
    const index = event.target.id;
    const className=event.target.className;
    tasks.map((task, id) => {
      if (id === +index && task.title === "backlog" && className === "listItemReady") {
        task.title = "ready";
        return null;
      } if (id === +index && task.title === "ready" && className === "listItemInprogress") {
        task.title = "inprogress";
        return null;
      } if (id === +index && task.title === "inprogress" && className === "listItemFinished" ){
        task.title = "finished";
        return null;
      } else return null;
    }); 
    
    this.setState({
      tasks: tasks,
      enabledListItem: false,
      enabledDropdown: false,  
    });
  }

  onClickBtnSubmit = (event) => {
    const {inputValue, tasks, textAreaValue} = this.state;
    const id = event.target.id;
    const date = new Date().toUTCString();
    if (id) {
      tasks.map((task, index) => {
        if (+id === index) {
          task.description = textAreaValue;
          this.setState({
            textAreaValue: ''
          });
          return alert('Сохранено');
        } else return null;
      });
    } else {
      this.setState({
        tasks: [...tasks, {title: "backlog", name: inputValue, description: '', date: date, } ],
        inputValue: '',
        enabledInput: false,
        enabledBtnSubmit: false,
        enabledDropdown: false,   
      });
    }
  }

  render() {
    return <div className="wrapper">
      <header className="header">
        <Header />
      </header>
      <Router>         
        <Switch>
         <Route path="/backlog">
            <PageColumn
              textareaHandleChange = {this.textareaHandleChange}
              title = "Backlog"
              tasks={this.state.tasks}
              onClickBtn={this.onClickBtn}
              onClickBtnSubmit = {this.onClickBtnSubmit}
            />  
          </Route>
          <Route path="/ready">
            <PageColumn
              textareaHandleChange = {this.textareaHandleChange}
              title = "Ready"
              tasks={this.state.tasks}
              onClickBtn={this.onClickBtn}
              onClickBtnSubmit = {this.onClickBtnSubmit}
            /> 
          </Route>
          <Route path="/inprogress">
            <PageColumn
              textareaHandleChange = {this.textareaHandleChange}
              title = "In Progress"
              tasks={this.state.tasks}
              onClickBtn={this.onClickBtn}
              onClickBtnSubmit = {this.onClickBtnSubmit}
            /> 
          </Route>
          <Route path="/finished">
            <PageColumn
              textareaHandleChange = {this.textareaHandleChange}
              title = "Finished"
              tasks={this.state.tasks}
              onClickBtn={this.onClickBtn}
              onClickBtnSubmit = {this.onClickBtnSubmit}
            /> 
          </Route> 
          <Route path="/" exact>
            <div className="conteiner">
              <div className="block">
              <Link className="activeLink" to="/backlog"><h1>Backlog</h1></Link>
                <Column
                  state={this.state}
                  title="backlog"
                  onClickBtn={this.onClickBtn}
                  onClickBtnSubmit={this.onClickBtnSubmit}
                  onChangeInput={this.onChangeInput}
                  deleteTableElement={this.deleteTableElement}
                />
              </div>
              <div className="block">
              <Link className="activeLink" to="/ready"><h1>Ready</h1></Link>
                <Column
                  title="ready"
                  idDropdown ="dropdownReady"
                  listItemColumn="backlog"
                  classNameListItem="listItemReady"
                  state={this.state}
                  onClickBtn = {this.onClickBtn}
                  onClickDropdown = {this.onClickDropdown}
                  onClickListItem = {this.onClickListItem}
                  deleteTableElement={this.deleteTableElement}
                />
              </div>
              <div className="block">
              <Link className="activeLink" to="/inprogress"><h1>In Progress</h1></Link>
                <Column
                  title="inprogress"
                  idDropdown="dropdownInProgress"
                  listItemColumn="ready"
                  classNameListItem="listItemInprogress"
                  state={this.state}
                  onClickBtn = {this.onClickBtn}
                  onClickDropdown = {this.onClickDropdown}
                  onClickListItem = {this.onClickListItem}
                  deleteTableElement={this.deleteTableElement}
                />
              </div>
              <div className="block">
              <Link className="activeLink" to="/finished"><h1>Finished</h1></Link>
                <Column
                    title="finished"
                    idDropdown="dropdownFinished"
                    listItemColumn="inprogress"
                    classNameListItem="listItemFinished"
                    state={this.state}
                    onClickBtn = {this.onClickBtn}
                    onClickDropdown = {this.onClickDropdown}
                    onClickListItem = {this.onClickListItem}
                    deleteTableElement={this.deleteTableElement}
                  />
              </div>   
            </div>
          </Route>
        </Switch>
      </Router>
      <footer className="footer">
        <Footer tasks={this.state.tasks}   />
      </footer>
    </div>
  }
}
 
export default App;