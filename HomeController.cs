using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using System.Net;
using Newtonsoft.Json;
//using System.Net.Http.Formatting.MediaTypeFormatter;


using System.Net.Http;
//using MongoDB.Driver;
////using MongoDB.Driver.Builders;
//using MongoDB.Bson;
using GoogleMapMongoDb.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using System.IO;
using MongoDB.Bson.IO;
using Newtonsoft.Json.Linq;
using MongoDB.Bson.Serialization;
//using MongoDB.Driver.Builders;

namespace GoogleMapMongoDb.Controllers
{
    public class HomeController : Controller
    {

        //protected static IMongoClient _client;
        //protected static IMongoDatabase _database;
        //protected static IMongoDatabase _postRepository;
        //UserDBBuffer buffer = new UserDBBuffer();
        public HomeController() {

        }

        

        [HttpPost]
        public JsonResult GoogleComments([Bind(Prefix = "")][FromBody]string PlaceID) {

            HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid="+PlaceID+"&key=AIzaSyB_Yjn7IMjwYQX7xLXqyQKDCYpUP7Q7mac");

            //HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + PlaceID + "&key=AIzaSyCHPYRyZylQZ9WW2dJZoawaSQVeAGKOm-8");


            //HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY");
            WebResponse myResponse = myRequest.GetResponse();
            StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
            String result = sr.ReadToEnd();

            sr.Close();
            myResponse.Close();
            BsonDocument bsonDocument = BsonDocument.Parse(result);

            //var projection = Builders<BsonDocument>.Projection
            //        .Exclude("html_attributes");

            //var document = PlaceData.Project(projection).FirstOrDefault();
            JsonSerializerSettings serializerSettings = new JsonSerializerSettings();

            var data = bsonDocument.ToJson();
            //serializerSettings.ToJson(result);
            return Json(data, serializerSettings);

        }


        [HttpPost]
        public JsonResult UserCommentSave(string placeID, string userComment)
        {

            Company company = new Company();
            //company.ToBsonDocument();

            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var PlaceData = database.GetCollection<Company>("googledatanew");




            //document.Add("UsersComments", userComment);
            var result = PlaceData.UpdateOne(Builders<Company>.Filter.Eq("PlaceId", placeID), Builders<Company>.Update.Push(x => x.UsersComments, userComment));


            //var update = Update.PushWrapped("Comments", comment);
            //var update = Builders<BsonDocument>.Update.Set("UserComments", userComment);

            //PlaceData.UpdateOne(filter, update);
            var filter = Builders<Company>.Filter.Eq("PlaceId", placeID);


            var projection = Builders<Company>.Projection
                    .Exclude("_id");

            var document = PlaceData.Find(filter).Project(projection).FirstOrDefault();



            var documentJson = document.ToJson();

            return Json(documentJson);
        }

        [HttpPost]
        public JsonResult UserRatingSave([Bind(Prefix = "")][FromBody]string placeID, float userRating, Company company)
        {


            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var PlaceData = database.GetCollection<BsonDocument>("googledatanew");


            var filter = Builders<BsonDocument>.Filter.Eq("PlaceId", company.PlaceId);
            var update = Builders<BsonDocument>.Update.Set("Rating", userRating);

            var companyBson = company.ToBsonDocument();

            try
            {
                companyBson = PlaceData.Find(filter).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                if (companyBson == null)
                {
                    PlaceData.InsertOne(companyBson);
                }
                else
                {
                    ; PlaceData.UpdateOne(filter, update);
                }
            }



            var projection = Builders<BsonDocument>.Projection
                    .Exclude("_id");

            companyBson = PlaceData.Find(filter).Project(projection).FirstOrDefault();



            var documentJson = companyBson.ToJson();

            return Json(documentJson);
        }
    



    [HttpGet]
    public ActionResult EditPlace()
    {
        return View();
    }

    [HttpGet]
    public ActionResult indexshootra()
    {
        return View();
    }

    [HttpGet]
    public ActionResult BootstrapIndex()
    {
        return View();
    }

    [HttpPost]
    public ActionResult BootstrapIndex(string placeID)
    {
        if (!String.IsNullOrEmpty(placeID))
        {
            HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key=AIzaSyB_Yjn7IMjwYQX7xLXqyQKDCYpUP7Q7mac");
            //HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY");
            WebResponse myResponse = myRequest.GetResponse();
            StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
            String result = sr.ReadToEnd();
            sr.Close();
            myResponse.Close();
        }
        
        return View();
    }




    [HttpPost]
    public ActionResult EditPlace(string placeID)
    {
            if (!String.IsNullOrEmpty(placeID))
            {
                HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeID+"&key=AIzaSyCHPYRyZylQZ9WW2dJZoawaSQVeAGKOm-8");
                //HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY");
                WebResponse myResponse = myRequest.GetResponse();
                StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
                String result = sr.ReadToEnd();
                sr.Close();
                myResponse.Close();
            }

            return View();

        }
    


    [HttpPost]
    public JsonResult SavePlace([Bind(Prefix = "")][FromBody]Company company)
    {
        //company = company.ToJson();
        var client = new MongoClient("mongodb://localhost");
        var database = client.GetDatabase("mongogoogleplace");
        var placeData = database.GetCollection<Company>("googledatanew");



        var filter = Builders<Company>.Filter.Eq("PlaceId", company.PlaceId);

            Company document = new Company();

            try
        {
           document = placeData.Find(filter).FirstOrDefault();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }
        finally {
            if (document == null)
            {
                placeData.InsertOne(company);
            }
        }




        var filter1 = Builders<Company>.Filter.Eq("PlaceId", company.PlaceId);
            var projection = Builders<Company>.Projection
                    .Exclude("_id");
            BsonDocument document1 = new BsonDocument();

            document1 = placeData.Find(filter1).Project(projection).FirstOrDefault();
            var documentJson = document1.ToJson();

        return Json(documentJson);

        }

    }
}



