const { Like } = require('../../../models')

const action = async (req, res) => {
    const id = req.params.id;
    if(id) {
        await Like.findAll({
            where: {postNum: id},
        })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.send('ERROR, not found');
        });
    } else {
        res.send('ERROR, not found');
    }
    
};

module.exports = {
  action
};