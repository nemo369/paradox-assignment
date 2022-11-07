// node data/createData.js 

console.log('createData .js');
import { readFile,writeFile } from 'fs/promises';

const answers = JSON.parse( await readFile( new URL('./answers.json', import.meta.url) ) );
const chats = JSON.parse( await readFile( new URL('./chats.json', import.meta.url) ) );
const questions = JSON.parse( await readFile( new URL('./questions.json', import.meta.url) ) );


// const chats = require('./chats.json');
// const questions = require('./questions.json');

const getRange = (questionId) => {
    const range = answers
    .filter((answer) => answer.qids.includes(questionId))
    .map(({range}) => (range));

     if(range && range.length >0){
        return range[0];
    } 
    return null;
}

const getPossibleAnswers = (questionId) => {
    return answers
    .filter((answer) => answer.qids.includes(questionId))
    .map(({atext}) => (atext));
}

const createQuestions = (questionsIds) => {
  const sorted = questionsIds.sort((a,b) => a.order - b.order);
    return sorted.map(({qid}) => {
        const question = questions.find(({qid:questionId}) => questionId === qid);
        return {
            id:qid,
            type:question.qtype,
            text:question.qtext,
        }
    });
}


//Task 2- Load existing chat
const createChat = (chatID) => {
    const {questions} = chats.find(({chatID:chat}) => chat === chatID);
    const createdQuestions = createQuestions(questions);
    const conversations = createdQuestions.map((question) =>{

        const possibleAnswers = question.type === 3  ? getPossibleAnswers(question.id) : [];
        const range = question.type === 2 ? getRange(question.id) : null;
        return {
            ...question,
            possibleAnswers,
            range,
        }
    })
    return {
        chatId: chatID,
        conversations
    };
}
// Task 1- Create the data structure of the form’s output
const createData = () => {
    const data = { };
    chats.forEach(({chatID}) => {
        data[chatID] = createChat(chatID); // THIS IS THE MAIN Q 2 ANSWER
    });
    return data;
};



const conversations = createData();
//wrtie to file
writeFile('data/conversations.json', JSON.stringify(conversations,null, 2), (err) => {
    if (err) throw err;
    console.log('The conversations.json has been saved!');
});
writeFile('data/conversation.json', JSON.stringify(conversations['QZ8M559'],null, 2), (err) => {
    if (err) throw err;
    console.log('The conversations.json has been saved!');
});

