function renderWorkoutPlans() {
    $("#weeks").empty();
    $.ajax({
        url: "/populatedWorkouts",
        method: "GET"
    }).then(dbData=>{
        dbData.forEach(plan=> {
            const newDiv = $("<div>", {
                style: "width: 25%; border: 2px solid black",
            })
            const title = $("<h2>", {
                text: plan.name
            })
            const newUL = $("<ul>", {
                text: "workouts"
            })
            newDiv.append(title)

            plan.workouts.forEach(workout=>{
                const newPlan = $("<li>", {
                    text: `Name: ${workout.name}\nWeekday: ${workout.weekDay}\nSets: ${workout.sets}\nReps: ${workout.reps}`
                })
                newUL.append(newPlan)
            })
            const newForm = $("<form>", {
                id: plan._id
            })
            const newBtn = $("<button>", {
                text: 'Add workout',
                class: 'update-btn',
                'data-id': plan._id
            })
            const nameInput = $("<input>", {
                type: "text",
                id: `name-${plan._id}`,
                placeholder: "Workout name"
            })
            const weekDayInput = $("<input>", {
                type: "text",
                id: `weekDay-${plan._id}`,
            })
            const setsInput = $("<input>", {
                type: "number",
                id: `sets-${plan._id}`,
            })
            const repsInput = $("<input>", {
                type: "number",
                id: `reps-${plan._id}`,
            })
            newForm.append(nameInput).append(weekDayInput).append(setsInput).append(repsInput).append(newBtn);
            newDiv.append(newUL).append(newForm);
            $("#weeks").append(newDiv);
        })
    })
}
renderWorkoutPlans();

$("#new-workout-plan").on("submit", (event)=>{
    event.preventDefault()
    const workoutPlan = $("#workout-plan").val().trim();
    console.log(workoutPlan);
    $.ajax({
        url: "/api/createWorkout",
        method: "Post",
        data: {name: workoutPlan}
    }).then(renderWorkoutPlans())
})
$("#weeks").on('click', ".update-btn",(event)=>{
    event.preventDefault();
    const weekId = event.target.dataset.id;
    console.log(weekId);
    const name = $(`#name-${weekId}`).val().trim();
    const weekDay = $(`#weekDay-${weekId}`).val().trim();
    const sets = parseInt($(`#sets-${weekId}`).val());
    const reps = parseInt($(`#reps-${weekId}`).val());

    const newWorkout = {
        name, weekDay, sets, reps, weekId
    }
    console.log(newWorkout);

    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: newWorkout
    })
    .then(dbWorkouts => {
        console.log(dbWorkouts)
        renderWorkoutPlans();
    })
    .catch(err => {
        console.log(err);
    })
})