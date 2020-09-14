# Remesh Takehome Assessment

[Live Link To Site](https://remesh-takehome-kang.netlify.app/)

[Link To Backend Repo](https://github.com/lkang97/remesh-takehome-backend)

Backend Instructions:

- Clone the repo and npm install dependencies
- Create a .env file using the .env.example as a guide
- Using PostgreSQL; 
   - create user remesh_user with password ‘remesh_pass’ createdb;
- Using the command line in the directory you can run
   - npx dotenv sequelize-cli db:create
      - This will create the database
   - npx dotenv sequelize-cli db:migrate
      - This will create the migrations
   - npx dotenv sequelize-cli db:seed:all
      - This will create the seed data
 - npm start to run the application

Frontend Instructions:

- Clone the repo and npm install dependencies
- npm start to run the application

# Backend Routes

1. Conversations

   - POST "/conversations"
     - This endpoint will create a new conversation
   - GET "/conversations"
     - This endpoint will grab all conversations

2. Messages

   - GET "/conversations/:id/messages"
     - This endpoint will grab all messages for a particular conversation by id
   - POST "/conversations/:id/messages"
     - This endpoint will create a new message for a particular conversation by id

3. Thoughts
   - GET "/messages/:id/thoughts"
     - This endpoint will grab all thoughts for a particular message by id
   - POST "messages/:id/thoughts"
     - This endpoint will create a new thought for a particular message by id

# Data Schema

### **Conversations**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| title          |  string   |              not null |
| startDate      | timestamp |              not null |

### **Messages**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| text           |  string   |              not null |
| dateTime       | timestamp |              not null |

### **Thoughts**

| attribute name | data type |               details |
| -------------- | :-------: | --------------------: |
| id             |  integer  | not null, primary key |
| text           |  string   |              not null |
| dateTime       | timestamp |              not null |
