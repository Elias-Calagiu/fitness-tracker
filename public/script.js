function renderWorkoutPlans() {
    $.ajax({
        url: "/populatedWorkouts",
        method: "GET"
    }).then(dbData=>{
        dbPlans.forEach(plan=> {
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
                    text: `Name: ${workout.name}/nSets: ${workout.sets}/nReps: ${workout.reps}`
                })
            })
        })
    })
}