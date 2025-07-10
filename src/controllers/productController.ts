import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";





class productController{
  async createProduct(req: Request,res:Response):Promise<void> {
  const {productName,productPrice,productDescription,productTotalStock,discount,categoryId} = req.body
  console.log(req.file)

  const filename =req.file ? req.file.filename :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFaFKG08hKUN7BKpPlEq3dzSRjxAie-jJlQ&s"
 if(!productName || !productPrice || !productDescription || !productTotalStock ||!categoryId ){
res.status(400).json({
  message :"please provide productName,productPrice,productDescription,productTotalStock"
})
return
}
 await Product.create({
 productName,

  productDescription,
  productPrice,
  productTotalStock,
  discount : discount || 0, // default to 0 if not provided
  categoryId: categoryId,
  productImageUrl: filename
  


 })
 res.status(200).json({
  message :"Product created successfully",
  
 })
 }
 async getAllProducts(req: Request, res: Response): Promise<void> {
  const datas =  await Product.findAll({
    include :[
      {
        model : Category,
        attributes : ['id','categoryName']   
      }
    ]
  })
   res.status(200).json({
    message : "Products fetched successfully",
    data : datas
   })
   
 }
 async getSingleProduct(req: Request, res: Response): Promise<void> {
  const{id} = req.params
  const datas =  await Product.findAll({
    where :{
      id : id
    },
    include :[
      {
        model : Category,
        attributes: ['id', 'categoryName']   
      }
    ]
  })
   res.status(200).json({
    message : "Products fetched successfully",
    data : datas
   })
  }
   async deleteProduct(req: Request, res: Response): Promise<void> {
  const {id} = req.params
  const datas = await Product.findAll({
    where :{
      id : id
    }
  })
  if(datas.length === 0){
    res.status(404).json({
      message : "No product found with this id"
    })
  }else{
    await Product.destroy({
      where :{
        id : id
      }
    })
    res.status(200).json({
      message : "Product deleted successfully",
      data : datas
    })
    
  }
   
  }
 }


 export default new productController()