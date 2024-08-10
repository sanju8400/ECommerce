using ECommerce.Models;
using MongoDB.Driver;

namespace ECommerce.Services
{
    public class OrderService
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderService(IMongoSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _orders = database.GetCollection<Order>("Orders");
        }

        // Get all orders
        public async Task<List<Order>> GetAsync()
        {
            return await _orders.Find(order => true).ToListAsync();
        }

        // Get a single order by ID
        public async Task<Order> GetAsync(string id)
        {
            return await _orders.Find(order => order.Id == id).FirstOrDefaultAsync();
        }

        // Create a new order
        public async Task<Order> CreateAsync(Order order)
        {
            await _orders.InsertOneAsync(order);
            return order;
        }

        // Update an existing order
        public async Task UpdateAsync(string id, Order orderIn)
        {
            await _orders.ReplaceOneAsync(order => order.Id == id, orderIn);
        }

        // Remove an order by ID
        public async Task RemoveAsync(string id)
        {
            await _orders.DeleteOneAsync(order => order.Id == id);
        }
    }
}
