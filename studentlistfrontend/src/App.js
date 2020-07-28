import React from 'react';
import './App.css';
import { Container, Row, Col, FormControl, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component{
  state ={
    students:[],
    name: "",
    surname: "",
    email: "",
    dob:"",
  }

  postStudent = async()=> {
    const toSend = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      dob: this.state.dob,
    }
    const resp = await fetch("http://localhost:3003/students",{
      method: "POST",
      body: JSON.stringify(toSend),
      header:{
        "Content-Type":"application/json"
      }
    })

    
    if (resp.ok) {
      const newStudent = await resp.json()
      this.setState({
        students: this.state.students.concat(newStudent)
      })
      console.log("All good")
    }
    else{
      console.log("Somthing went wrong")
    }
  }
  render(){
    return(
      <Container>
        <Row>
          <Col>
        {this.state.students.map(student => <div key ={student.id}>
          {student.name} {student.surname} - {student.email} -{student.dob}
         </div>)}
         </Col>
         <Col>
         
         <FormControl type="text" value={this.state.name} placeholder="Name" onChange={e => this.setState({name: e.currentTarget.value})}/>
         <FormControl type="text" value={this.state.surname} placeholder="Surname" onChange={e => this.setState({surname: e.currentTarget.value})}/>
         <FormControl type="text" value={this.state.email} placeholder="Email" onChange={e => this.setState({email: e.currentTarget.value})}/>
         <FormControl type="date" value={this.state.dateOfBirth} placeholder="DOB" onChange={e => this.setState({dob: e.currentTarget.value})}/>
         <Button onClick={this.postStudent}>Add</Button>
         </Col>
         </Row>
          </Container>
    
    );
    
  }
 

  componentDidMount = async () => {
    const res = await fetch ("http://localhost:3003/students")
    const students = await res.json()
    console.log(students)
    this.setState({
      students: students 
    })
  }
}

export default App;
