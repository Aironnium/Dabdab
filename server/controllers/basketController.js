const { Device, BasketDevice, Basket } = require("../models/models")

class BasketController {

    async addToBasket(req,res,next){
        const user = req.user
        const {deviceId} = req.body
        const basket = await BasketDevice.create({basketId : user.id, deviceId : deviceId})
        return res.json(basket)
    }

    async getBasketUser(req,res){
        const {id} = req.user
        const basket = await BasketDevice.findAll({include: {
                model: Device
            }, where: {basketId: id}})

        return res.json(basket)
    }

    async deleteFromBasket(req,res){
        const { id } = req.user;
        if (!id) {
            return res.status(400).json({ error: "User not authenticated" });
        }
    
        try {
            const basket = await BasketDevice.destroy({include: {
                model: Device},
                where: { basketId: id }
            });
    
            return res.json({ message: "Items deleted", basket });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete items from basket" });
        }
    }
}

module.exports = new BasketController()