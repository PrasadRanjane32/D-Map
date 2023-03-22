
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
    about:{
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
    mcqText: [
        {
            mcq:[{

                questionText: {
                    type: String
                },
                answerOptions: [
                    {
                        answerText1: {
                            type: String
                        },
                        isCorrect1:{
                            type:String
                        },
                        answerText2: {
                            type: String
                        },
                        isCorrect2:{
                            type:String
                        },
                        answerText2: {
                            type: String
                        },
                        isCorrect2:{
                            type:String
                        },
                        answerText3: {
                            type: String
                        },
                        isCorrect3:{
                            type:String
                        },
                        answerText4: {
                            type: String
                        },
                        isCorrect4:{
                            type:String
                        },
                    }
                ]
            }]
    }
    ]
    


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
        return this.questions;

    } catch (error) {
        console.log(error);
    }
}
subjectSchema.methods.addAnswer = async function (questionText,answerText1, isCorrect1, answerText2, isCorrect2, answerText3, isCorrect3, answerText4, isCorrect4) {
    try {

        this.answerOptions = this.mcqText.mcq.answerOptions.concat({ answerText1, isCorrect1, answerText2, isCorrect2, answerText3, isCorrect3, answerText4, isCorrect4 });
        this.questionTe = this.mcqText.mcq.concat({ questionText });

        await this.save();
        return this.answerOptions;

    } catch (error) {
        console.log(error);
    }
}

const Subject = mongoose.model('SUBJECT', subjectSchema);
module.exports = Subject;