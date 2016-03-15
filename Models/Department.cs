using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
    public class Department
    {
        [BsonId]
        public int Id { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.Double)]
        public Double Rating { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Comment { get; set; }
    }
}
