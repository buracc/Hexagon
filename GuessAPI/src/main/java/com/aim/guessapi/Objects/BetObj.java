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
public class BetObj {
    
    private List<Bet> bet;
    
    public BetObj(List<Bet> bets) {
        this.bet = bets;
    }
    
    public BetObj() {
        
    }
}
