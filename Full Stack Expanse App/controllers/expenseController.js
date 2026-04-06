const { where } = require('sequelize');
const Expense = require('../models/Expense');
// so we need 4 function create,get,delete,update
 const createExpenses= async(req,res)=>{
    const {title,amount,category,date} = req.body;
    if(!title||!amount || !category || !date)return res.status(400).json({message:"data fields cannot be empty"});
    try{
        const result = await Expense.create({title,amount,category,date});
        console.log("epense created");
        return res.status(201).json({message:"created expense",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

const getAllExpenses = async(req,res)=>{
    try{

    
    const result = await Expense.findAll();
    if(result.length===0)return res.status(404).json({message:"expense is empty"});
    console.log("all expense are",result);
    return res.status(200).json({message:"all expense are",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

const deleteExpenses = async(req,res)=>{
    const expenseId = req.params.id;
    
    try{
        const result = await Expense.findByPk(expenseId);
        if(!result)return res.status(404).json({message:"epense not found"});
        const deleteExpense = await Expense.destroy({where:{id:expenseId}});
        console.log("deleted successfully",deleteExpense);
        return res.status(200).json({message:"deleted successfully",data:deleteExpense});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

// update expense
const updateExpenses = async(req,res)=>{
    const expenseId = req.params.id;
     const {title,amount,category,date} = req.body;
    if(!title||!amount || !category || !date)return res.status(400).json({message:"data fields cannot be empty"});
    try{
        const result = await Expense.findByPk(expenseId);
        if(!result)return res.status(404).json({message:"epense not found"});
        const [update] = await Expense.update({title,amount,category,date},{where:{id:expenseId}});

        console.log("updated",update);
        return res.status(200).json({message:"updated",data:update});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({err:err.message});
    }
};

module.exports = {createExpenses,getAllExpenses,deleteExpenses,updateExpenses};