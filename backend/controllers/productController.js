const Product=require("../models/productModel");
const ErrorHandler=require("../utils/errorHandler");
const catchAsyncErrors=require("../middlewares/catchAsyncErrors");

//create product ---admin

exports.createProduct= catchAsyncErrors(
    async (req,res,next)=>{

        req.body.user=req.user.id;

        const product = await Product.create(req.body);
        res.status(201).json({
            success:true,
            product
        })

});

//get all products

exports.getAllProducts=catchAsyncErrors(async(req,res)=>{
    const resultPerPage=5;
    const productCount=await Product.findById(req.params.id);
    const apiFeature=new ApiFeatures(product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true,
        products
    })
});

//get product details

exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    if(product){
        res.status(200).json({
            success:true,
            product
        })
    }
});

//update product --admin

exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{

    let product=Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:false,
            message:"product not found"
        })
    }
    if(product){
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
        res.status(200).json({
            success:true,
            product
        })
    }
})

//delete product

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"product deleted successfully"
    })
});

//create new review or update the review
exports.createProductReview =catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productID}=req.body;
    const review ={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product= await product.findById(productID);

    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
            rev.rating=rating,
            rev.comment=comment
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length
    }

    let avg=0;
    product.ratings=product.reviews.forEach(rev=>{
        avg=avg+rev.rating
    })/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });
});

//get all reviews of a product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
});

//delete review
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("product not found",404));
    }

    const reviews=product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString());

    let avg=0;

    reviews.forEach((rev)=>{
        avg+=rev.rating;
    })

    const ratings=avg/reviews.length;

    const numOfReviews=reviews.length;

    await product.findByIdAndUpdate(
        req.query.productID,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new:true,
            numValidators:true,
            useFindAndModify:false,
        }
    );

    res.status(200).json({
        success:true,
    })
});