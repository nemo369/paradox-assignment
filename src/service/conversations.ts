import {Answer,Question, Chat, ChatQuestion} from '../types/chat.type';

import answersJson from '../../data/answers.json' 
import chatsJson from '../../data/chats.json'
import questionsJson from '../../data/questions.json'


const answers = answersJson as Answer[];
const questions = questionsJson as Question[];
const chats = chatsJson as unknown as Chat[];

const getRange = (questionId:number) => {
    const range = answers
        .filter((answer) => answer.qids.includes(questionId))
        .map(({ range }) => (range));

    if (range && range.length > 0) {
        return range[0];
    }
    return null;
}

const getPossibleAnswers = (questionId: number) => {
    return answers
        .filter((answer) => answer.qids.includes(questionId))
        .map(({ atext }) => (atext));
}

const createQuestions = (questionsIds: ChatQuestion[] ) => {
    const sorted = questionsIds.sort((a, b) => a.order - b.order);
    return sorted.map(({ qid }) => {
        const question = questions.find(({ qid: questionId }) => questionId === qid)!;
        return {
            id: qid,
            type: question.qtype,
            text: question.qtext,
        }
    });
}


const createChat = (chatID: string) => {
    const chat = chats.find(({ chatID: chat }) => chat === chatID);
    if(!chat) return null;
    const questions = chat.questions;
    const createdQuestions = createQuestions(questions);
    const conversations = createdQuestions.map((question:any) => {

        const possibleAnswers = question.type === 3 ? getPossibleAnswers(question.id) : [];
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
    const data = {} as any;
    chats.forEach(({ chatID }) => {
        data[chatID] = createChat(chatID); // THIS IS THE MAIN Q 2 ANSWER
    });
    return data;
};

//Task 2- Load existing chat
export const getConversation = (chatId: string) => {
    const chat = createChat(chatId);
    return chat
}