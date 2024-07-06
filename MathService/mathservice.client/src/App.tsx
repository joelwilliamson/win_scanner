import { useState } from 'react';

import { ContosoUniversity } from './ContosoUniversity.tsx'
import { NavBar } from './NavBar.tsx'
import { Todo } from './Todo.tsx'
import { WeatherForecast } from './WeatherForecast.tsx'
import './App.css';

function ApplicationSelector() {


    enum Application {
        Nothing = 'Nothing',
        Todo = 'Todo',
        WeatherForecast = 'Weather',
        ContosoU = 'Contoso University'
    }

    const [selected, setSelected] = useState(Application.Nothing);

    const navigationItems = [
        { name: "Home", action: () => setSelected(Application.Nothing) },
        { name: "To Do List", action: () => setSelected(Application.Todo) },
        { name: "Weather Forecast", action: () => setSelected(Application.WeatherForecast) },
        { name: "Contoso University", action: () => setSelected(Application.ContosoU) }
    ];

    const applicationMap = {
        [Application.Nothing]: <div />,
        [Application.Todo]: <Todo />,
        [Application.WeatherForecast]: <WeatherForecast />,
        [Application.ContosoU]: <ContosoUniversity />
    };

    return (<>
        <header>
            <NavBar brand="Joel React" navItems={navigationItems} />
        </header>
        <div>
            {applicationMap[selected]}
        </div>
    </>);
}

function App() {
    return (<ApplicationSelector />);
}

export default App;