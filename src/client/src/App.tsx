import React from 'react';

interface State {
  message: string
}

interface MyProps {}

class App extends React.Component<MyProps, State> {

  constructor(props: Readonly<State>){
    super(props);
    this.state = {
      message : ""
    }
  }

  componentDidMount = () => {
    fetch('/message')
    .then(res => res.json())
    .then(res => this.setState({message: res.message}))
  }

  render(){
    return(
      <h1>{this.state.message ? this.state.message : "Loading..."}</h1>
    )
  }
}

export default App;
