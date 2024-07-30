# IN ORDER TO TEST YOUR SOLUTIONS YOU SHOULD RUN THE FOLLOWING COMMAND IN FOLDER 04_express IN THE TERMINAL:

Install the required packages (you only need to run it once) from 04_express folder

    npm install

Execute tests from 04_express folder

    npm run test-express express_tests/express_b1ex1.test.js

The last command will execute the indicated test file.

---

In order to be able to test an exercise you need to create the exercise accordingly:

## Example for block01/ex01:

First of all, from the exercise folder, initiate with npm

    npm init -y

Then, create the main server file

    touch index.js

Then, install required packages

    npm install express cors

Finally, start your server

    nodemon
