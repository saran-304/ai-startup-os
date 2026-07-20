'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/providers/auth-provider';
import { Kanban, Plus, Clock, CheckCircle, AlertCircle, Calendar, Tag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  tags: string[];
}

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete customer interviews',
      description: 'Interview 10 potential customers for validation',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2024-02-01',
      tags: ['validation', 'customers'],
    },
    {
      id: '2',
      title: 'Update pitch deck',
      description: 'Add financial projections and market analysis',
      status: 'todo',
      priority: 'high',
      dueDate: '2024-02-05',
      tags: ['pitch', 'investors'],
    },
    {
      id: '3',
      title: 'Design MVP wireframes',
      description: 'Create wireframes for core features',
      status: 'todo',
      priority: 'medium',
      dueDate: '2024-02-10',
      tags: ['design', 'mvp'],
    },
    {
      id: '4',
      title: 'Set up analytics',
      description: 'Implement tracking for user behavior',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-01-25',
      tags: ['analytics', 'technical'],
    },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    tags: '',
  });

  const columns = [
    { id: 'todo', title: 'To Do', icon: AlertCircle },
    { id: 'in_progress', title: 'In Progress', icon: Clock },
    { id: 'completed', title: 'Completed', icon: CheckCircle },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      tags: newTask.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', tags: '' });
    setShowAddTask(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your startup tasks and track progress
          </p>
        </div>
        <Button onClick={() => setShowAddTask(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Add Task Dialog */}
      {showAddTask && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  placeholder="e.g., validation, customers, mvp"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addTask}>Add Task</Button>
                <Button variant="outline" onClick={() => setShowAddTask(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kanban Board */}
      <div className="grid gap-6 md:grid-cols-3">
        {columns.map((column) => {
          const Icon = column.icon;
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <Card key={column.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="h-5 w-5" />
                  {column.title}
                  <span className="ml-auto text-sm font-normal text-muted-foreground">
                    {columnTasks.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {columnTasks.map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-sm">{task.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                        {task.tags.length > 0 && (
                          <div className="flex items-center gap-1 flex-wrap">
                            {task.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2 pt-2">
                          {column.id !== 'todo' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => {
                                if (column.id === 'completed') {
                                  updateTaskStatus(task.id, 'in_progress');
                                } else {
                                  updateTaskStatus(task.id, 'todo');
                                }
                              }}
                            >
                              ← Back
                            </Button>
                          )}
                          {column.id !== 'completed' && (
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => {
                                if (column.id === 'todo') {
                                  updateTaskStatus(task.id, 'in_progress');
                                } else {
                                  updateTaskStatus(task.id, 'completed');
                                }
                              }}
                            >
                              {column.id === 'todo' ? 'Start' : 'Complete'} →
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Kanban className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No tasks</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
