/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Resources;

import com.aim.guessapi.Controllers.DBController;
import com.aim.guessapi.Objects.TeamObj;
import com.aim.guessapi.Objects.UserAnswers;
import com.aim.guessapi.Objects.UserAnswersObj;
import com.aim.guessapi.Objects.UserPurchases;
import java.io.IOException;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author burak
 */
@Path("useranswers")
public class UserAnswersResource {
    
    UserAnswersObj JSON;
    List<UserAnswers> useranswers = new ArrayList<>();
    final StringWriter sw = new StringWriter();
    final ObjectMapper mapper = new ObjectMapper();
    DBController db = new DBController();
    
    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getTeamByID() throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        useranswers = db.getAllUserAnswers();
        JSON = new UserAnswersObj(useranswers);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @POST
    @Path("/new")
    @Produces(MediaType.TEXT_PLAIN)
    public String buyItem(String JSONmsg) throws IOException {
        UserAnswers ua = mapper.readValue(JSONmsg, UserAnswers.class);
        return db.answerTrivia(ua);
    }
    
    
}
