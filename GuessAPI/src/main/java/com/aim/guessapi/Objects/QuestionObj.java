/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Objects;

import java.util.List;

/**
 *
 * @author burak
 */
public class QuestionObj {
    
    public List<Question> question;
    
    public QuestionObj(List<Question> questions) {
        this.question = questions;
    }
    
    public QuestionObj() {
        
    }
}
