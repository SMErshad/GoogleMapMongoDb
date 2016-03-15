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

            HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + PlaceID + "&key=AIzaSyCHPYRyZylQZ9WW2dJZoawaSQVeAGKOm-8");
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
            var PlaceData = database.GetCollection<Company>("googledatanew");


            var filter = Builders<Company>.Filter.Eq("PlaceId", placeID);
            var update = Builders<Company>.Update.Set("Rating", userRating);

            Company document = new Company();

            try
            {
                document = PlaceData.Find(filter).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                if (document == null)
                {
                    PlaceData.InsertOne(company);
                }
                else
                {
                    PlaceData.UpdateOne(filter, update);
                }
            }



            var projection = Builders<Company>.Projection
                    .Exclude("Comments").Exclude("_id").Exclude("PlaceId").Exclude("UsersComments");

            document = PlaceData.Find(filter).FirstOrDefault();



            var documentJson = document.ToJson();

            return Json(documentJson);
        }
    



    [HttpGet]
    public ActionResult EditPlace()
    {
        return View();
    }



    [HttpPost]
    public ActionResult EditPlace(string placeID)
    {
            if (!String.IsNullOrEmpty(placeID))
            {
                HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeID + "&key=AIzaSyCHPYRyZylQZ9WW2dJZoawaSQVeAGKOm-8");
                //HttpWebRequest myRequest = (HttpWebRequest)WebRequest.Create("https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY");
                WebResponse myResponse = myRequest.GetResponse();
                StreamReader sr = new StreamReader(myResponse.GetResponseStream(), System.Text.Encoding.UTF8);
                String result = sr.ReadToEnd();
                sr.Close();
                myResponse.Close();
            }

            //MongoDb connection
            //    var client = new MongoClient("mongodb://localhost");
            //    var database = client.GetDatabase("mongogoogleplace");
            //    var mapData = database.GetCollection<BsonDocument>("googledata");



            //    var user = new User
            //    {
            //         // [BsonId] attribute applied
            //        Name = "Derek1",
            //        Email = "derek1@example.com",
            //        Address = new Address{
            //            City = "Portland1",
            //            State = "OR1",
            //            Zip = "972321"
            //        }
            //    };

            //    var address = user.Address.ToBsonDocument();


            //    var userModel = user.ToBsonDocument();
            //    //var myObj = BsonSerializer.Deserialize<User>(bsonObject);
            //    mapData.InsertOne(userModel);
            //    //MongoCollection<User> userDetails = database.GetCollection<User>("Users");
            //    //userDetails.InsertOne(um);

            //    var filter = Builders<BsonDocument>.Filter.Eq("Name", "Derek");
            //    var document = mapData.Find(filter);
            //    var values = userModel.Values.Select(x => BsonTypeMapper.MapToDotNetValue(x));

            //    var ViewData["data"] = userModel.ToString();

            //    return View();
            //}

            //else
            //{
            //    ViewData["data"] = "Please provide a valid location";

            return View();
            //}
        }
    



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



