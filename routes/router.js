const router = require('express').Router()
const {repsonseCreator, errorCreator} = require('../utils/responseCreator') 

//http:localhost:4000/router/
router.get('/', (req,res) => {
    console.log(req.path)
    res.send(req.path)
});

//http:localhost:4000/router/path
router.get('/path', (req,res) => {
    console.log(req.path)
    res.send(req.path)
});

//http:localhost:4000/router/user/101
router.get('/user/:id', (req, res) => {
    console.log(req.params)
    //res.send({data:req.params})
    res.send(repsonseCreator("request completed", req.params))
})

//http:localhost:4000/router/search?name=abcd&city=hyderabad
router.get('/search', (req,res) => {
    console.log(req.query)
    //res.send({data:req.query})
    res.send(repsonseCreator("request completed", req.query))
})

//http:localhost:4000/router/signup
router.post('/signup',(req, res) => {
    console.log(req.body)
    //res.send({success:true,message:"request completed"})
    res.send(repsonseCreator("request completed"))
});

//wildcard route
router.all('/*', (req,res,next) => {
    try {
        errorCreator("Invalid Request")
    } catch (error) {
        next(error)
    }
})

module.exports = router;
