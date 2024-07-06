import { useEffect, useState } from 'react';
import { fetchWithObject } from './utilities.ts'
import { CheckBox, TextBox } from './BasicComponents.tsx'

interface TodoItem {
    id: number;
    name: string;
    isComplete: boolean;
}

function CreateNewItemForm({ onItemCreated }: { onItemCreated: () => void }) {
    const [name, setName] = useState('New Task');
    const [isComplete, setIsComplete] = useState(false);

    async function handleSubmit(evt: React.ChangeEvent<HTMFormElement>) {
        evt.preventDefault();
        const body = {
            id: 0,
            name: name,
            isComplete: isComplete
        };
        await fetchWithObject('/api/TodoItems', 'POST', body);

        onItemCreated();
    }

    const newTodoItemForm =
        (<div id="newTodoItem">
            <form onSubmit={handleSubmit}>
                <label>To do:</label>
                <TextBox
                    name="name"
                    value={name}
                    onChange={(t) => { console.log(t); setName(t); }} />

                <label>Is Complete</label>
                <CheckBox
                    name="isComplete"
                    value={isComplete}
                    onChange={setIsComplete} />

                <button type='submit'>Create</button>
            </form>
        </div>);

    return newTodoItemForm;
}

function CompleteButton({ onComplete }: { onComplete: () => void }): JSX.Element {
    return <button
        className="todo complete"
        onClick={() => onComplete()}
    >Complete</button>;
}

function DeleteButton({ onDelete }: { onDelete: () => void }): JSX.Element {
    return <button
        className="todo delete"
        onClick={() => onDelete()}
    >Delete</button>;
}

function TodoItem({ item, onComplete, onDelete }: { item: TodoItem, onComplete: () => void, onDelete: () => void }) {
    return (<tr>
        <td>{item.name ? item.name : '""'}</td>
        <td>{item.isComplete ? "Complete" : "To Do"}</td>
        <td>{item.id}</td>
        <td><CompleteButton onComplete={onComplete} /></td>
        <td><DeleteButton onDelete={onDelete} /></td>
    </tr>)
}

function TodoItemTable({ todoItems, onItemChanged }: { todoItems: TodoItem[], onItemChanged: () => void }) {
    const todoItemContents = todoItems === undefined
        ? <p><em>Loading...</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Is Complete</th>
                    <th>ID</th>
                    <th>Complete</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todoItems
                    .sort((a, b) => a.id - b.id)
                    .map(item =>
                        <TodoItem
                            key={item.id}
                            item={item}
                            onComplete={() => completeItem(item)}
                            onDelete={() => deleteItem(item)}
                        />)}
            </tbody>
        </table>

    return todoItemContents;

    async function completeItem(item: TodoItem) {
        item.isComplete = true;
        await fetchWithObject(`/api/TodoItems/${item.id}`, 'PUT', item);
        onItemChanged();
    }

    async function deleteItem(item: TodoItem) {
        await fetchWithObject(`/api/TodoItems/${item.id}`, 'DELETE', item);
        onItemChanged();
    }
}

/**
 * This components allows creating and viewing the Todo items
 * @returns
 */
export function Todo() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

    useEffect(() => {
        populateTodoItems()
    }, []);

    return (<div>
        <h1 id="tableLabel">Todo Items</h1>
        <CreateNewItemForm onItemCreated={populateTodoItems} />
        <TodoItemTable todoItems={todoItems} onItemChanged={populateTodoItems} />
    </div>);

    async function populateTodoItems() {
        const response = await fetch('/api/TodoItems');
        const data = await response.json();
        setTodoItems(data);
    }
}