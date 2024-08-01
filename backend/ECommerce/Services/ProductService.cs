using ECommerce.Models;
using MongoDB.Driver;
namespace ECommerce.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;

        public ProductService(IMongoSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _products = database.GetCollection<Product>("Products");
        }

        public async Task<List<Product>> Get()
        { 
            return await _products.Find(product => true).ToListAsync();
        }

        public async Task<Product> Get(string id) =>
            await _products.Find<Product>(product => product.Id == id).FirstOrDefaultAsync();

        public async Task<Product> Create(Product product)
        {
            product.CreatedAt = DateTime.UtcNow;
            product.UpdatedAt = DateTime.UtcNow;
            await _products.InsertOneAsync(product);
            return product;
        }

        public async Task Update(string id, Product productIn)
        {
            productIn.UpdatedAt = DateTime.UtcNow;
            await _products.ReplaceOneAsync(product => product.Id == id, productIn);
        }

        public async Task Remove(string id) =>
            await _products.DeleteOneAsync(product => product.Id == id);
    }

}
