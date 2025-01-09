import mottoModel from "../model/mottoModel.js";

const addMotto = async (req,res) =>{
   const {mission,vision}  = req.body;
   try {
     const newMotto = new mottoModel({
        mission,
        vision
     })

     await newMotto.save();
     return res.status(201).json({
        success:true,
        message:"Motto successfully added"
     })
   } catch (error) {
    console.error(error)
      return res.status(500).json({
        success:false,
        message:"Somrthing went wrong"
      })
   }
}

export {addMotto}