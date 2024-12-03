// Updated script.js with improved role-based visibility
window.onload = function () {
    // Hide all role-based sections initially
    document.getElementById('courses').style.display = 'none';
    document.getElementById('assignments').style.display = 'none';
    document.getElementById('instructor-tools').style.display = 'none';
    document.getElementById('studentManagementSection').style.display = 'none';
    document.getElementById('announcementSection').style.display = 'none';
    document.getElementById('quizManagementSection').style.display = 'none';
    document.getElementById('gradeAssignments').style.display = 'none';
    document.getElementById('quizArea').style.display = 'none';
};

// Setting up user roles
function setRole() {
    // Hide all sections at first
    document.getElementById('courses').style.display = 'none';
    document.getElementById('assignments').style.display = 'none';
    document.getElementById('instructor-tools').style.display = 'none';
    document.getElementById('studentManagementSection').style.display = 'none';
    document.getElementById('announcementSection').style.display = 'none';
    document.getElementById('quizManagementSection').style.display = 'none';
    document.getElementById('gradeAssignments').style.display = 'none';

    // Determine role and display appropriate sections
    const role = document.getElementById('roleSelect').value;

    if (role === 'student') {
        document.getElementById('assignments').style.display = 'block';
        document.getElementById('quizManagementSection').style.display = 'block';
    } else if (role === 'instructor') {
        document.getElementById('assignments').style.display = 'block';
        document.getElementById('courses').style.display = 'block';
        document.getElementById('instructor-tools').style.display = 'block';
        document.getElementById('studentManagementSection').style.display = 'block';
        document.getElementById('announcementSection').style.display = 'block';
        document.getElementById('quizManagementSection').style.display = 'block';
        loadAssignmentsForGrading();
    } else if (role === 'admin') {
        document.getElementById('courses').style.display = 'block';
        document.getElementById('assignments').style.display = 'block';
        document.getElementById('announcementSection').style.display = 'block';
    }
    alert(`Logged in as ${role}`);
}

// Script for managing assignment submission
function submitAssignment() {
    const assignmentFile = document.getElementById('assignmentFile').files[0];
    if (!assignmentFile) {
        document.getElementById('assignmentMessage').innerText = "Please upload a file before submitting.";
    } else {
        if (validateFile(assignmentFile)) {
            document.getElementById('assignmentMessage').innerText = "Assignment submitted successfully!";
        } else {
            document.getElementById('assignmentMessage').innerText = "Invalid file format.";
        }
    }
}

// Simple validation function
function validateFile(file) {
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}

// Manage instructor tools
function createCourse() {
    document.getElementById('newCourseForm').style.display = 'block';
}

function addCourse() {
    const newCourseTitle = document.getElementById('newCourseTitle').value;
    if (newCourseTitle) {
        const coursesList = document.getElementById('courses-list');
        const newCourseElement = document.createElement('div');
        newCourseElement.innerText = newCourseTitle;
        coursesList.appendChild(newCourseElement);
        document.getElementById('newCourseForm').style.display = 'none';
        document.getElementById('newCourseTitle').value = '';
    } else {
        alert("Course title cannot be empty");
    }
}

// Managing students
let students = [];

function addStudent() {
    const studentName = document.getElementById('studentName').value;
    if (studentName) {
        students.push(studentName);
        updateStudentList();
        document.getElementById('studentName').value = '';
    } else {
        alert("Please enter a student's name.");
    }
}

function removeStudent() {
    const studentName = document.getElementById('studentName').value;
    const index = students.indexOf(studentName);
    if (index > -1) {
        students.splice(index, 1);
        updateStudentList();
        document.getElementById('studentName').value = '';
    } else {
        alert("Student not found.");
    }
}

function updateStudentList() {
    const studentList = document.getElementById('students');
    studentList.innerHTML = '';
    students.forEach((student) => {
        const li = document.createElement('li');
        li.innerText = student;
        studentList.appendChild(li);
    });
}

// Managing announcements
let announcements = [];

function postAnnouncement() {
    const announcementText = document.getElementById('announcementText').value;
    if (announcementText) {
        announcements.push(announcementText);
        updateAnnouncements();
        document.getElementById('announcementText').value = '';
    } else {
        alert("Please enter an announcement.");
    }
}

function updateAnnouncements() {
    const announcementList = document.getElementById('announcementList');
    announcementList.innerHTML = '';
    announcements.forEach((announcement) => {
        const li = document.createElement('li');
        li.innerText = announcement;
        announcementList.appendChild(li);
    });
}

// Manage grading
function loadAssignmentsForGrading() {
    const gradeAssignmentsDiv = document.getElementById('gradeAssignments');
    if (gradeAssignmentsDiv) {
        const assignment = document.createElement('div');
        assignment.innerHTML = `
            <p>Student ID: 123 - Assignment: "Math Homework"</p>
            <input type="text" id="gradeInput" placeholder="Enter grade">
            <button onclick="gradeAssignment(123, 1, document.getElementById('gradeInput').value)">Grade</button>
        `;
        gradeAssignmentsDiv.appendChild(assignment);
        gradeAssignmentsDiv.style.display = 'block';
    }
}

function gradeAssignment(studentID, assignmentID, grade) {
    alert(`Assignment graded for student ${studentID} with grade: ${grade}`);
}

// Quiz Management
let quizQuestions = [];
let currentQuestionIndex = 0;

function addQuizQuestion() {
    const quizQuestion = document.getElementById('quizQuestion').value;
    if (quizQuestion) {
        quizQuestions.push(quizQuestion);
        updateQuizQuestions();
        document.getElementById('quizQuestion').value = '';
    } else {
        alert("Please enter a quiz question.");
    }
}

function updateQuizQuestions() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    quizQuestions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${question}`;
        questionList.appendChild(li);
    });
}

function startQuiz() {
    if (quizQuestions.length > 0) {
        currentQuestionIndex = 0;
        document.getElementById('quizArea').style.display = 'block';
        displayQuestion();
    } else {
        alert("No quiz questions available. Please add questions first.");
    }
}

function displayQuestion() {
    const questionDiv = document.getElementById('currentQuestion');
    questionDiv.innerText = quizQuestions[currentQuestionIndex];
}

function submitAnswer() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        alert("Quiz Completed!");
        document.getElementById('quizArea').style.display = 'none';
    }
}
