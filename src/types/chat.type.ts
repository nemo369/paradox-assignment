
export interface Answer {
  qids: number[]
  range?: Range
  atext?: string
}

export interface Range {
  min: number
  max: number
}

  export interface Chat {
    chatID: string
    questions: ChatQuestion[]
  }

  export interface ChatQuestion {
    qid: number
    order: number
  }

  

  export interface Question{
    qid: number
    qtype: number
    qtext: string
  }


  //// meen

  export interface Root {
    chatId: string
    conversations: Conversation[]
  }
  export interface Conversation {
    id: number
    type: number
    text: string
    possibleAnswers: string[]
    range?: {
      min: number
      max: number
    }
  }
  
 
  