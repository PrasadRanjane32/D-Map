
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose')
const subjectSchema = new mongoose.Schema({

    subjectname: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    video: [
        {
            vlink: {
                type: String,
                required: true
            }
        }
    ],
    notes: [
        {
            tname: {
                type: String,
                required: true
            },
            desc: {
                type: String,
                required: true
            }
        }
    ],
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            ans: {
                type: String,
                required: true
            }
        }
    ],
    quiz: {
            type: Array,
                default: []
        
           
        },
        answers: {
            type: Array,
            default: []
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    



})



subjectSchema.methods.addQuestions = async function (question, ans) {
    try {

        // this.notes = this.notes.concat({ tname, desc });
        this.questions = this.questions.concat({ question, ans });

        await this.save();
        return this.questions;

    } catch (error) {
        console.log(error);
    }
}

subjectSchema.methods.addNotes = async function (tname, desc) {
    try {



      
        this.notes = this.notes.concat({ tname, desc });
        // this.questions = this.questions.concat({ question, ans });

        await this.save();
        // return this.questions;

    } catch (error) {
        console.log(error);
    }
}


subjectSchema.methods.addQuiz = async function ({quiz,question,Options, answers}) {
    try {

       this.quiz = this.quiz.concat(quiz);

       this.answers =this.answers.concat(answers);
       
       console.log(this.quiz)
        console.log(this.answers);

  
        await this.save();
        return this.quiz;

    } catch (error) {
        console.log(error);
    }
}

const Subject = mongoose.model('SUBJECT', subjectSchema);
module.exports = Subject;