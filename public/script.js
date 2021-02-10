function renderWorkoutPlans() {
    $("weeks").empty();
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
                text: "Workouts"
            })
            newDiv.append(title)

            plan.workouts.forEach(workout=>{
                const newPlan = $("<li>", {
                    text: `Name: ${workout.name}/nWeekday: ${workout.weekday}/nSets: ${workout.sets}/nReps: ${workout.reps}`
                })
                newUL.append(newPlan)
            })
            newDiv.append(newUL)
            $("weeks").append(newDiv)
        })
    })
}
renderWorkoutPlans();

$("#new-workout-plan").on("submit", (event)=>{
    event.preventDefault()
    const workoutPlan = $("#workout-plan").val().trim();
    console.log(workoutPlan);
})