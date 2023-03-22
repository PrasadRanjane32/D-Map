
// const jwt = require('jsonwebtoken');

// const mongoose = require('mongoose')
// const quizSchema = new mongoose.Schema({

//     questionText: {
//         type: String,
//         required: true
    // },
    // answerOptions: [
    //     {
    //         answerText1: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect1:{
    //             type:String,
    //             required:true
    //         },
    //          answerText2: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect2:{
    //             type:String,
    //             required:true
    //         },
    //          answerText2: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect2:{
    //             type:String,
    //             required:true
    //         },
    //         answerText3: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect3:{
    //             type:String,
    //             required:true
    //         },
    //         answerText4: {
    //             type: String,
    //             required: true
    //         },
    //         isCorrect4:{
    //             type:String,
    //             required:true
    //         },
    //     }
    // ]


// })



// quizSchema.methods.addQuestions = async function ( question, ans) {
//     try {

//         // this.notes = this.notes.concat({ tname, desc });
//         this.questions = this.questions.concat({ question, ans });

//         await this.save();
//         return this.questions;

//     } catch (error) {
//         console.log(error);
//     }
// }

// quizSchema.methods.addAns = async function ( tname, desc) {
//     try {

//         this.notes = this.notes.concat({ tname, desc });
//         // this.questions = this.questions.concat({ question, ans });

//         await this.save();
//         return this.questions;

//     } catch (error) {
//         console.log(error);
//     }
// }


// const Quiz = mongoose.model('QUIZ', quizSchema);
// module.exports = Quiz;