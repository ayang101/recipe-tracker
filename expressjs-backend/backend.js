const express = require('express');
const app = express();
const port = 5000;

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Professor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       },
    ]
 }

 // allows backend to respond to calls coming from a different origin
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send(users);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

app.get('/users', (req, res) => {
   const name = req.query.name;
   if (name != undefined){
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
   }
   else{
      res.send(users);
   }
});

const findUserByName = (name) => {
   return users['users_list'].filter( (user) => user['name'] === name);
}

app.get('/users/:id', (req, res) => {
   const id = req.params['id']; // or req.params.id
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
   else {
      result = {users_list: result};
      res.send(result);
   }
});

function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   // return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
   const userToAdd = req.body;
   const user = addUser(userToAdd);
   res.status(201).send(user).end();
});

function addUser(user){
   const rand_id = generateRandomId();
   user['id'] = rand_id;
   users['users_list'].push(user);
   return user;
}

// remove a particular user by id
app.delete('/users/:id', (req, res) => {
   const id = req.params['id']; // or req.params.id
   let result = findUserIndexById(id);
   if (result === -1)
      res.status(404).send('Resource not found.');
   else {
      users['users_list'].splice(result, 1);
      res.status(204).end();
   }
});

// get all users that match a given name and job
app.get('/users', (req, res) => {
   const name = req.params['name']; // or req.params.id
   const job = req.params['job'];
   let result = findUserByNameJob(name, job);
   if (result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
   else {
      result = {users_list: result};
      res.send(result);
   }
});

function findUserByNameJob(name, job) {
   return users['users_list'].find( ((user) => user['name'] === name) && ((user) => user['job'] === job));
}

function findUserIndexById(id) {
   return users['users_list'].findIndex( (user) => user['id'] === id); // or line below
   // return users['users_list'].filter( (user) => user['id'] === id);
}

function generateRandomId() {
   return String(Math.floor(Math.random() * 100000) + 1);
}
