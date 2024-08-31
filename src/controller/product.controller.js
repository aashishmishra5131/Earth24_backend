const productService =require('../services/product.services.js')


const createProduct=async(req,res)=>{
  try {
    
    const product=await productService.createProduct(req.body);
   
   console.log(req.body,"body-data");
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({error:error.message})
  }
}

const createMultipleProduct=async(req,res)=>{
 // const productId=req.params.id;
  try {
    const product=await productService.createMultipleProducts(req.body);
    return res.status(201).send({message:"Products created successfully", status:true});
  } catch (error) {
    return res.status(500).send({error:error.message})
}
}

const deleteProduct=async(req,res)=>{
    const productId=req.params.id;
    try {
      const product=await productService.deleteProduct(productId);
      return res.status(201).send(product);
    } catch (error) {
      return res.status(500).send({error:error.message})
  }
}

const updateProduct=async(req,res)=>{
    const productId=req.params.id;
    try {
      const product=await productService.updateProduct(productId,req.body);
      return res.status(201).send(product);
    } catch (error) {
      return res.status(500).send({error:error.message})
  }
}

const getAllProducts = async (req, res) => {
  try {
    console.log("reqQuery Data", req.query);
    const products = await productService.getAllProducts(req.query);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


const findProductById=async(req,res)=>{
  const productId=req.params.id;
  try {
    const product=await productService.findProductById(productId);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({error:error.message})
}
}

module.exports={
    createProduct,
    createMultipleProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById
}
