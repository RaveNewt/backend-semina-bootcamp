const getAllUsers = async (req, res) => {
    try {
        res.send('respond with a resource');
    } catch (err) {
        res.json({ message: err });
    }
}

module.exports = {getAllUsers};