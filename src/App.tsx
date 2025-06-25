import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Button,
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const addTodo = () => {
    if (newTodoText.trim() === '') {
      setError('Please enter a todo item.');
      return;
    }
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: newTodoText,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
    setError(null);
    toast({
      title: 'Todo Added!',
      description: `"${newTodo.text}" added to your list.`,
    });
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast({
      title: 'Todo Removed!',
      description: 'Todo item removed from your list.',
    });
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>My Todo List</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new todo..."
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
              />
              <Button onClick={addTodo}>Add Todo</Button>
            </div>
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="flex justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                    />
                    <span
                      className={`${
                        todo.completed ? 'line-through' : ''
                      } text-gray-700`}
                    >
                      {todo.text}
                    </span>
                  </label>
                  <Button onClick={() => deleteTodo(todo.id)} variant="ghost">
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default App;
