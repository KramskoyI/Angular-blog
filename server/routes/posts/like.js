
const { Like } = require('../../../models')

const action = async (req, res) => {
  const like = {
    userNum: req.body.userNum,
    postNum: req.body.postNum
  };
  
  
  const likeF = await Like.findOne({
    where: [
      { userNum: req.body.userNum},
      {postNum: req.body.postNum}
    ]
  })
  
  console.log('like=>', like, 'likeF=>',likeF)
  if(likeF){
    await Like.destroy({
      where: [
        { userNum: req.body.userNum },
        { postNum: req.body.postNum }
      ]
    })
    .then((data) => {
      res.sendStatus(200);
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