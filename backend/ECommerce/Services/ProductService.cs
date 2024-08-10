using ECommerce.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Services
{
    public class ProductService
    {
        private readonly IMongoCollection<Product> _products;
        private readonly IMongoCollection<Category> _categories;

        public ProductService(IMongoSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _products = database.GetCollection<Product>("Products");
            _categories = database.GetCollection<Category>("Categories");
        }

        public async Task<List<Product>> Get()
        {
            var products = await _products.Find(product => true).ToListAsync();
            var categoryIds = products.Select(p => p.CategoryId).Distinct().ToList();
            var categories = await _categories.Find(c => categoryIds.Contains(c.Id)).ToListAsync();

            foreach (var product in products)
            {
                product.Category = categories.FirstOrDefault(c => c.Id == product.CategoryId);
            }

            return products;
        }

        public async Task<Product> Get(string id)
        {
         

            var product = await _products.Find(p => p.Id == id).FirstOrDefaultAsync();
            if (product != null)
            {
                product.Category = await _categories.Find(c => c.Id == product.CategoryId).FirstOrDefaultAsync();
            }
            return product;
        }

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
            await _products.ReplaceOneAsync(p => p.Id == id, productIn);
        }

        public async Task Remove(string id)
        {
           

            await _products.DeleteOneAsync(p => p.Id == id);
        }
    }
}
