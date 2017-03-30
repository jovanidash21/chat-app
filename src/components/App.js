import React from 'react';
import NameList from '../containers/NameList';
import Name from '../containers/Name';

const App = () => (
    <div>
        <h1>Hello&nbsp;<Name /></h1>
        <hr />
        <h1>Names</h1>
        <NameList />
    </div>
);

export default App;
