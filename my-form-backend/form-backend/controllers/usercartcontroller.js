import UserCart from "../models/usercartmodel.js";

export const addToCart = async (req, res) => {

    // [{} ,{}]
    try {
        const { userId, productName, quantity, price, productImage } = req.body;

        // const {cartList} = req.body.cartList;

        console.log("UserCart",UserCart)  // UserCart Model { UserCart }

        const cartItem = new UserCart({
            userId,
            productName,
            quantity,
            price,
            productImage
        });

        await cartItem.save();

        res.status(201).json({
            success: true,
            message: "Added to cart",
            data: cartItem
        });
    } catch (error) {
            res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const unselectCart = async (req, res) => {
    try {
        const user = req.user;

        const {productName , quantity, price} = req.body;

        if((!user && !productName) ||  (!quantity && !price)){
            return res.json({error : "no user unselectCart"})
        }
        
        const cartOfUser = await UserCart.findOne({productName})
        
        cartOfUser.quantity = quantity;
        cartOfUser.price = price;

        if(!cartOfUser){
            return res.json({error : "no cartOfUser"})
        }

       const cartOfUsers =  await cartOfUser.save();

        res.status(200).json({message : cartOfUsers})
    } catch (error) {
            res.status(500).json({ success: false, message: "error in unselectCart",error
        });
    }
}