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
    // complete Task
   const completeTask = async (taskId, completion) => {

    const tasks = getStoredTasks();

    const updated = tasks.map(task => {

        if (task.id !== taskId) {
            return task;
        }

        const updatedTask = {
            ...task,

            // Add today's worked minutes to lifetime minutes
            workedMinutes:
                (task.workedMinutes || 0) +
                completion.workedMinutes,
        };

        // Only one-time tasks become DONE
        if (task.repeatType === "NONE") {

            updatedTask.status = "DONE";
            updatedTask.completedDate =
                completion.completedDate;

        }

        // DAILY tasks stay available
        return updatedTask;
    });

    saveStoredTasks(updated);

    return updated.find(task => task.id === taskId);
};

  //updated Task status
  const updateTaskStatus = async (taskId, status) => {

    const tasks = getStoredTasks();

    const updated = tasks.map(task =>

        task.id === taskId
            ? {
                ...task,
                status,

                // If changing back to TODO,
                // clear completion information
                ...(status === "TODO" && {
                    workedMinutes: undefined,
                    completedDate: undefined
                })
            }
            : task
    );

    saveStoredTasks(updated);

    return updated.find(task => task.id === taskId);
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
    completeTask,
    updateTaskStatus,
    updateTask,
    deleteTask,
};