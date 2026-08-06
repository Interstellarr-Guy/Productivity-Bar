const STORAGE_KEY = "guestTasks";

const getStoredTasks = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveStoredTasks = (tasks) => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
};

const getTasks = async () => {
    return getStoredTasks();
};

const addTask = async (task) => {

    const tasks = getStoredTasks();

    const newTask = {
        ...task,
        id: Date.now(),          // temporary id
    };

    tasks.push(newTask);

    saveStoredTasks(tasks);

    return newTask;
};

const updateTask = async (updatedTask) => {

    const tasks = getStoredTasks();

    const updated = tasks.map(task =>
        task.id === updatedTask.id
            ? updatedTask
            : task
    );

    saveStoredTasks(updated);

    return updatedTask;
};

const deleteTask = async (taskId) => {

    const tasks = getStoredTasks();

    const filtered =
        tasks.filter(task => task.id !== taskId);

    saveStoredTasks(filtered);
};

export default {
    getTasks,
    addTask,
    updateTask,
    deleteTask,
};