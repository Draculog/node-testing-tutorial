# Unit_Test_Workshop
 
<h3>Prerequisites </h3> <br>
Before getting started, ensure you have the following installed:

Node.js (v14 or higher) <br>
VSCode <br>
You should also be familiar with basic JavaScript, RESTful APIs, and CRUD operations <br>


<h3>Setting Up Your Environment in Visual Studio Code </h3> 
<li>Download the project files or clone the repository</li>
<pre><li>To clone via Git: <b>git clone https://github.com/Draculog/node-testing-tutorial.git</li></pre>
<li>Open project in VSCode </li><br>

<h3>Steps to run:</h3>

<h4> Install Project Dependencies </h4>
In the VSCode terminal: <br>
<li>Run 'npm install' </li><br>

Confirm installation with: <br>
<li> node -v </li><br>
<li>npm -v </li><br>

Run tests: 
<li>npm test</li><br>
2 tests should be failing and 1 should be passing<br>

Run application:
<li>npm start</li><br>
Note: You will not need to run the application for the workshop, you will only be changing and running tests


<h3>To Do's & Reminders</h3>
The only file you have to edit for this workshop is api.test.js (test/api.test.js). 
And the only other file you may need to look at to understand how the routes work is api.js (server/routes/api.js).

Slides can be found at:
https://docs.google.com/presentation/d/1J4txX7BpMdH4AgrvYFq-x9BCvvHKj3XxYXzzIO-_pLw/edit?usp=sharing

Further documentation can be found at:
https://docs.google.com/document/d/1K4BOofBaBHln-JBuXZDcXkhVtBxuOCsH-EunD5lDfl8/edit?usp=sharing


<h3>What you will be doing</h3>
The application uses a local database and stores simple objects called 'tasks'.
Tasks objects just have 2 fields: description and date, which are both just strings.
The test cases in this workshop will focus on these tasks and their states in the database.

api.test.js will have 3 test cases:
#1. The entire test case is written, you just have to find the 1 small bug within it (after fixing 2 out of 3 tests should pass).
#2. Half the test is written and you will have to write the rest.
#3. None of the test is written and you will have to write all of it.

Each test has step by step instructions to help guide you.
You may need to view the routes in api.js which is why you should look at that file and understand how those routes work.

<br> 

<h3>I would greatly appreciate your participation in my post-tutorial survey linked <a href="https://docs.google.com/forms/d/e/1FAIpQLSe0DLKHJj8MDFq8Td_0KRdPCOb1xAazvcR-4DSZUW-Qqrbl0A/viewform?usp=dialog">Here</a></h3>

Lastly, THANK YOU. I appreciate your willingness to learn and your feedback. I hope this tutorial was both helpful and beneficial. 










