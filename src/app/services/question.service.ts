import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http: HttpClient, 
  ) { }

  public getQuestionsOfQuizForTest(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }
  // addQuestions

  public addQuestion(question: any, qId:any, total:any) {
    return this._http.post(`${baseUrl}/question/${qId}/${total}`, question);
  }

  // get single question
  public getQues(quesId: any) {
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  public updateQuiz(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  // delete question 
  public deleteQuestion(questionId: any) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //evel quiz
  public evalQuiz(questions: any) {
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions)
  }

  public insertExcel(qId:any, total:any) {
    return this._http.post(`${baseUrl}/question/excel/${qId}/${total}`, "");
  }

  public checkQuestion(qId:any, total:any) {
    return this._http.get(`${baseUrl}/question/excel/${qId}/${total}`);
  }

  public historyExam(history:any){
    return this._http.post(`${baseUrl}/history/`, history);
  }

  public getHistory(){
    return this._http.get(`${baseUrl}/history/`);
  }
}
