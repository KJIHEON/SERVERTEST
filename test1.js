

class conclass {

    find = async(req,res,next)=>{
        res.status(200).json({dd:"dd"});
    }
}

module.exports = new conclass();