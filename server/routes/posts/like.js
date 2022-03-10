
const { Like } = require('../../../models')

const action = async (req, res) => {
  const like = {
    userNum: req.body.userNum,
    postNum: req.body.postNum
  };
  
  

  await Like.create(like) // post.id ===>> is post id
  .then(()=>{
    res.send(like)
  })
  
};

module.exports = {
  action
};