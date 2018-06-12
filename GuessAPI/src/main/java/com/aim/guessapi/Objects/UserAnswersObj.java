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
public class UserAnswersObj {
    private List<UserAnswers> useranswer;
    
    public UserAnswersObj(List<UserAnswers> useranswers) {
        this.useranswer = useranswers;
    }
    
    public UserAnswersObj() {
        
    }
}
