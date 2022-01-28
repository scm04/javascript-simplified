/**
 * DONE: 2. Select all the elements needed:
 * --- The form element (id = "quiz-form")
 * --- The answer inputs (class = "answer")
 * --- BONUS: The questions (class = "question-item")
 * --- BONUS: The alert (id = "alert")
 */
const form = document.querySelector("#quiz-form")
const answers = Array.from(document.querySelectorAll(".answer"))
const questions = Array.from(document.querySelectorAll(".question-item"))
const alert = document.querySelector("#alert")

/**
 * DONE: 3. Create a submit event listener for the form that does the following:
 * --------- 1. Prevent the default behavior.
 * --------- 2. Get all selected answers (use the "checked" property on the input to
 * --------------- determine if it is selected or not).
 * --------- 3. Loop through the selected answers to see if they are correct or not
 * --------------- (check the value of the answer to see if it is the string "true").
 * --------- 4. For each correct answer, add the class "correct" to the parent with the
 * --------------- class "question-item" and remove the class "incorrect".
 * --------- 5. For each incorrect answer, add the class "incorrect" to the parent with
 * --------------- the class "question-item" and remove the class "correct".
 * --------- 6. BONUS: Make sure unanswered questions show up as incorrect. The easiest
 * --------------- way to do this is to add the "incorrect" class to and remove the
 * --------------- "correct" class from all elements with the class "question-item"
 * --------------- before checking the correct answers.
 * --------- 7. BONUS: If all answers are correct, show the element with the id "alert"
 * --------------- and hide it after one second (look into setTimeout) (use the class
 * --------------- "active" to show the alert and remove the class to hide it).
 */
form.addEventListener("submit", e => {
	// Step 3.1
	e.preventDefault()

	// Step 3.6
	questions.forEach(q => {
		q.classList.remove("correct")
		q.classList.add("incorrect")
	})

	// Steps 3.2 - 3.5
	const selectedAnswers = answers.filter(a => a.checked)
	selectedAnswers.forEach(a => {
		const question = a.closest(".question-item")
		question.classList.toggle("correct", a.value === "true")
		question.classList.toggle("incorrect", a.value === "false")
	})

	// Step 3.7
	// My original solution.
	// const correctQuestions = questions.filter(q => q.classList.contains("correct")).length
	// if (correctQuestions < questions.length) return

	// Kyle's solution (which I think is much better than my original solution
	// since it is more readable).
	// const allCorrect = selectedAnswers.every(a => a.value === "true")
	// const allAnswered = selectedAnswers.length === questions.length
	// if (!allCorrect || !allAnswered) return

	// My final solution (which is based on Kyle's solution; I think this is the best
	// solution because it is the most concise and uses the least number of checks
	// necessary to verify the conditions that need to be met to show the alert).
	// Basically, at this point in the script, we're done adding and removing CSS
	// classes to the question elements, so if all the question elements have the
	// CSS class "correct" applied to them, then all the questions were answered
	// correctly and we don't need to check anything else.
	const allCorrect = questions.every(q => q.classList.contains("correct"))
	if (!allCorrect) return

	alert.classList.add("active")
	setTimeout(() => {
		alert.classList.remove("active")
	}, 1000)
})
