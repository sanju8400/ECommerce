using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ECommerce.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("phone")]
        public string Phone { get; set; }

        [BsonElement("city")]
        public string City { get; set; }

        [BsonElement("zip")]
        public string Zip { get; set; }

        [BsonElement("total")]
        public decimal Total { get; set; }

        [BsonElement("productDetails")]
        public List<OrderProductDetail> ProductDetails { get; set; }

        [BsonElement("createdAt")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderProductDetail
    {
        [BsonElement("product")]
        public Product Product { get; set; }

        [BsonElement("quantity")]
        public int Quantity { get; set; }
    }
}
