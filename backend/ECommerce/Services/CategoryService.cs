using ECommerce.Models;
using MongoDB.Driver;

namespace ECommerce.Services
{
    public class CategoryService
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoryService(IMongoSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _categories = database.GetCollection<Category>("Categories");
        }

        public async Task<List<Category>> Get()
        {
            return await _categories.Find(category => true).ToListAsync();
        }

        public async Task<Category> Get(string id) =>
            await _categories.Find<Category>(category => category.Id == id).FirstOrDefaultAsync();

        public async Task<Category> Create(Category category)
        {
            await _categories.InsertOneAsync(category);
            return category;
        }

        public async Task Update(string id, Category categoryIn)
        {
            await _categories.ReplaceOneAsync(category => category.Id == id, categoryIn);
        }

        public async Task Remove(string id) =>
            await _categories.DeleteOneAsync(category => category.Id == id);
    }
}
