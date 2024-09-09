const Category = require("../models/category.model.js");
const Product = require("../models/product.model.js");

async function createProduct(reqData) {
  console.log("Request Data:", reqData);
  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
    await topLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id, // corrected to parentCategory
      level: 2,
    });
    await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id, // corrected to parentCategory
      level: 3,
    });
    await thirdLevel.save();
  }

  const product = new Product({
    title: reqData.title,
    color: reqData.color,
    description: reqData.description,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    imageUrl: reqData.imageUrl,
    brand: reqData.brand,
    price: reqData.price,
    size: reqData.size,
    quantity: reqData.quantity,
    category: thirdLevel._id,
  });

  return await product.save();
}

async function createMultipleProducts(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

async function deleteProduct(productId) {
  const product = await findProductById(productId);
  await Product.findByIdAndDelete(productId);
  return "Product deleted Successfully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function getAllProducts(reqQuery) {
  console.log(reqQuery, "reqQuery");
  let {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;
  pageNumber = pageNumber || 1;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return {
        content: [],
        currentPage: 1,
        totalPages: 0,
      };
    }
  }

  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );
    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }

  if (size) {
    console.log("size", size);
    const sizeSet = new Set(size.split(",").map((s) => s.trim()));
    console.log("sizeset", sizeSet);
    query = query.where("size.name").in([...sizeSet]);
  }

  if (minPrice && maxPrice) {
    minPrice = Number(minPrice);
    maxPrice = Number(maxPrice);
    console.log(minPrice,"data")
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    console.log(query, "mindiscount price");
  }

  if (minDiscount) {
    const [min, max] = minDiscount.split("-").map((s) => parseFloat(s.trim()));
    if (!isNaN(min) && !isNaN(max)) {
      query = query.where("discountPercent").gte(min).lte(max);
    } else if (!isNaN(min)) {
      query = query.where("discountPercent").gte(min);
    }
  }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();
  const totalPages = Math.ceil(totalProducts / pageSize);
  return {
    content: products,
    currentPage: pageNumber,
    totalPages: totalPages,
  };
}

async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();
  if (!product) {
    throw new Error("Product not Found with id " + id);
  }
  return product;
}

module.exports = {
  createProduct,
  createMultipleProducts,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
};
