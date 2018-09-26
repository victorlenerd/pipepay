import React from 'react';
import AppContext from 'contexts/app.context';


export const withAppContext = (props) => {
    const comp = React.createElement(props.children, {...props});

    return (
        <AppContext.Consumer>
            {(values) => (<comp  {...values} />)}
        </AppContext.Consumer>
    );
};