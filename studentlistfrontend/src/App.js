import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';

class App extends React.Component{
  state ={
    students:[]
  }
  render(){
    return(
      
      <Container>
        {this.state.students.map(student => <div key ={student.id}>
          {student.name} - {student.surname} - {student.email} -{student.dateOfBirth} -{student.country}
         </div>)}
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
