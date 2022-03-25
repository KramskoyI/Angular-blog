
const { Like } = require('../../../models')

const action = async (req, res) => {
  const like = {
    userNum: req.body.userNum,
    postNum: req.body.postNum
  };
  
  
  const likeDB = await Like.findOne({
    where: [
      { userNum: req.body.userNum},
      { postNum: req.body.postNum}
    ]
  })
 
  if(likeDB){
    await Like.destroy({
      where: [
        { userNum: req.body.userNum },
        { postNum: req.body.postNum }
      ]
    })
    .then(() => {
      res.status(200).end();
    })
    
  } else {
    await Like.create(like) 
    .then(()=>{
      res.send(like)
    })
    
  }
};

module.exports = {
  action
};