using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using GoogleMapMongoDb.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GoogleMapMongoDb.Controllers
{
    public class SearchController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Search([Bind(Prefix = "")][FromBody]string Name)
        {
            //company = company.ToJson();
            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var placeData = database.GetCollection<BsonDocument>("googledatanew");



            var filter = Builders<BsonDocument>.Filter.Eq("Name", Name);
            //var projection = Builders<Company>.Projection.Exclude("_id");

            BsonDocument document = new BsonDocument();
            var documentJson = document.ToJson();

            try
            {
                document = placeData.Find(filter).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                if (document == null)
                {
                    Console.WriteLine("Null Doc");
                }
                else
                {
                    documentJson = document.ToJson();

                }
            }

            //if (document == null)
            //{
            //    //    //var companyModel = company.ToBsonDocument();
            //    //    //BsonDocument bsonDocument = BsonDocument.Parse(companyModel);
            //    placeData.InsertOne(company);
            //}

            //filter = Builders<Company>.Filter.Eq("PlaceId", company.PlaceId);
            //projection = Builders<Company>.Projection
            //        .Exclude("_id");
            ////    //BsonDocument document = new BsonDocument();

            //document = placeData.Find(filter).Project(projection).FirstOrDefault();
            return Json(documentJson);

        }



        [HttpPost]
        public JsonResult SearchLocal([Bind(Prefix = "")][FromBody]string query)
        {
            //company = company.ToJson();
            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var placeData = database.GetCollection<BsonDocument>("googledatanew");

            var filter = Builders<BsonDocument>.Filter.Regex("Name", new BsonRegularExpression(query));
            var projection = Builders<BsonDocument>.Projection
                    .Exclude("_id");

            //var result = new List<BsonDocument>();

            //try
            //{
            var result = placeData.Find(filter).Project(projection).ToList();
            
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex);
            //}
                var resultJson = result.ToJson();


                //if(result[0] != null)
                //{
                    //resultJson = result.ToJson();

                    //return Json(resultJson);
                //}
                //resultJson = result.ToJson();

                return Json(resultJson);

            }
        }
    
}
