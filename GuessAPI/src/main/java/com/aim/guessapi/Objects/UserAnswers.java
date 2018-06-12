/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Objects;

/**
 *
 * @author burak
 */
public class UserAnswers {
    private int User_id, Question_id;
    private String answer;

    public UserAnswers(int User_id, int Question_id, String answer) {
        this.User_id = User_id;
        this.Question_id = Question_id;
        this.answer = answer;
    }

    public UserAnswers() {
    
    }

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int User_id) {
        this.User_id = User_id;
    }

    public int getQuestion_id() {
        return Question_id;
    }

    public void setQuestion_id(int Question_id) {
        this.Question_id = Question_id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
    
    
    
}
