# Remesh Takehome Assessment

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
