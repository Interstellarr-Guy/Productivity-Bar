const STORAGE_KEY = "guestTasks";
const COMPLETION_STORAGE_KEY = "guestCompletions";

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

// Guest Stored completion
const getStoredCompletions = () => {
    const data = localStorage.getItem(
        COMPLETION_STORAGE_KEY
    );

    return data ? JSON.parse(data) : [];
};

const saveStoredCompletions = (completions) => {
    localStorage.setItem(
        COMPLETION_STORAGE_KEY,
        JSON.stringify(completions)
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
//    const completeTask = async (taskId, completion) => {

//     const tasks = getStoredTasks();

//     const updated = tasks.map(task => {

//         if (task.id !== taskId) {
//             return task;
//         }

//         const updatedTask = {
//             ...task,

//             // Add today's worked minutes to lifetime minutes
//             workedMinutes:
//                 (task.workedMinutes || 0) +
//                 completion.workedMinutes,
//         };

//         // Only one-time tasks become DONE
//         if (task.repeatType === "NONE") {

//             updatedTask.status = "DONE";
//             updatedTask.completedDate =
//                 completion.completedDate;

//         }

//         // DAILY tasks stay available
//         return updatedTask;
//     });

//     saveStoredTasks(updated);

//     return updated.find(task => task.id === taskId);
// };

        //Complete Task
    const completeTask = async (taskId, completion) => {

    const tasks = getStoredTasks();


    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        throw new Error("Task not found");
    }

    // -----------------------------
    // 1. Create completion record
    // -----------------------------

    const completions = getStoredCompletions();

    const newCompletion = {
        id: Date.now(),
        taskId: taskId,
        completedDate: completion.completedDate,
        workedMinutes: completion.workedMinutes
    };

    completions.push(newCompletion);

    saveStoredCompletions(completions);


    // -----------------------------
    // 2. Update task lifetime data
    // -----------------------------

    const updated = tasks.map(task => {

        if (task.id !== taskId) {
            return task;
        }

        const updatedTask = {
            ...task,

            workedMinutes:
                (task.workedMinutes || 0) +
                completion.workedMinutes,
        };


        // Only NORMAL tasks become DONE
        if (task.repeatType === "NONE") {

            updatedTask.status = "DONE";

            updatedTask.completedDate =
                completion.completedDate;
        }


        // DAILY tasks remain TODO
        return updatedTask;
    });


    saveStoredTasks(updated);

    return updated.find(
        task => task.id === taskId
    );
};    

  //Undo Completion
  const undoCompletion = async (taskId, completedDate) => {

    const tasks = getStoredTasks();
    const completions = getStoredCompletions();

    // Find all completions for this task on this date
    const matchingCompletions = completions.filter(
        completion =>
            completion.taskId === taskId &&
            completion.completedDate === completedDate
    );

    // Calculate how many minutes we are removing
    const removedMinutes = matchingCompletions.reduce(
        (total, completion) =>
            total + completion.workedMinutes,
        0
    );

    // Remove those completion records
    const updatedCompletions = completions.filter(
        completion =>
            !(
                completion.taskId === taskId &&
                completion.completedDate === completedDate
            )
    );

    saveStoredCompletions(updatedCompletions);


    // Update task lifetime minutes/status
    const updatedTasks = tasks.map(task => {

        if (task.id !== taskId) {
            return task;
        }

        return {
            ...task,

            workedMinutes: Math.max(
                0,
                (task.workedMinutes || 0) - removedMinutes
            ),

            // Normal task becomes TODO again
            ...(task.repeatType === "NONE" && {
                status: "TODO",
                completedDate: undefined
            })
        };
    });

    saveStoredTasks(updatedTasks);

    return updatedTasks.find(
        task => task.id === taskId
    );
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

// Get productivity data from completion records
const getProductivityData = async () => {

    const completions = getStoredCompletions();

    const productivityData = {};

    completions.forEach(completion => {

        if (
            completion.completedDate &&
            completion.workedMinutes > 0
        ) {

            productivityData[completion.completedDate] =
                (productivityData[completion.completedDate] || 0)
                + completion.workedMinutes / 60;

        }

    });

    return productivityData;
};



export default {
    getTasks,
    addTask,
    completeTask,
    undoCompletion,
    updateTaskStatus,
    updateTask,
    deleteTask,
    getProductivityData,
};