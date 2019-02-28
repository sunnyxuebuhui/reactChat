import React, { Component } from 'react';
import { Button } from 'antd-mobile';

class App extends Component {
  render() {
    const name = 'sunny737377';
    return (
      <div>
        {name}
        <Button type="warning" size="small" inline>简单</Button>
      </div>
    );
  }
}

export default App;
