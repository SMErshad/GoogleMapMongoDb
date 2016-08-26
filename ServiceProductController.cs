using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MongoDB.Driver;
using GoogleMapMongoDb.Models;
using MongoDB.Bson;


namespace GoogleMapMongoDb.Controllers
{
    public class ServiceProductController : Controller
    {
        
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public JsonResult ServiceProduct([Bind(Prefix = "")][FromBody]Company company)
        {

            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var placeData = database.GetCollection<Company>("googledatanew");


            placeData.UpdateOne(Builders<Company>.Filter.Eq("PlaceId", company.PlaceId), Builders<Company>.Update.Set(x => x.Services, company.Services));
            

            var filter = Builders<Company>.Filter.Eq("PlaceId", company.PlaceId);
            var projection = Builders<Company>.Projection
                        .Exclude("_id");


            var document = placeData.Find(filter).Project(projection).FirstOrDefault();

            var documentJson = "ghghgh";

            if (document != null)
            {
                 documentJson = document.ToJson();
            }

                return Json(documentJson);
            
        }


        [HttpPost]
        public JsonResult UpdateServiceProduct([Bind(Prefix = "")][FromBody]Company company)
        {

            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var placeData = database.GetCollection<Company>("googledatanew");


            placeData.UpdateOne(Builders<Company>.Filter.Eq("PlaceId", company.PlaceId), Builders<Company>.Update.Set(x => x.Services, company.Services));


            var filter = Builders<Company>.Filter.Eq("PlaceId", company.PlaceId);
            var projection = Builders<Company>.Projection
                        .Exclude("_id");


            var document = placeData.Find(filter).Project(projection).FirstOrDefault();

            var documentJson = "ghghgh";

            if (document != null)
            {
                documentJson = document.ToJson();
            }

            return Json(documentJson);

        }




        [HttpPost]
        public JsonResult UserCreatedCompany([Bind(Prefix = "")][FromBody]Company company)
        {

            var client = new MongoClient("mongodb://localhost");
            var database = client.GetDatabase("mongogoogleplace");
            var placeData = database.GetCollection<Company>("googledatanewcompany");

            //var companyBson = company.ToBsonDocument();

            placeData.InsertOne(company);


            //placeData.UpdateOne(Builders<Company>.Filter.Eq("PlaceId", company.PlaceId), Builders<Company>.Update.Set(x => x.Services, company.Services));


            var filter = Builders<Company>.Filter.Eq("Name", company.Name);
            var projection = Builders<Company>.Projection
                        .Exclude("_id");


            var document = placeData.Find(filter).Project(projection).FirstOrDefault();

            var documentJson = document.ToJson();

            return Json(documentJson);

        }
    }
}
