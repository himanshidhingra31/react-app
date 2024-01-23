const express = require('express');
const router = express.Router();
const Collection = require('./database');

router.get('/getAllList', async (req, res) => {
    try {
        let result = await getAllList();
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/insertData', async (req, res) => {
    try {
        let result = await insertRecord(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json('Error creating product');
    }
});


// Update 
router.put('/:id', async (req, res) => {
    try {
      console.log("update");
        let result = await updateRecord(req.body, req.params.id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a product
router.delete('/delete/:id', async (req, res) => {
    try {
      console.log('req.params.id',req.params.id);
        await deleteData(req.params.id)
        res.status(200).json();
    } catch (error) {
      console.log(error);
        res.status(500).json();
    }
});

// router.get

function insertRecord(data) {
    return new Promise(async (resolve, reject) => {
        try {
            let insertData = new Collection(data);
            let insertedData =  await insertData.save();
            resolve(insertedData);
        } catch (error) {
            reject(error);
        }
    });
}


function getAllList() {
  return new Promise(async (resolve, reject) => {
    try {
        const results = await Collection.find({});
        resolve(results);
    } catch (error) {
      reject(error);
    }
  });
}

// Assuming Collection is an instance of your MongoDB collection

function deleteData(id) {
  return new Promise((resolve, reject) => {
    try {     
   Collection.deleteOne({ _id: id })
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      reject(error);
    });
  } catch (error) {
    reject(error);
  }
});
}


function updateRecord(data, id) {
  return new Promise((resolve, reject) => {
    try {      
        const updateQuery = {
          $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            email: data.email,
          }
        };
        Collection.updateOne({ _id: id }, updateQuery)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = router;