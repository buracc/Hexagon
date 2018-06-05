/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.aim.guessapi.Resources;

import com.aim.guessapi.Controllers.DBController;
import com.aim.guessapi.Objects.Prediction;
import com.aim.guessapi.Objects.PredictionObj;
import com.aim.guessapi.Objects.User;
import java.io.IOException;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonMethod;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author burak
 */
@Path("pred")
public class PredictionResource {
    
    PredictionObj JSON;
    List<Prediction> predictions = new ArrayList<>();
    final StringWriter sw = new StringWriter();
    final ObjectMapper mapper = new ObjectMapper();
    DBController db = new DBController();
    
    @GET
    @Path("/get/{userid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getPredictionByID(@PathParam("userid") int userid) throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        predictions = db.getPredictionsByUserID(userid);
        JSON = new PredictionObj(predictions);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllPredictions() throws IOException, SQLException {
        mapper.setVisibility(JsonMethod.FIELD, JsonAutoDetect.Visibility.ANY);
        predictions = db.getAllPredictions();
        JSON = new PredictionObj(predictions);
        mapper.writerWithDefaultPrettyPrinter().writeValue(sw, JSON);
        return sw.toString();
    }
    
    @POST
    @Path("/new")
    @Produces(MediaType.TEXT_PLAIN)
    public String newPrediction(String JSONmsg) throws IOException {
        Prediction p = mapper.readValue(JSONmsg, Prediction.class);
        return db.newPrediction(p);
    }
    
    @POST
    @Path("/result")
    @Produces(MediaType.TEXT_PLAIN)
    public String predictionResult(String JSONmsg) throws IOException {
        Prediction p = mapper.readValue(JSONmsg, Prediction.class);
        return db.predictionResult(p);
    }
    
    
}
