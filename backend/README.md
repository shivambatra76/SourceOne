```markdown
## Bookstore API

### Assignment Summary:

**Initial Story:** 
Develop an API that receives a book name and returns the date when that book will be available. The initial dataset is attached in the mail. The expected requirement is to build the backend service exposing the required API. You are expected to come up with the database schema and load the data from the CSV into the database as a build step.

**Scenario Question:** 
You are the developer of the Store system and the below stories are in your sprint. Develop the below features on top of your existing solution as per the previous round. Each story will be a git commit so that we can verify the code per story. Please share the git repo link after you're done.

1. **Story 1:** 
The Store wants to bring in a feature to calculate the rent charges per book. Per day rental charge is Rs 1 for all the books. Create an API that will return the charges applicable when a customer returns his/her lent books. The charges should be only for the returned books only.

2. **Story 2:** 
The Store wants to change the charges on the books depending on the types of the book. There are 3 kinds: Regular, Fiction, and Novel. Regular books renting per day charge is Rs. 1.5. For fiction book renting per day charge is Rs. 3. For novels the per day charge is Rs. 1.5. Make sure to have a migration script that will update the type of the book according to the author. It is up to you to assign the type.

3. **Story 3:** 
The store decided to alter the calculations for Regular books and novels. Now for Regular books, the first 2 days charges will be Rs 1 per day and 1.5 Rs thereafter. Minimum charges will be considered as Rs 2 if days rented is less than 2 days. Similarly for Novel minimum charges are introduced as 4.5 Rs if days rented is less than 3 days.

```

### Running the Project:

1. **Clone the repository:**
   ```
   git clone https://github.com/shivambatra76/SourceOne
   ```

2. **Install dependencies:**
   ```
   cd <project_directory>
   npm install
   ```

3. **Start the server:**
   ```
   npm start
   ```
4. Please execute the Migration Script for Story 2 and 3 
   ```
   node addBookTypesMigration.js
   ```

### API Endpoints:

1. **Check Book Availability**
   - **Endpoint**: `GET /book-availability?book_name=<book_name>`
   - **Description**: Check the availability of a book by providing its name.
   - **CURL Request**: 
     ```bash
     curl -X GET http://localhost:5000/book-availability?book_name=<book_name>
     ```

2. **Calculate Rent Charges**
   - **Endpoint**: `POST /rent-charges`
   - **Description**: Calculate the rent charges for a returned book.
   - **CURL Request**: 
     ```bash
     curl -X POST -H "Content-Type: application/json" -d '{"customer_id":1,"book_name":"<book_name>"}' http://localhost:5000/rent-charges
     ```
