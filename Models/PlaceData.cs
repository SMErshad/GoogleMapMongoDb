﻿using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoogleMapMongoDb.Models
{
    public class PlaceData
    {
        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string PlaceId { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Name { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Comment { get; set; }

        [BsonElement]
        [BsonRepresentation(MongoDB.Bson.BsonType.Double)]
        public Double Rating { get; set; }

    }
}
